// Claude Code Directory — app logic

(function () {
  const TYPE_LABELS = {
    "claude-md": { label: "CLAUDE.md", icon: "📄" },
    command: { label: "Command", icon: "⚡" },
    agent: { label: "Agent", icon: "🧠" },
    mcp: { label: "MCP Server", icon: "🔌" }
  };

  const $ = (sel) => document.querySelector(sel);

  function renderCards(list, container) {
    container.innerHTML = "";
    if (!list.length) {
      $("#emptyState").hidden = false;
      return;
    }
    $("#emptyState").hidden = true;
    list.forEach((entry) => {
      const t = TYPE_LABELS[entry.type];
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="card-top">
          <span class="badge ${entry.type}">${t.icon} ${t.label}</span>
          <span style="color:var(--text-dim);font-size:.75rem">${entry.tags.slice(0, 2).join(" · ")}</span>
        </div>
        <h3>${entry.title}</h3>
        <p>${entry.desc}</p>
        <div class="card-meta">
          <span>${entry.source}</span>
        </div>`;
      card.addEventListener("click", () => openModal(entry));
      container.appendChild(card);
    });
  }

  function renderFeatured() {
    const strip = $("#featuredStrip");
    if (!strip || !FEATURED.length) return;
    strip.innerHTML = FEATURED.map((e) => `
      <div class="featured-card" data-id="${e.id}">
        <span class="f-tag">★ Featured</span>
        <h3>${TYPE_LABELS[e.type].icon} ${e.title}</h3>
        <p style="color:var(--text-dim);font-size:.8rem">${e.desc.slice(0, 90)}…</p>
      </div>`).join("");
    strip.querySelectorAll(".featured-card").forEach((el) => {
      const entry = DATA.find((d) => d.id === el.dataset.id);
      el.addEventListener("click", () => openModal(entry));
    });
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function openModal(entry) {
    const t = TYPE_LABELS[entry.type];
    const modal = $("#detailModal");
    $("#modalContent").innerHTML = `
      <span class="badge ${entry.type}">${t.icon} ${t.label}</span>
      <h2>${entry.title}</h2>
      <p class="m-desc">${entry.desc}</p>
      <div class="m-section">
        <h4>How to use</h4>
        <div class="m-code">${escapeHtml(entry.install)}</div>
      </div>
      <div class="m-section">
        <h4>Content</h4>
        <div class="m-code">${escapeHtml(entry.preview)}</div>
        <button class="copy-btn" data-copy="${encodeURIComponent(entry.preview)}">Copy content</button>
      </div>
      <div class="m-section">
        <h4>Source</h4>
        <p style="color:var(--text-dim);font-size:.9rem">${entry.source}</p>
      </div>
      <div class="m-links">
        ${entry.link ? `<a class="btn-ghost" href="${entry.link}" target="_blank" rel="noopener">View source ↗</a>` : ""}
        <a class="btn-primary" href="sponsor.html">★ Feature this listing</a>
      </div>`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    $("#detailModal").hidden = true;
    document.body.style.overflow = "";
  }

  function init() {
    renderFeatured();
    renderCards(DATA, $("#entriesGrid"));

    const search = $("#searchInput");
    const filters = document.querySelectorAll(".filter-btn");
    let activeType = "all";

    function apply() {
      const q = (search.value || "").toLowerCase().trim();
      const filtered = DATA.filter((e) => {
        const typeOk = activeType === "all" || e.type === activeType;
        if (!typeOk) return false;
        if (!q) return true;
        const haystack = (e.title + " " + e.desc + " " + e.tags.join(" ") + " " + e.source).toLowerCase();
        return haystack.includes(q);
      });
      renderCards(filtered, $("#entriesGrid"));
    }

    search.addEventListener("input", apply);
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeType = btn.dataset.type;
        apply();
      });
    });

    document.querySelectorAll("[data-close]").forEach((el) =>
      el.addEventListener("click", closeModal)
    );
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copy]");
      if (btn) {
        const text = decodeURIComponent(btn.dataset.copy);
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.textContent;
          btn.textContent = "✓ Copied!";
          setTimeout(() => (btn.textContent = original), 1500);
        });
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    $("#statEntries").textContent = DATA.length + "+";
  }

  document.addEventListener("DOMContentLoaded", init);
})();