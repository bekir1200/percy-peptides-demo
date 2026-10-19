const STORAGE = {
  products: "percy-products",
  orders: "percy-orders",
  content: "percy-site-content",
  customerNotes: "percy-customer-notes"
};

const defaultProducts = [
  { id: "retatrutide", name: "Retatrutide", alias: "Triple receptor agonist research", code: "PP–01", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "rose", description: "Studied for activity involving GIP, GLP-1, and glucagon receptors. Research explores endocrine signalling and energy homeostasis. Investigational findings are specific to the formulation and trial conditions reported.", price: "", availability: "enquiry", active: true },
  { id: "ghk-cu", name: "GHK-Cu", alias: "Copper-binding tripeptide", code: "PP–02", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "sage", description: "A copper complex of the tripeptide GHK. Scientific literature examines copper binding, extracellular-matrix biology, and cellular signalling across experimental models.", price: "", availability: "enquiry", active: true },
  { id: "bpc-157", name: "BPC-157", alias: "Synthetic peptide research", code: "PP–03", category: "cellular", categoryLabel: "CELLULAR BIOLOGY", tone: "blue", description: "Described in preclinical research involving tissue biology, vascular signalling, and cellular pathways. Laboratory or animal findings do not establish safety or efficacy in people.", price: "", availability: "enquiry", active: true },
  { id: "cjc-ipamorelin", name: "CJC-1295 + Ipamorelin", alias: "Complementary peptide research", code: "PP–04", category: "metabolic", categoryLabel: "ENDOCRINE RESEARCH", tone: "ochre", description: "Distinct peptides investigated in relation to GHRH and ghrelin-receptor signalling. A combined product or fixed formulation must be confirmed by the supplier.", price: "", availability: "enquiry", active: true },
  { id: "semax-selank", name: "Semax + Selank", alias: "Neurobiological research", code: "PP–05", category: "neuro", categoryLabel: "NEUROBIOLOGY", tone: "lilac", description: "Distinct synthetic peptides discussed in research on neurobiological signalling. Evidence and regulatory status vary; no established product effect is implied.", price: "", availability: "enquiry", active: true },
  { id: "mots-c", name: "MOTS-c", alias: "Mitochondrial-derived peptide", code: "PP–06", category: "metabolic", categoryLabel: "METABOLIC RESEARCH", tone: "mint", description: "A peptide encoded in the mitochondrial 12S rRNA region. Research examines cellular energy sensing, metabolic signalling, and stress responses, largely in experimental models.", price: "", availability: "enquiry", active: true }
];

