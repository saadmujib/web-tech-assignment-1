function initNav() {
  const btn = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      btn.classList.remove("open");
      links.classList.remove("open");
    });
  });
}
function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const slides = Array.from(track.children);
  const dotsWrap = document.querySelector(".carousel-nav");
  const prevBtn = document.querySelector(".carousel-arrow.prev");
  const nextBtn = document.querySelector(".carousel-arrow.next");
  let index = 0;
  let timer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll(".dot").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(index + 1), 5000);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

  update();
  resetTimer();
}
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  items[0].classList.add("open");
  items[0].querySelector(".accordion-panel").style.maxHeight =
    items[0].querySelector(".accordion-panel").scrollHeight + "px";
}
function initGallery() {
  const items = document.querySelectorAll(".frame");
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.style.outline = "none");
      item.style.outline = "2px solid #a63d2f";
      item.style.outlineOffset = "-2px";
    });
  });
}
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");

  const rules = {
    name: (v) => v.trim().length >= 2 || "Enter your full name.",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    subject: (v) => v.trim().length >= 3 || "Subject is too short.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  function validateField(field) {
    const input = form.querySelector(`[name="${field}"]`);
    const wrapper = input.closest(".field");
    const errorBox = wrapper.querySelector(".error");
    const result = rules[field](input.value);

    if (result === true) {
      wrapper.classList.remove("invalid");
      errorBox.textContent = "";
      return true;
    } else {
      wrapper.classList.add("invalid");
      errorBox.textContent = result;
      return false;
    }
  }

  Object.keys(rules).forEach((field) => {
    const input = form.querySelector(`[name="${field}"]`);
    input.addEventListener("blur", () => validateField(field));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = Object.keys(rules).map(validateField).every(Boolean);

    if (allValid) {
      status.textContent = "Thanks , your message looks good. (Static demo: no server is connected yet.)";
      status.classList.add("show");
      form.reset();
    } else {
      status.textContent = "Please fix the highlighted fields.";
      status.classList.add("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCarousel();
  initAccordion();
  initGallery();
  initContactForm();
});
