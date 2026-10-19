const defaultProducts = [
  { id: "retatrutide", name: "Retatrutide", alias: "Triple receptor agonist research", code: "PP–01", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "rose", description: "Studied for activity involving GIP, GLP-1, and glucagon receptors. Research explores endocrine signalling and energy homeostasis. Investigational findings are specific to the formulation and trial conditions reported." },
  { id: "ghk-cu", name: "GHK-Cu", alias: "Copper-binding tripeptide", code: "PP–02", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "sage", description: "A copper complex of the tripeptide GHK. Scientific literature examines copper binding, extracellular-matrix biology, and cellular signalling across experimental models." },
  { id: "bpc-157", name: "BPC-157", alias: "Synthetic peptide research", code: "PP–03", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "blue", description: "Described in preclinical research involving tissue biology, vascular signalling, and cellular pathways. Laboratory or animal findings do not establish safety or efficacy in people." },
  { id: "cjc-ipamorelin", name: "CJC-1295 + Ipamorelin", alias: "Complementary peptide research", code: "PP–04", category: "metabolic", categoryLabel: "ENDOCRINE RESEARCH", tone: "ochre", description: "Distinct peptides investigated in relation to GHRH and ghrelin-receptor signalling. A combined product or fixed formulation must be confirmed by the supplier." },
  { id: "semax-selank", name: "Semax + Selank", alias: "Neurobiological research", code: "PP–05", category: "neuro", categoryLabel: "NEUROBIOLOGY", tone: "lilac", description: "Distinct synthetic peptides discussed in research on neurobiological signalling. Evidence and regulatory status vary; no established product effect is implied." },
  { id: "mots-c", name: "MOTS-c", alias: "Mitochondrial-derived peptide", code: "PP–06", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "mint", description: "A peptide encoded in the mitochondrial 12S rRNA region. Research examines cellular energy sensing, metabolic signalling, and stress responses, largely in experimental models." }
];

function loadProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem("percy-products") || "null");
    return Array.isArray(stored) ? stored : [...defaultProducts];
  } catch { return [...defaultProducts]; }
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

let products = loadProducts();

function applySiteContent() {
  try {
    const content = JSON.parse(localStorage.getItem("percy-site-content") || "null");
    if (!content) return;
    let migratedSeo = false;
    if (content.pageTitle === "Percy Peptides | Research Compounds and Product Information") {
      content.pageTitle = "Percy Peptides | Research Peptide Catalogue & Information";
      migratedSeo = true;
    }
    if (content.metaDescription === "Explore Percy Peptides’ research catalogue, read clear compound information, and learn about product documentation and the enquiry process.") {
      content.metaDescription = "Explore the Percy Peptides research catalogue, read compound information and research articles, and enquire about verified product details.";
      migratedSeo = true;
    }
    if (migratedSeo) localStorage.setItem("percy-site-content", JSON.stringify(content));
    if (content.pageTitle) document.title = content.pageTitle;
    if (content.metaDescription) {
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = content.metaDescription;
      const socialDescription = document.querySelector('meta[property="og:description"]');
      if (socialDescription) socialDescription.content = content.metaDescription;
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.content = content.metaDescription;
    }
    if (content.keywords) {
      const keywords = document.querySelector('meta[name="keywords"]');
      if (keywords) keywords.content = content.keywords;
    }
    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle && content.pageTitle) socialTitle.content = content.pageTitle;
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && content.pageTitle) twitterTitle.content = content.pageTitle;
    if (content.announcement) document.querySelector(".announcement").lastChild.textContent = ` ${content.announcement}`;
    const heroTitle = document.querySelector(".hero h1");
    if (content.heroTitleLead) heroTitle.firstChild.textContent = content.heroTitleLead;
    if (content.heroTitleEmphasis) heroTitle.querySelector("span").textContent = content.heroTitleEmphasis;
    if (content.heroDescription) document.querySelector(".hero__lede").textContent = content.heroDescription;
    if (content.catalogueLead) document.querySelector(".section-heading__copy").textContent = content.catalogueLead;
    if (content.contactEmail) document.querySelector(".contact-card__link").textContent = content.contactEmail;
    if (content.disclaimer) document.querySelector(".footer-legal>p").textContent = content.disclaimer;
    if (Array.isArray(content.articles)) {
      document.querySelectorAll(".article-card").forEach((card, index) => {
        const article = content.articles[index];
        if (!article) return;
        card.querySelector("h3").textContent = article.title;
        card.querySelector("p").textContent = article.summary;
      });
    }
  } catch { /* Ignore malformed local preview content. */ }
}

