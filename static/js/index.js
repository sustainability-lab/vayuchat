document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const navRow = document.querySelector(".nav-row");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  const closeMenu = () => {
    if (!navRow || !menuButton) return;
    navRow.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  if (navRow && menuButton) {
    menuButton.addEventListener("click", () => {
      const willOpen = !navRow.classList.contains("nav-open");
      navRow.classList.toggle("nav-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  document.querySelectorAll("[data-video-frame]").forEach((videoFrame) => {
    const videoButton = videoFrame.querySelector("[data-video-play]");
    const video = videoFrame.querySelector("iframe[data-src]");
    if (!videoButton || !video) return;

    videoButton.addEventListener("click", () => {
      video.src = video.dataset.src;
      videoFrame.classList.add("is-playing");
      videoButton.remove();
      video.focus();
    }, { once: true });
  });

  const sectionLinks = navLinks.filter((link) => link.getAttribute("href")?.startsWith("#"));
  const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible) return;
      sectionLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${visible.target.id}`) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-20% 0px -70%", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  const copyButton = document.querySelector("[data-copy-target]");
  const copyStatus = document.querySelector(".copy-status");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        copyButton.textContent = "Copied";
        if (copyStatus) copyStatus.textContent = "Citation copied to clipboard.";
      } catch (_) {
        if (copyStatus) copyStatus.textContent = "Select the citation text and copy it manually.";
      }

      window.setTimeout(() => {
        copyButton.textContent = "Copy BibTeX";
        if (copyStatus) copyStatus.textContent = "";
      }, 2500);
    });
  }
});
