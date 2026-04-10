const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const themeText = themeToggle.querySelector(".theme-text");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    if (themeText) {
      themeText.textContent = isDark ? "浅色模式" : "暗黑模式";
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", isDark ? "#020617" : "#2563eb");
    }
  }

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return systemPrefersDark ? "dark" : "light";
  }

  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (event) => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

/* 滚动显现动画 */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

reveals.forEach((item) => observer.observe(item));