function applyEnquiryContact() {
  try {
    const settings = JSON.parse(localStorage.getItem("percy-enquiry-settings") || "null");
    const email = String(settings?.recipientEmail || "").trim();
    const phone = String(settings?.contactPhone || "").trim();
    const contact = document.querySelector(".contact-card__link");
    if (email && contact) contact.outerHTML = `<span class="contact-card__link"><a href="mailto:${encodeURIComponent(email)}">${escapeHTML(email)} <b aria-hidden="true">↗</b></a>${phone ? `<br/><a href="tel:${encodeURIComponent(phone)}">${escapeHTML(phone)}</a>` : ""}</span>`;
  } catch { /* Keep the default contact placeholder if local settings are unavailable. */ }
}

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const cartPanel = document.querySelector("#cart-panel");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartTrigger = document.querySelector(".cart-trigger");
const cartItems = document.querySelector(".cart-items");
const cartEmpty = document.querySelector(".cart-empty");
const cartFooter = document.querySelector(".cart-footer");
const toast = document.querySelector(".toast");
let activeFilter = "all";
let cart = loadCart();
let toastTimer;
let lastFocusedElement;
let enquiryReturnFocus;

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("percy-basket") || "[]");
    return Array.isArray(stored) ? stored.filter(line => products.some(product => product.id === line.id) && Number.isInteger(line.quantity) && line.quantity > 0) : [];
  } catch { return []; }
}

