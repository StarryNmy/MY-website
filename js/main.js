/* ─────────────────────────────────────────
   main.js — Academic Homepage
───────────────────────────────────────── */

// ── 1. Active nav highlight on scroll ──
const sections   = document.querySelectorAll('.section');
const navLinks   = document.querySelectorAll('.nav-link');

const observerOpts = { rootMargin: '-30% 0px -60% 0px', threshold: 0 };

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOpts);

sections.forEach(s => navObserver.observe(s));

// ── 2. Scroll-in reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// First section visible immediately
sections.forEach((s, i) => {
  if (i === 0) s.classList.add('visible');
  else revealObserver.observe(s);
});

// ── 3. Project filter ──
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.split(' ').includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── 4. Mobile menu ──
const menuBtn  = document.getElementById('menuBtn');
const sidebar  = document.getElementById('sidebar');

menuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('mobile-open');
});

// Close sidebar on nav-link tap (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (sidebar.classList.contains('mobile-open') &&
      !sidebar.contains(e.target) &&
      e.target !== menuBtn) {
    sidebar.classList.remove('mobile-open');
  }
});
