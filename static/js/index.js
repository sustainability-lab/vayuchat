document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".nav-island");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  if (nav && menuButton) {
    menuButton.addEventListener("click", () => {
      const willOpen = !nav.classList.contains("nav-open");
      nav.classList.toggle("nav-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const sectionLinks = navLinks.filter((link) => link.getAttribute("href")?.startsWith("#"));
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-28% 0px -60%", threshold: [0, 0.15, 0.4] });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const reveals = [...document.querySelectorAll("[data-reveal]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    reveals.forEach((element) => revealObserver.observe(element));
  }

  const copyButton = document.querySelector("[data-copy-target]");
  const copyStatus = document.querySelector(".copy-status");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        copyButton.querySelector("span").textContent = "Copied";
        if (copyStatus) copyStatus.textContent = "Citation copied to clipboard.";
      } catch (_) {
        if (copyStatus) copyStatus.textContent = "Select the citation text and copy it manually.";
      }

      window.setTimeout(() => {
        copyButton.querySelector("span").textContent = "Copy citation";
        if (copyStatus) copyStatus.textContent = "";
      }, 2500);
    });
  }
});