const defaultContent = {
  pageTitle: "Percy Peptides | Research Peptide Catalogue & Information",
  metaDescription: "Explore the Percy Peptides research catalogue, read compound information and research articles, and enquire about verified product details.",
  keywords: "Primary: research peptide catalogue. Supporting: peptide research UK; peptide product information; peptide GPCR signalling; retatrutide research; MOTS-c research. Provisional UK targeting; validate with client search data.",
  announcement: "Research compounds supplied for laboratory research purposes only",
  heroTitleLead: "Research,",
  heroTitleEmphasis: "with clarity.",
  heroDescription: "Thoughtfully presented research compounds, with straightforward product information and a focus on transparency at every step.",
  catalogueLead: "Browse compounds by research area and read concise summaries of the available scientific context. Product details, specifications, documentation, availability and pricing must be confirmed before an order can be accepted.",
  contactEmail: "Contact details to be confirmed",
  disclaimer: "Products supplied for laboratory research purposes only. Not intended for human or veterinary use. Not medicines, supplements, cosmetics, or approved treatments. Website information is provided for scientific and educational purposes and does not constitute medical advice.",
  articles: [
    { title: "How peptide signalling connects to GPCR research", summary: "An introduction to peptide ligands, G protein-coupled receptors, and why experimental context matters.", seoTitle: "Peptide Signalling and GPCR Research | Percy Peptides", seoDescription: "An introduction to how peptide ligands interact with G protein-coupled receptors and why receptor context matters in research.", body: "Peptides can act as signalling molecules by binding to specific receptors on cell surfaces. One large receptor family studied in this context is the G protein-coupled receptor (GPCR) family. GPCRs translate an extracellular signal into intracellular activity, but the resulting response depends on the receptor, ligand, cell type, and experimental conditions.\n\nPeptide–receptor research considers more than whether a ligand binds. Researchers may examine binding affinity, receptor selectivity, activation, signalling bias, receptor internalisation, and downstream pathways. A peptide’s sequence and structure can influence how it interacts with a receptor, while changes to a peptide can affect stability, selectivity, and duration of activity.\n\nThis field has informed drug discovery, including work on peptide ligands for metabolic and other GPCR targets. A therapeutic medicine developed through controlled research is not equivalent to a separate research material offered for sale. Clinical evidence, manufacturing controls, product authorisation, and the conditions of use all matter when interpreting claims.\n\nA receptor mechanism is not proof of a consumer benefit. A preclinical result does not establish a treatment effect in people. Product-specific claims require product-specific evidence." },
    { title: "Retatrutide and multi-receptor research", summary: "What investigational research can tell us about multi-receptor activity, and where its limits remain.", seoTitle: "Retatrutide: Multi-Receptor Research Context | Percy Peptides", seoDescription: "Learn how retatrutide has been studied as a GIP, GLP-1, and glucagon receptor agonist, and how to interpret investigational evidence.", body: "Retatrutide is an investigational peptide studied for activity at three hormone receptors: glucose-dependent insulinotropic polypeptide (GIP), glucagon-like peptide-1 (GLP-1), and glucagon (GCG). This multi-receptor profile has made it a subject of research into endocrine signalling and energy balance.\n\nA Phase 2 clinical trial reported results for a specific investigational retatrutide formulation in adults with obesity. The study’s findings must be read in the context of its design, participants, dose groups, duration, monitoring, and comparator. A clinical-trial result does not verify the identity, composition, sterility, storage, or quality of a separately supplied product.\n\nInvestigational status is not approval for routine treatment or permission to promote a medicine to the public. In the United Kingdom, businesses should obtain appropriate regulatory advice before offering or advertising products associated with medicinal claims. Describing a product as for research use only does not, by itself, settle its legal classification or make promotional claims acceptable.\n\nThis article is educational and is not medical advice, a treatment recommendation, or an endorsement of any product." },
    { title: "MOTS-c and mitochondrial-derived peptide research", summary: "A research overview of mitochondrial-derived signalling and the distinction between mechanisms and clinical evidence.", seoTitle: "MOTS-c and Mitochondrial-Derived Peptide Research | Percy Peptides", seoDescription: "An educational overview of MOTS-c research, mitochondrial signalling, and the difference between mechanistic findings and clinical evidence.", body: "Mitochondria are widely known for their role in cellular energy production, but they also participate in communication and stress-response pathways. Research on mitochondrial-derived peptides asks whether small peptides encoded by mitochondrial DNA contribute to these signalling networks.\n\nMOTS-c is one such peptide, encoded in the mitochondrial 12S ribosomal RNA region. Published research has examined how MOTS-c may interact with cellular metabolic pathways and stress responses. Reviews describe findings across cell and animal models, and highlight active questions about mechanisms, measurement, and translation to human biology.\n\nA proposed mechanism is not the same as a demonstrated clinical benefit. Experimental observations in animals or cells do not establish an effective or safe human use, and they do not tell a buyer whether a separately supplied material has the stated identity or composition.\n\nFurther work is needed to clarify how mitochondrial-derived peptides are regulated, how results vary between models, and which findings are relevant to human physiology. This makes MOTS-c a research topic, not a basis for health promises." }
  ]
};

