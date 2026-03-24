// Animação de entrada ao scroll - VERSÃO CORRIGIDA
const elementsToAnimate = document.querySelectorAll(
    "section, .modalidade-card, .gallery-grid img, .about-text, .about-image, .contact-info-side, .form-wrapper"
);

// Só adiciona data-animate nos elementos que realmente precisam de entrada
elementsToAnimate.forEach(el => {
    el.setAttribute("data-animate", "");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

// Observa apenas os elementos com data-animate
document.querySelectorAll("[data-animate]").forEach(el => {
    observer.observe(el);
});

function animateHeroText(selector) {
    const el = document.querySelector(selector);
    if (!el) return;

    const words = el.innerText.split(" ");
    el.innerHTML = words.map(word => `<span>${word}</span>`).join(" ");

    const spans = el.querySelectorAll("span");

    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.08}s`;
    });
}

// aplica no hero
animateHeroText(".hero-content h1");
animateHeroText(".subtitle");

// Menu mobile
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Slider de depoimentos - NOVO COMPORTAMENTO
let currentTestimonial = 1;
const totalTestimonials = 3;
let autoInterval = null;
let inactivityTimer = null;

function showTestimonial(n) {
    document.querySelectorAll('.testimonial').forEach(t => t.classList.remove('active'));
    document.getElementById(`t${n}`).classList.add('active');
}

function startAutoSlide() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        currentTestimonial = currentTestimonial === totalTestimonials ? 1 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    }, 6000);
}

function stopAutoSlide() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
}

function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(startAutoSlide, 8000); // volta após 8s sem clique
}

// Botões
document.getElementById('next-btn').addEventListener('click', () => {
    stopAutoSlide();
    currentTestimonial = currentTestimonial === totalTestimonials ? 1 : currentTestimonial + 1;
    showTestimonial(currentTestimonial);
    resetInactivityTimer();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    stopAutoSlide();
    currentTestimonial = currentTestimonial === 1 ? totalTestimonials : currentTestimonial - 1;
    showTestimonial(currentTestimonial);
    resetInactivityTimer();
});

// Inicia
showTestimonial(1);
startAutoSlide();

// Formulário
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // mostra o card
    feedback.classList.add('show');

    // limpa o form
    this.reset();

    // some depois de 4s
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 4000);
});
