/* ═══════════════════════════════════════════
   SkillsConnects Palma 2026 — Wolters Kluwer
   main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. REVEAL ON SCROLL ── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal so it stays visible
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));


  /* ── 2. ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav ul li a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => navObserver.observe(section));


  /* ── 3. NAV BACKGROUND OPACITY ON SCROLL ── */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.06)';
    }
  }, { passive: true });


  /* ── 4. SMOOTH SCROLL FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. STAGGERED CARD ANIMATIONS ── */
  // Add delay to grid cards so they animate one by one
  const cardGrids = document.querySelectorAll('.piloto-grid, .viabilidad-grid, .resumen-cards');

  cardGrids.forEach(grid => {
    const cards = grid.children;
    Array.from(cards).forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });
  });

});