let products = readJSON(STORAGE.products, defaultProducts);
let orders = readJSON(STORAGE.orders, []);
let content = readJSON(STORAGE.content, defaultContent);
let customerNotes = readJSON(STORAGE.customerNotes, {});
let toastTimer;

if (content.pageTitle === "Percy Peptides | Research Compounds and Product Information") {
  content.pageTitle = defaultContent.pageTitle;
  writeJSON(STORAGE.content, content);
}
if (content.metaDescription === "Explore Percy Peptides’ research catalogue, read clear compound information, and learn about product documentation and the enquiry process.") {
  content.metaDescription = defaultContent.metaDescription;
  writeJSON(STORAGE.content, content);
}

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value === null ? structuredClone(fallback) : value;
  } catch { return structuredClone(fallback); }
}

function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function escapeHTML(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function formatDate(value) { const date = new Date(value); return Number.isNaN(date.valueOf()) ? "—" : new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date); }
function currency(value) { return value ? escapeHTML(value) : "On enquiry"; }
function showToast(message) {
  const toast = document.querySelector(".toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

const labels = { new: "New", reviewing: "Reviewing", confirmed: "Confirmed", fulfilled: "Completed", cancelled: "Cancelled" };
const pageNames = { dashboard: "Overview", orders: "Enquiries", customers: "Customers", products: "Products", content: "Website content", settings: "Settings & backup" };

function goToPage(name) {
  document.querySelectorAll("[data-view]").forEach(view => view.classList.toggle("is-visible", view.dataset.view === name));
  document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("is-active", button.dataset.page === name));
  document.querySelector("#page-title").textContent = pageNames[name] || "Overview";
  document.querySelector("#sidebar").classList.remove("is-open");
  document.querySelector(".mobile-menu").setAttribute("aria-expanded", "false");
  if (name === "dashboard") renderDashboard();
  if (name === "orders") renderOrders();
  if (name === "customers") renderCustomers();
  if (name === "products") renderProducts();
  if (name === "content") renderContent();
  if (name === "settings") renderStorageSummary();
}

function customerList() {
  const byEmail = new Map();
  orders.forEach(order => {
    const key = (order.customer?.email || "unknown").toLowerCase();
    if (!byEmail.has(key)) byEmail.set(key, { email: key, name: order.customer?.name || "Unknown", organisation: order.customer?.organisation || "", phone: order.customer?.phone || "", count: 0, latest: order.createdAt });
    const customer = byEmail.get(key);
    customer.count += 1;
    if (new Date(order.createdAt) > new Date(customer.latest)) customer.latest = order.createdAt;
    if (!customer.organisation && order.customer?.organisation) customer.organisation = order.customer.organisation;
    if (!customer.phone && order.customer?.phone) customer.phone = order.customer.phone;
  });
  return [...byEmail.values()].sort((a, b) => new Date(b.latest) - new Date(a.latest));
}

function orderRows(source, compact = false) {
  if (!source.length) return `<div class="empty-state"><strong>No enquiries yet</strong><p>Customer enquiries submitted from the website preview will appear here.</p></div>`;
  return `<table class="data-table"><thead><tr><th>Reference</th><th>Customer</th><th>Products</th><th>Date</th><th>Status</th>${compact ? "" : "<th></th>"}</tr></thead><tbody>${source.map(order => `<tr>
    <td><span class="cell-primary">${escapeHTML(order.id)}</span></td>
    <td><span class="cell-primary">${escapeHTML(order.customer?.name || "Unknown")}</span><span class="cell-secondary">${escapeHTML(order.customer?.email || "")}</span></td>
    <td><span class="order-items">${(order.items || []).map(item => `${escapeHTML(item.name || item.id)} × ${Number(item.quantity) || 1}`).join("<br>") || "—"}</span></td>
    <td>${formatDate(order.createdAt)}</td>
    <td><select class="status-select" data-order-status="${escapeHTML(order.id)}" aria-label="Status for ${escapeHTML(order.id)}">${Object.entries(labels).map(([value, label]) => `<option value="${value}" ${order.status === value ? "selected" : ""}>${label}</option>`).join("")}</select></td>
    ${compact ? "" : `<td><button class="table-action" type="button" data-delete-order="${escapeHTML(order.id)}">Delete</button></td>`}
  </tr>${order.message && !compact ? `<tr class="message-row"><td colspan="6"><span class="cell-secondary">Message: ${escapeHTML(order.message)}</span></td></tr>` : ""}`).join("")}</tbody></table>`;
}

function renderDashboard() {
  const open = orders.filter(order => ["new", "reviewing"].includes(order.status)).length;
  document.querySelector("#stat-open").textContent = String(open);
  document.querySelector("#stat-total").textContent = String(orders.length);
  document.querySelector("#stat-products").textContent = String(products.filter(product => product.active !== false).length);
  document.querySelector("#stat-customers").textContent = String(customerList().length);
  document.querySelector("#new-orders-count").textContent = String(orders.filter(order => order.status === "new").length);
  document.querySelector("#recent-orders").innerHTML = orderRows(orders.slice(0, 5), true);
}

function renderOrders() {
  const filter = document.querySelector("#order-filter").value;
  document.querySelector("#orders-table").innerHTML = orderRows(orders.filter(order => filter === "all" || order.status === filter));
}

function renderCustomers() {
  const customers = customerList();
  document.querySelector("#customer-count-label").textContent = `${customers.length} contact${customers.length === 1 ? "" : "s"}`;
  document.querySelector("#customers-table").innerHTML = customers.length ? `<table class="data-table"><thead><tr><th>Customer</th><th>Organisation</th><th>Phone</th><th>Enquiries</th><th>Last contact</th><th>Internal note</th></tr></thead><tbody>${customers.map(customer => `<tr><td><span class="cell-primary">${escapeHTML(customer.name)}</span><span class="cell-secondary">${escapeHTML(customer.email)}</span></td><td>${escapeHTML(customer.organisation || "—")}</td><td>${escapeHTML(customer.phone || "—")}</td><td>${customer.count}</td><td>${formatDate(customer.latest)}</td><td><input class="customer-note" data-customer-note="${escapeHTML(customer.email)}" value="${escapeHTML(customerNotes[customer.email] || "")}" placeholder="Add a note" /></td></tr>`).join("")}</tbody></table>` : `<div class="empty-state"><strong>No customers yet</strong><p>Customers will appear here after an enquiry is saved.</p></div>`;
}

function renderProducts() {
  document.querySelector("#product-count-label").textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
  document.querySelector("#products-table").innerHTML = products.length ? `<table class="data-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Availability</th><th>Visibility</th><th></th></tr></thead><tbody>${products.map(product => `<tr>
    <td><span class="cell-primary">${escapeHTML(product.name)}</span><span class="cell-secondary">${escapeHTML(product.code || "")}</span></td><td>${escapeHTML(product.categoryLabel || product.category || "Other")}</td><td>${currency(product.price)}</td><td>${escapeHTML(({ enquiry: "Confirm by enquiry", available: "Available", unavailable: "Unavailable" })[product.availability] || "Confirm by enquiry")}</td><td><span class="status-badge ${product.active === false ? "status-badge--cancelled" : "status-badge--fulfilled"}">${product.active === false ? "Hidden" : "Visible"}</span></td>
    <td><button class="table-action" type="button" data-edit-product="${escapeHTML(product.id)}">Edit</button> <button class="table-action" type="button" data-delete-product="${escapeHTML(product.id)}">Remove</button></td>
  </tr>`).join("")}</tbody></table>` : `<div class="empty-state"><strong>No products</strong><p>Add a product to begin building the catalogue.</p></div>`;
}

function renderContent() {
  const form = document.querySelector("#content-form");
  const fields = ["pageTitle", "metaDescription", "keywords", "announcement", "heroTitleLead", "heroTitleEmphasis", "heroDescription", "catalogueLead", "contactEmail", "disclaimer"];
  fields.forEach(field => { form.elements[field].value = content[field] || ""; });
  document.querySelector("#article-editors").innerHTML = (content.articles || []).map((article, index) => `<section class="article-editor"><h3>Article ${String(index + 1).padStart(2, "0")}</h3><div class="form-grid"><label class="span-two">Title<input name="article-title-${index}" maxlength="140" value="${escapeHTML(article.title)}" /></label><label class="span-two">Homepage summary<textarea name="article-summary-${index}" rows="2" maxlength="240">${escapeHTML(article.summary)}</textarea></label><label class="span-two">SEO title<input name="article-seo-title-${index}" maxlength="65" value="${escapeHTML(article.seoTitle || article.title)}" /></label><label class="span-two">SEO description<textarea name="article-seo-description-${index}" rows="2" maxlength="160">${escapeHTML(article.seoDescription || article.summary)}</textarea></label><label class="span-two">Article text<textarea name="article-body-${index}" rows="7" maxlength="12000" aria-label="Article ${index + 1} body">${escapeHTML(article.body || "")}</textarea></label></div></section>`).join("");
}

function renderStorageSummary() {
  const customers = customerList();
  document.querySelector("#storage-summary").innerHTML = [[products.length, "Products"], [orders.length, "Enquiries"], [customers.length, "Customers"], [(content.articles || []).length, "Research articles"]].map(([count, label]) => `<div class="storage-item"><strong>${count}</strong><span>${label}</span></div>`).join("");
}

function openProductDialog(product) {
  const dialog = document.querySelector("#product-dialog");
  const form = document.querySelector("#product-form");
  form.reset();
  form.elements.originalId.value = product?.id || "";
  document.querySelector("#product-dialog-title").textContent = product ? "Edit product" : "Add product";
  if (product) {
    ["name", "alias", "category", "categoryLabel", "code", "price", "description", "availability"].forEach(key => { form.elements[key].value = product[key] || ""; });
    form.elements.active.checked = product.active !== false;
  } else {
    form.elements.availability.value = "enquiry";
    form.elements.categoryLabel.value = "OTHER RESEARCH";
    form.elements.active.checked = true;
  }
  dialog.showModal();
}

document.querySelectorAll(".nav-item").forEach(button => button.addEventListener("click", () => goToPage(button.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(button => button.addEventListener("click", () => goToPage(button.dataset.goto)));
document.querySelector(".mobile-menu").addEventListener("click", event => {
  const open = event.currentTarget.getAttribute("aria-expanded") !== "true";
  event.currentTarget.setAttribute("aria-expanded", String(open));
  document.querySelector("#sidebar").classList.toggle("is-open", open);
});
document.querySelector("#add-product").addEventListener("click", () => openProductDialog());
document.querySelector("#products-table").addEventListener("click", event => {
  const edit = event.target.closest("[data-edit-product]");
  const remove = event.target.closest("[data-delete-product]");
  if (edit) openProductDialog(products.find(product => product.id === edit.dataset.editProduct));
  if (remove) {
    if (!window.confirm("Remove this product from the local catalogue? You can restore it later from a workspace backup.")) return;
    products = products.filter(product => product.id !== remove.dataset.deleteProduct);
    writeJSON(STORAGE.products, products); renderProducts(); renderDashboard(); showToast("Product removed from this browser’s catalogue.");
  }
});
document.querySelector("#save-product").addEventListener("click", () => {
  const form = document.querySelector("#product-form");
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const originalId = String(formData.get("originalId"));
  const name = String(formData.get("name")).trim();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const id = originalId || slug || `product-${Date.now().toString(36)}`;
  const category = String(formData.get("category"));
  const previous = products.find(product => product.id === originalId);
  const product = { id, name, alias: String(formData.get("alias")).trim(), category, categoryLabel: String(formData.get("categoryLabel")).trim(), code: String(formData.get("code")).trim(), price: String(formData.get("price")).trim(), availability: String(formData.get("availability")), description: String(formData.get("description")).trim(), active: form.elements.active.checked, tone: previous?.tone || "sage" };
  if (originalId) products = products.map(item => item.id === originalId ? product : item);
  else products.unshift(product);
  writeJSON(STORAGE.products, products);
  document.querySelector("#product-dialog").close(); renderProducts(); renderDashboard(); showToast("Product saved. The website catalogue in this browser has been updated.");
});

document.querySelector("#order-filter").addEventListener("change", renderOrders);
document.querySelector("#orders-table").addEventListener("change", event => {
  const select = event.target.closest("[data-order-status]");
  if (!select) return;
  const order = orders.find(item => item.id === select.dataset.orderStatus);
  if (order) { order.status = select.value; writeJSON(STORAGE.orders, orders); renderOrders(); renderDashboard(); showToast("Enquiry status updated."); }
});
document.querySelector("#orders-table").addEventListener("click", event => {
  const button = event.target.closest("[data-delete-order]");
  if (!button) return;
  if (!window.confirm("Remove this enquiry from the local CRM? You can restore it later from a workspace backup.")) return;
  orders = orders.filter(order => order.id !== button.dataset.deleteOrder);
  writeJSON(STORAGE.orders, orders); renderOrders(); renderDashboard(); showToast("Enquiry removed from this browser.");
});
document.querySelector("#customers-table").addEventListener("change", event => {
  const input = event.target.closest("[data-customer-note]");
  if (!input) return;
  customerNotes[input.dataset.customerNote] = input.value.trim();
  writeJSON(STORAGE.customerNotes, customerNotes); showToast("Customer note saved.");
});

document.querySelector("#content-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  ["pageTitle", "metaDescription", "keywords", "announcement", "heroTitleLead", "heroTitleEmphasis", "heroDescription", "catalogueLead", "contactEmail", "disclaimer"].forEach(key => { content[key] = String(form.elements[key].value).trim(); });
  content.articles = (content.articles || []).map((article, index) => ({ ...article, title: String(form.elements[`article-title-${index}`].value).trim(), summary: String(form.elements[`article-summary-${index}`].value).trim(), seoTitle: String(form.elements[`article-seo-title-${index}`].value).trim(), seoDescription: String(form.elements[`article-seo-description-${index}`].value).trim(), body: String(form.elements[`article-body-${index}`].value).trim() }));
  writeJSON(STORAGE.content, content); showToast("Website content saved in this browser.");
});
document.querySelector("#save-content-top").addEventListener("click", () => document.querySelector("#content-form").requestSubmit());

document.querySelector("#export-data").addEventListener("click", () => {
  const backup = { schemaVersion: 1, exportedAt: new Date().toISOString(), products, orders, content, customerNotes };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = `percy-workspace-${new Date().toISOString().slice(0, 10)}.json`; anchor.click();
  URL.revokeObjectURL(url); showToast("Workspace backup downloaded.");
});
document.querySelector("#import-data").addEventListener("change", async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    if (backup.schemaVersion !== 1 || !Array.isArray(backup.products) || !Array.isArray(backup.orders) || !backup.content || typeof backup.customerNotes !== "object") throw new Error("This file is not a supported Percy workspace backup.");
    if (!window.confirm("Replace the local Percy workspace data with this backup? Export the current data first if you may need it later.")) { event.target.value = ""; return; }
    products = backup.products; orders = backup.orders; content = backup.content; customerNotes = backup.customerNotes;
    writeJSON(STORAGE.products, products); writeJSON(STORAGE.orders, orders); writeJSON(STORAGE.content, content); writeJSON(STORAGE.customerNotes, customerNotes);
    renderDashboard(); renderStorageSummary(); showToast("Backup restored to this browser.");
  } catch (error) { showToast(error.message || "Could not read that backup file."); }
  event.target.value = "";
});

renderDashboard();
