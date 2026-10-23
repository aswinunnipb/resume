const animatedItems = document.querySelectorAll(".project, .role, .stack-grid > div, .section-label");

const siteIntro = document.querySelector(".site-intro");
if (siteIntro) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() => siteIntro.classList.add("is-playing"));
  window.setTimeout(() => {
    siteIntro.classList.add("is-leaving");
    window.setTimeout(() => siteIntro.remove(), 700);
  }, reduceMotion ? 100 : 2200);
}

document.documentElement.classList.add("motion-ready");
animatedItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

animatedItems.forEach((item) => observer.observe(item));

// Duplicate every supplied technology icon with a distinct path to form a dense, continuous upward stream.
document.querySelectorAll(".finale-hud .hud-icon").forEach((icon, index) => {
  const echo = icon.cloneNode(true);
  echo.classList.add("hud-echo");
  echo.style.setProperty("--x", `${(index * 17 + 9) % 94}%`);
  echo.style.setProperty("--y", `${91 + (index * 9) % 26}%`);
  echo.style.setProperty("--size", `${48 + (index * 11) % 37}px`);
  echo.style.setProperty("--delay", `${-(index * 1.37 + 2)}s`);
  echo.style.setProperty("--duration", `${13 + (index % 7)}s`);
  icon.parentElement.appendChild(echo);
});
