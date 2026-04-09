/* ============================================================
   J&B SECURITY SOLUTIONS — MAIN JAVASCRIPT
   ============================================================ */

"use strict";

/* ── Dynamic Copyright Year ────────────────────────────────── */
(function initCopyright() {
  const update = () => {
    const elements = document.querySelectorAll('.current-year');
    const year = new Date().getFullYear();
    elements.forEach(el => el.textContent = year);
  };
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
})();

/* ── Navbar scroll effect ─────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile menu ──────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll-triggered animations (IntersectionObserver) ───── */
(function initAnimations() {
  const targets = document.querySelectorAll('.anim-fade-up');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

/* ── Stat counter animation ───────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start  = performance.now();

      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        el.textContent = prefix + Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();

/* ── FAQ Accordion ────────────────────────────────────────── */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Close all
      items.forEach(i => i.classList.remove('active'));
      // Open clicked if was closed
      if (!isOpen) item.classList.add('active');
    });
  });
})();

/* ── Multi-step Quote Form ────────────────────────────────── */
(function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const steps     = form.querySelectorAll('.form-step');
  const nextBtns  = form.querySelectorAll('[data-next]');
  const prevBtns  = form.querySelectorAll('[data-prev]');
  const fill      = form.querySelector('.progress-fill');
  const dotCircles = form.querySelectorAll('.step-dot');
  let current = 0;

  function updateProgress() {
    const pct = ((current) / (steps.length - 1)) * 100;
    if (fill) fill.style.width = pct + '%';

    dotCircles.forEach((dot, i) => {
      dot.classList.remove('active', 'complete');
      if (i < current)  dot.classList.add('complete');
      if (i === current) dot.classList.add('active');
    });
  }

  function goTo(idx) {
    steps[current].classList.remove('active');
    current = idx;
    steps[current].classList.add('active');
    updateProgress();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (current < steps.length - 1) goTo(current + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (current > 0) goTo(current - 1);
    });
  });

  // Submit
  const submitBtn = form.querySelector('[data-submit]');
  if (submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Gather data
      const formData = new FormData(form.closest('form'));
      const data = Object.fromEntries(formData.entries());

      try {
        // Send to FormSubmit via AJAX
        await fetch('https://formsubmit.co/ajax/info@jbsecuritysolution.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });

        // GA4 tracking
        if (typeof gtag === 'function') {
          gtag('event', 'form_submit', { event_category: 'Quote', event_label: 'quote_request' });
          gtag('event', 'quote_request');
        }

        window.location.href = '/thank-you.html';
      } catch (err) {
        console.error('Form submission error:', err);
        alert('There was an error sending your request. Please try again or call us directly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  updateProgress();
})();

/* ── Contact Form Handling ────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch('https://formsubmit.co/ajax/info@jbsecuritysolution.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (typeof gtag === 'function') {
        gtag('event', 'form_submit', { event_category: 'Contact', event_label: 'contact_form' });
      }

      window.location.href = '/thank-you.html';
    } catch (err) {
      console.error('Contact form error:', err);
      alert('There was an error sending your message. Please try again or call us directly.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
})();

/* ── Chat Widget ──────────────────────────────────────────── */
(function initChat() {
  const bubble = document.getElementById('chatBubble');
  const popup  = document.getElementById('chatPopup');
  if (!bubble || !popup) return;

  bubble.addEventListener('click', () => {
    popup.classList.toggle('open');
    bubble.setAttribute('aria-expanded', popup.classList.contains('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!bubble.contains(e.target) && !popup.contains(e.target)) {
      popup.classList.remove('open');
    }
  });
})();

/* ── Phone click tracking ─────────────────────────────────── */
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'phone_click', { event_category: 'Contact', event_label: link.href });
    }
  });
});

/* ── Smooth hash links ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
