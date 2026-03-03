/* ============================================================
   MedIT-HuB Website JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- Mobile hamburger menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Active nav link highlighting ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll animations ----
  const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    animatedEls.forEach(el => observer.observe(el));
  }

  // ---- Counter animation ----
  function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const isFloat = target % 1 !== 0;
    const suffix = el.dataset.suffix || '';
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = (isFloat ? target.toFixed(1) : target.toLocaleString()) + suffix;
    };
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  // ---- Work Package Tabs ----
  const wpTabs = document.querySelectorAll('.wp-tab');
  const wpContents = document.querySelectorAll('.wp-content');
  if (wpTabs.length) {
    wpTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.wp;
        wpTabs.forEach(t => t.classList.remove('active'));
        wpContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.getElementById(`wp-${target}`);
        if (content) content.classList.add('active');
      });
    });
  }

  // ---- Contact form ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const gdpr = contactForm.querySelector('#gdpr-consent');
      if (!gdpr || !gdpr.checked) {
        alert('Please accept the privacy policy to submit the form.');
        return;
      }
      // Simulate submission
      contactForm.style.display = 'none';
      const success = document.querySelector('.form-success');
      if (success) success.style.display = 'block';
    });
  }

  // ---- Hero particles ----
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 120 + 40;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 6}s;
        animation-duration: ${Math.random() * 6 + 6}s;
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ---- Footer current year ----
  const footerCopyright = document.querySelector('.footer-bottom p');
  if (footerCopyright) {
    const currentYear = new Date().getFullYear();
    footerCopyright.textContent = footerCopyright.textContent.replace(/\b\d{4}\b/, currentYear);
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
