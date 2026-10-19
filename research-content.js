(() => {
  try {
    const articleElement = document.querySelector("[data-article-id]");
    if (!articleElement) return;
    const saved = JSON.parse(localStorage.getItem("percy-site-content") || "null");
    const article = saved?.articles?.[Number(articleElement.dataset.articleId)];
    if (!article) return;
    if (article.title) {
      articleElement.querySelector("[data-article-title]").textContent = article.title;
      document.title = article.seoTitle || `${article.title} | Percy Peptides`;
      const socialTitle = document.querySelector('meta[property="og:title"]');
      if (socialTitle) socialTitle.content = document.title;
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.content = document.title;
    }
    if (article.summary) {
      articleElement.querySelector("[data-article-summary]").textContent = article.summary;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = article.seoDescription || article.summary;
      const socialDescription = document.querySelector('meta[property="og:description"]');
      if (socialDescription) socialDescription.content = article.seoDescription || article.summary;
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) twitterDescription.content = article.seoDescription || article.summary;
    }
    if (article.body) {
      const body = articleElement.querySelector("[data-article-body]");
      body.querySelectorAll(":scope > p, :scope > h2").forEach(node => node.remove());
      const referenceSection = body.querySelector(".article-references");
      article.body.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean).forEach(paragraph => {
        const node = document.createElement("p");
        node.textContent = paragraph;
        body.insertBefore(node, referenceSection || body.querySelector(".article-disclaimer"));
      });
    }
  } catch { /* Use the static article copy when local preview data is unavailable. */ }
})();