function saveCart() {
  localStorage.setItem("percy-basket", JSON.stringify(cart));
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(product => product.active !== false && (activeFilter === "all" || product.category === activeFilter) && `${product.name} ${product.alias} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(query));
  productGrid.innerHTML = visible.length ? visible.map((product, index) => `
    <article class="product-card" data-tone="${escapeHTML(product.tone || "sage")}">
      <div class="product-card__visual" aria-hidden="true"><span class="visual-code">${escapeHTML(product.code || "")}</span><span class="compound-orb"></span><span class="visual-index">PP / ${String(index + 1).padStart(2, "0")}</span></div>
      <div class="product-card__body">
        <div class="product-card__meta"><span class="category-label">${escapeHTML(product.categoryLabel || "RESEARCH")}</span><span class="product-code">${escapeHTML(product.code || "")}</span></div>
        <h3>${escapeHTML(product.name)}</h3><p class="product-card__alias">${escapeHTML(product.alias || "")}</p>
        <p class="product-card__description">${escapeHTML(product.description || "")}</p>
        <div class="product-card__footer"><div class="price-note">${escapeHTML(product.price || "Price on enquiry")}<span>${product.availability === "unavailable" ? "Currently unavailable" : product.availability === "available" ? "Availability confirmed" : "Availability confirmed by our team"}</span></div><button class="add-button" type="button" data-add="${escapeHTML(product.id)}" aria-label="Add ${escapeHTML(product.name)} to basket" ${product.availability === "unavailable" ? "disabled" : ""}>${product.availability === "unavailable" ? "Unavailable" : "Add to basket"} <span aria-hidden="true">${product.availability === "unavailable" ? "–" : "+"}</span></button></div>
      </div>
    </article>`).join("") : `<div class="empty-results"><strong>No compounds found.</strong><p>Try another search or choose a different category.</p></div>`;
}

function renderCart() {
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(node => { node.textContent = String(count); });
  cartEmpty.hidden = count > 0;
  cartFooter.hidden = count === 0;
  cartItems.innerHTML = cart.map(line => {
    const product = products.find(item => item.id === line.id);
    return `<article class="cart-line" data-tone="${escapeHTML(product?.tone || "sage")}">
      <div class="cart-line__swatch" aria-hidden="true"><span class="compound-orb"></span></div>
      <div class="cart-line__info"><h3>${escapeHTML(product?.name || line.id)}</h3><p>${escapeHTML(product?.categoryLabel || "RESEARCH")}</p><div class="cart-line__qty" aria-label="Quantity for ${escapeHTML(product?.name || line.id)}"><button class="qty-button" type="button" data-quantity="${escapeHTML(product?.id || line.id)}" data-change="-1" aria-label="Remove one ${escapeHTML(product?.name || line.id)}">−</button><span>${line.quantity}</span><button class="qty-button" type="button" data-quantity="${escapeHTML(product?.id || line.id)}" data-change="1" aria-label="Add one ${escapeHTML(product?.name || line.id)}">+</button></div></div>
      <div class="cart-line__controls"><button class="remove-button" type="button" data-remove="${escapeHTML(product?.id || line.id)}" aria-label="Remove ${escapeHTML(product?.name || line.id)} from basket">Remove</button></div>
    </article>`;
  }).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function openCart() {
  lastFocusedElement = document.activeElement;
  cartPanel.hidden = false;
  cartBackdrop.hidden = false;
  document.body.classList.add("cart-open");
  cartTrigger.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => { cartPanel.classList.add("is-open"); cartBackdrop.classList.add("is-visible"); document.querySelector(".cart-close").focus(); });
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartBackdrop.classList.remove("is-visible");
  document.body.classList.remove("cart-open");
  cartTrigger.setAttribute("aria-expanded", "false");
  setTimeout(() => { cartPanel.hidden = true; cartBackdrop.hidden = true; }, 240);
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function changeQuantity(id, amount) {
  const line = cart.find(item => item.id === id);
  if (!line) return;
  line.quantity += amount;
  if (line.quantity <= 0) cart = cart.filter(item => item.id !== id);
  saveCart(); renderCart();
}

filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => { const selected = item === button; item.classList.toggle("is-selected", selected); item.setAttribute("aria-pressed", String(selected)); });
  renderProducts();
}));

searchInput.addEventListener("input", renderProducts);
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.add);
  const line = cart.find(item => item.id === product.id);
  if (line) line.quantity += 1; else cart.push({ id: product.id, quantity: 1 });
  saveCart(); renderCart(); showToast(`${product.name} added to your basket.`);
});

cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  if (removeButton) { cart = cart.filter(item => item.id !== removeButton.dataset.remove); saveCart(); renderCart(); }
});

cartTrigger.addEventListener("click", openCart);
document.querySelector(".cart-close").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
document.querySelector(".cart-browse").addEventListener("click", () => { closeCart(); document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth" }); });
document.querySelector(".checkout-button").addEventListener("click", () => {
  const lines = cart.map(line => `${products.find(product => product.id === line.id).name} × ${line.quantity}`).join("\n");
  const message = `Your enquiry selection:\n\n${lines}\n\nPlease confirm product availability, pricing and documentation before you proceed. Add Percy Peptides’ verified enquiry contact to publish a working order enquiry.`;
  const enquiryDialog = document.querySelector("#enquiry-dialog");
  enquiryReturnFocus = document.querySelector(".checkout-button");
  enquiryDialog.querySelector(".enquiry-summary").textContent = message;
  enquiryDialog.hidden = false;
  requestAnimationFrame(() => enquiryDialog.querySelector("input[name='name']").focus());
});

const enquiryDialog = document.querySelector("#enquiry-dialog");
function closeEnquiryDialog() {
  enquiryDialog.hidden = true;
  if (enquiryReturnFocus instanceof HTMLElement) enquiryReturnFocus.focus();
}
enquiryDialog.querySelector(".enquiry-close").addEventListener("click", closeEnquiryDialog);
enquiryDialog.addEventListener("click", event => { if (event.target === enquiryDialog) closeEnquiryDialog(); });
enquiryDialog.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const enquiry = {
    id: `PP-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "new",
    customer: { name: String(form.get("name")).trim(), email: String(form.get("email")).trim(), organisation: String(form.get("organisation")).trim(), phone: String(form.get("phone")).trim() },
    message: String(form.get("message")).trim(),
    items: cart.map(line => ({ ...line, name: products.find(product => product.id === line.id)?.name || line.id }))
  };
  try {
    const orders = JSON.parse(localStorage.getItem("percy-orders") || "[]");
    orders.unshift(enquiry);
    localStorage.setItem("percy-orders", JSON.stringify(orders));
    const routing = JSON.parse(localStorage.getItem("percy-enquiry-settings") || "null");
    const recipient = String(routing?.recipientEmail || "").trim();
    const selectedItems = enquiry.items.map(item => `${item.name} × ${item.quantity}`).join("\n");
    const emailBody = [`Enquiry reference: ${enquiry.id}`, `Name: ${enquiry.customer.name}`, `Email: ${enquiry.customer.email}`, `Organisation: ${enquiry.customer.organisation || "—"}`, `Phone: ${enquiry.customer.phone || "—"}`, "", "Selection:", selectedItems, "", "Message:", enquiry.message || "—"].join("\n");
    cart = [];
    saveCart(); renderCart();
    enquiryDialog.hidden = true;
    event.currentTarget.reset();
    if (recipient) {
      const subject = `Percy Peptides enquiry ${enquiry.id}`;
      window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      showToast("Enquiry saved. Review and send the prepared email in your mail app.");
    } else {
      showToast("Enquiry saved in this browser only. Add an inbox in CRM settings to prepare an email.");
    }
  } catch {
    showToast("This browser could not save the enquiry. Please try again.");
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  mobileNav.hidden = !open;
});
mobileNav.addEventListener("click", event => { if (event.target.closest("a")) { menuToggle.setAttribute("aria-expanded", "false"); menuToggle.setAttribute("aria-label", "Open navigation"); mobileNav.hidden = true; } });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !cartPanel.hidden) closeCart();
  if (event.key === "Escape" && !enquiryDialog.hidden) closeEnquiryDialog();
  if (event.key === "Tab" && !enquiryDialog.hidden) {
    const focusable = [...enquiryDialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled)')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (event.key === "Tab" && !cartPanel.hidden) {
    const focusable = [...cartPanel.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(element => !element.hidden);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

renderProducts();
renderCart();
applySiteContent();
applyEnquiryContact();
