/* ==========================================================================
   Site interactivity. Vanilla JS, no build step, no dependencies.
   Every feature here degrades gracefully: content is fully readable with
   JS disabled (theme defaults to light, <details> works natively, etc.)
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  const THEME_KEY = "site-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    }
  }
  initTheme();

  function initThemeToggle() {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const links = document.querySelector("[data-nav-links]");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------- Table of contents: scrollspy + smooth scroll ---------- */
  function initToc() {
    const tocLinks = Array.from(document.querySelectorAll(".toc a"));
    if (!tocLinks.length) return;

    const targets = tocLinks
      .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
      .filter(Boolean);

    if (!targets.length) return;

    const byId = new Map(tocLinks.map((l) => [l.getAttribute("href").slice(1), l]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = byId.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
  }

  /* ---------- Tabs (multiple approaches / definitions) ---------- */
  function initTabs() {
    document.querySelectorAll(".tabs").forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll(".tab-btn"));
      const panels = Array.from(tabs.querySelectorAll(".tab-panel"));

      buttons.forEach((btn, i) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.setAttribute("aria-selected", "false"));
          panels.forEach((p) => p.classList.remove("active"));
          btn.setAttribute("aria-selected", "true");
          panels[i].classList.add("active");
        });
      });
    });
  }

  /* ---------- Copy LaTeX source for equation blocks ---------- */
  function initEquationCopy() {
    document.querySelectorAll(".eq-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const source = btn.getAttribute("data-latex") || "";
        try {
          await navigator.clipboard.writeText(source);
          btn.classList.add("copied");
          btn.setAttribute("aria-label", "LaTeX source copied");
          setTimeout(() => btn.classList.remove("copied"), 1500);
        } catch (err) {
          console.warn("Clipboard copy failed:", err);
        }
      });
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 600);
      },
      { passive: true }
    );
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initMobileNav();
    initToc();
    initTabs();
    initEquationCopy();
    initBackToTop();
  });
})();
