
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);
    document.body.classList.toggle("is-scrolled", scrollY > 24);
  };

  updateScrollEffects();
  window.addEventListener("scroll", updateScrollEffects, { passive: true });

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener("click", () => {
      header.classList.remove("is-menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  
  const autoRevealSelectors = [
    ".feature-card",
    ".document-card",
    ".intro",
    ".info-strip",
    ".journey-node",
    ".skills",
    ".closing",
    ".page-heading"
  ];

  document.querySelectorAll(autoRevealSelectors.join(", ")).forEach((el, index) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
      
      if (el.classList.contains("feature-card") || el.classList.contains("document-card")) {
        if (index % 2 !== 0) el.classList.add("reveal--late");
      }
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  const journeyTrack = document.querySelector(".journey-track");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    if (journeyTrack) journeyTrack.classList.add("is-visible");
  } else {
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px" });

    revealElements.forEach((element) => revealObserver.observe(element));

    if (journeyTrack) {
      const trackObserver = new IntersectionObserver((entries, observer) => {
        if (!entries[0].isIntersecting) return;
        journeyTrack.classList.add("is-visible");
        observer.disconnect();
      }, { threshold: 0.1 });
      trackObserver.observe(journeyTrack);
    }
  }

 
  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 3.5}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }
  const aboutButton = document.getElementById("aboutButton");
const aboutContent = document.getElementById("aboutContent");
const aboutOverlay = document.getElementById("aboutOverlay");

if (aboutButton) {

    aboutButton.addEventListener("click", () => {

        aboutContent.classList.toggle("open");

        aboutOverlay.classList.toggle("hide");

        if (aboutContent.classList.contains("open")) {

            aboutButton.innerHTML = "↑ Kevesebb";

        } else {

            aboutButton.innerHTML = "↓ Tovább olvasom";

        }

    });

}
});