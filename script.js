/* ==========================================================================
   Satwinder Singh Batra – Real Estate Consultant
   Main JavaScript
   ========================================================================== */

// ─────────────────────────────────────────────
// 1. CONFIGURATION — update these values
// ─────────────────────────────────────────────
const CONFIG = {
  // Your WhatsApp number (international format, no + or spaces)
  whatsappNumber: '919999048893',
  // Email that receives form queries (mailto fallback)
  contactEmail: 'batrasatvinder@gmail.com',
};

// ─────────────────────────────────────────────
// 2. NAVBAR – transparent → solid on scroll
// ─────────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─────────────────────────────────────────────
// 3. MOBILE HAMBURGER MENU
// ─────────────────────────────────────────────
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ─────────────────────────────────────────────
// 4. SCROLL-TRIGGERED REVEAL ANIMATIONS
// ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children inside grid/flex parents
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

// ─────────────────────────────────────────────
// 5. ANIMATED COUNTERS (Hero stats)
// ─────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step  = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, 25);
}

// Observe hero section for counter trigger
const heroStats = document.querySelectorAll('.hero-stat h3');
let countersRun = false;

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersRun) {
    countersRun = true;
    heroStats.forEach(stat => {
      const text   = stat.textContent.trim();
      const match  = text.match(/^(\d+)(.*)$/);
      if (match) {
        const num    = parseInt(match[1]);
        const suffix = match[2];
        animateCounter(stat, num, suffix);
      }
    });
  }
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// ─────────────────────────────────────────────
// 6. CONTACT FORM — mailto email submission
// ─────────────────────────────────────────────
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather form data
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  // Validate
  if (!name || !email || !subject || !message) {
    showFormError('Please fill in all required fields.');
    return;
  }
  if (!isValidEmail(email)) {
    showFormError('Please enter a valid email address.');
    return;
  }

  // Build mailto body
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Subject: ${subject}`,
    ``,
    `Message:`,
    message,
    ``,
    `---`,
    `Sent from SSB Realty website contact form`,
  ].join('\n');

  const mailtoLink = `mailto:${CONFIG.contactEmail}`
    + `?subject=${encodeURIComponent(`[SSB Realty Query] ${subject} – ${name}`)}`
    + `&body=${encodeURIComponent(body)}`;

  // Open default mail client
  window.location.href = mailtoLink;

  // Show success message after brief delay
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
    // Scroll success message into view
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 600);
});

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show inline validation error
function showFormError(msg) {
  let errEl = document.getElementById('form-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'form-error';
    errEl.style.cssText = 'color:#f87171;font-size:.85rem;margin-bottom:.8rem;text-align:center;';
    contactForm.prepend(errEl);
  }
  errEl.textContent = msg;
  setTimeout(() => { if (errEl) errEl.textContent = ''; }, 4000);
}

// ─────────────────────────────────────────────
// 7. WHATSAPP BUTTON – update href dynamically
// ─────────────────────────────────────────────
const waBtn = document.getElementById('whatsappBtn');
if (waBtn) {
  // Build greeting that references page URL
  const greeting = encodeURIComponent(
    'Hi Satwinder, I found your website and I am interested in your real estate services. Please get in touch!'
  );
  waBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${greeting}`;
}

// ─────────────────────────────────────────────
// 8. SMOOTH SCROLL POLYFILL (safari/edge)
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────
// 9. ACTIVE NAV LINK ON SCROLL
// ─────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--gold)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
