const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeText = themeToggle.querySelector(".theme-text");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeText.textContent = isDark ? "浅色模式" : "暗黑模式";

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

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return systemPrefersDark ? "dark" : "light";
}

const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

/* 如果用户没手动设置过，就跟随系统变化 */
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem("theme");
  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});
