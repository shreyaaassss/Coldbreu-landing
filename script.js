const body = document.body;
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".slider-dots button")];
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentSlide));
}

function restartSlider() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
}

document.querySelector(".next")?.addEventListener("click", () => { showSlide(currentSlide + 1); restartSlider(); });
document.querySelector(".prev")?.addEventListener("click", () => { showSlide(currentSlide - 1); restartSlider(); });
dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); restartSlider(); }));
restartSlider();

const backdrop = document.querySelector(".drawer-backdrop");
const menuDrawer = document.querySelector(".menu-drawer");
const menuTrigger = document.querySelector(".menu-trigger");

function closeMenu() {
  menuDrawer?.classList.remove("is-open");
  menuDrawer?.setAttribute("aria-hidden", "true");
  menuTrigger?.setAttribute("aria-expanded", "false");
  if (backdrop) backdrop.hidden = true;
  body.classList.remove("is-locked");
}

function openMenu() {
  menuDrawer?.classList.add("is-open");
  menuDrawer?.setAttribute("aria-hidden", "false");
  menuTrigger?.setAttribute("aria-expanded", "true");
  if (backdrop) backdrop.hidden = false;
  body.classList.add("is-locked");
}

menuTrigger?.addEventListener("click", openMenu);
document.querySelector(".drawer-close")?.addEventListener("click", closeMenu);
backdrop?.addEventListener("click", closeMenu);
document.querySelectorAll(".drawer-nav a").forEach((link) => link.addEventListener("click", closeMenu));

const searchPanel = document.querySelector(".search-panel");
document.querySelector(".search-trigger")?.addEventListener("click", () => {
  searchPanel?.classList.add("is-open");
  searchPanel?.setAttribute("aria-hidden", "false");
  body.classList.add("is-locked");
  searchPanel?.querySelector("input")?.focus();
});
document.querySelector(".search-close")?.addEventListener("click", () => {
  searchPanel?.classList.remove("is-open");
  searchPanel?.setAttribute("aria-hidden", "true");
  body.classList.remove("is-locked");
});

const cartPanel = document.querySelector(".cart-panel");
document.querySelector(".cart-trigger")?.addEventListener("click", () => {
  cartPanel?.classList.add("is-open");
  cartPanel?.setAttribute("aria-hidden", "false");
  body.classList.add("is-locked");
});
document.querySelector(".cart-close")?.addEventListener("click", () => {
  cartPanel?.classList.remove("is-open");
  cartPanel?.setAttribute("aria-hidden", "true");
  body.classList.remove("is-locked");
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = form.parentElement.querySelector(".form-message");
  message.textContent = "Thanks — you're on the list.";
  form.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    searchPanel?.classList.remove("is-open");
    cartPanel?.classList.remove("is-open");
    body.classList.remove("is-locked");
  }
});

// Keep the commercial looping even if the browser pauses autoplay (e.g. tab switch, low-power mode)
const commercial = document.querySelector(".manifesto-image video");
if (commercial) {
  commercial.muted = true;
  const play = () => commercial.play().catch(() => {});
  play();
  commercial.addEventListener("pause", () => { if (!document.hidden) play(); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) play(); });
}
