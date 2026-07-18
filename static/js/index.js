document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

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

  const sectionLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      sectionLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -65%", threshold: [0, 0.15, 0.4] });

    sections.forEach((section) => observer.observe(section));
  }
});
