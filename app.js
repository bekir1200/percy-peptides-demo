const products = [
  { id: "retatrutide", name: "Retatrutide", alias: "Triple receptor agonist research", code: "PP–01", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "rose", description: "Investigated as a model for GLP-1, GIP, and glucagon receptor signalling, energy homeostasis, and receptor cross-talk." },
  { id: "ghk-cu", name: "GHK-Cu", alias: "Copper-binding tripeptide", code: "PP–02", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "sage", description: "Studied in relation to copper transport, collagen biology, fibroblast activity, and cellular communication." },
  { id: "bpc-157", name: "BPC-157", alias: "Synthetic peptide research", code: "PP–03", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "blue", description: "Investigated in preclinical research on tissue biology, vascular signalling, and cellular repair mechanisms." },
  { id: "cjc-ipamorelin", name: "CJC-1295 + Ipamorelin", alias: "Complementary peptide research", code: "PP–04", category: "metabolic", categoryLabel: "ENDOCRINE RESEARCH", tone: "ochre", description: "Research models for GHRH and ghrelin receptor signalling, endocrine regulation, and downstream pathways." },
  { id: "semax-selank", name: "Semax + Selank", alias: "Neurobiological research", code: "PP–05", category: "neuro", categoryLabel: "NEUROBIOLOGY", tone: "lilac", description: "Studied in relation to neurotrophic factors, neurotransmitter systems, and central nervous system signalling." },
  { id: "mots-c", name: "MOTS-c", alias: "Mitochondrial-derived peptide", code: "PP–06", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "mint", description: "Investigated for its possible role in mitochondrial communication, cellular energy sensing, and metabolic signalling." }
];

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
  const visible = products.filter(product => (activeFilter === "all" || product.category === activeFilter) && `${product.name} ${product.alias} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(query));
  productGrid.innerHTML = visible.length ? visible.map((product, index) => `
    <article class="product-card" data-tone="${product.tone}">
      <div class="product-card__visual" aria-hidden="true"><span class="visual-code">${product.code}</span><span class="compound-orb"></span><span class="visual-index">PP / ${String(index + 1).padStart(2, "0")}</span></div>
      <div class="product-card__body">
        <div class="product-card__meta"><span class="category-label">${product.categoryLabel}</span><span class="product-code">${product.code}</span></div>
        <h3>${product.name}</h3><p class="product-card__alias">${product.alias}</p>
        <p class="product-card__description">${product.description}</p>
        <div class="product-card__footer"><div class="price-note">Price on enquiry<span>Availability confirmed by our team</span></div><button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to basket">Add to basket <span aria-hidden="true">+</span></button></div>
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
    return `<article class="cart-line" data-tone="${product.tone}">
      <div class="cart-line__swatch" aria-hidden="true"><span class="compound-orb"></span></div>
      <div class="cart-line__info"><h3>${product.name}</h3><p>${product.categoryLabel}</p><div class="cart-line__qty" aria-label="Quantity for ${product.name}"><button class="qty-button" type="button" data-quantity="${product.id}" data-change="-1" aria-label="Remove one ${product.name}">−</button><span>${line.quantity}</span><button class="qty-button" type="button" data-quantity="${product.id}" data-change="1" aria-label="Add one ${product.name}">+</button></div></div>
      <div class="cart-line__controls"><button class="remove-button" type="button" data-remove="${product.id}" aria-label="Remove ${product.name} from basket">Remove</button></div>
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
  window.alert(message);
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
  if (event.key === "Tab" && !cartPanel.hidden) {
    const focusable = [...cartPanel.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')].filter(element => !element.hidden);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

renderProducts();
renderCart();
