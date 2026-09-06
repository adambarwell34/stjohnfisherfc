const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const mainNav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
});

const matchDate = new Date('2026-09-06T15:00:00');

function updateCountdown() {
  const daysEl = document.querySelector('#cd-days');
  if (!daysEl) return;

  const now = new Date();
  const diff = matchDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    document.querySelector('#cd-hours').textContent = "00";
    document.querySelector('#cd-mins').textContent = "00";
    document.querySelector('#cd-secs').textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  document.querySelector('#cd-hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#cd-mins').textContent = String(minutes).padStart(2, '0');
  document.querySelector('#cd-secs').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  let current = 0;
  const increment = target / 60;

  function step() {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  step();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

statNumbers.forEach(num => observer.observe(num));

const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);
  });
});

setInterval(() => {
  const nextSlide = (currentSlide + 1) % slides.length;
  showSlide(nextSlide);
}, 4000);

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

document.addEventListener("mousemove", (e) => {
  const football = document.getElementById("football");
  if (!football) return;

  football.style.left = `${e.clientX}px`;
  football.style.top = `${e.clientY}px`;
});

const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;

if (heroSlides.length > 0) {
  setInterval(() => {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }, 5000);
}