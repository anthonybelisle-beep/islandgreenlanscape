/* Island Green Services — main.js v2 */

/* Nav scroll shadow */
const nav = document.querySelector('.site-nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Mobile nav */
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}
if (mobileClose && mobileNav) {
  mobileClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}
document.querySelectorAll('.mobile-nav a').forEach(l => l.addEventListener('click', () => {
  mobileNav && mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}));

/* Active nav link */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
    a.classList.add('active');
});

/* Animated stat counters */
const statEls = document.querySelectorAll('.stat-number[data-target]');
if (statEls.length) {
  const ease = t => 1 - Math.pow(1 - t, 3);
  const run = el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1500;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(ease(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 }).observe && statEls.forEach(el =>
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 }).observe(el)
  );
}

/* Scroll fade-in */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => obs.observe(el));
}

/* Quote form */
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `<div style="text-align:center;padding:3rem 1rem;">
        <div style="width:56px;height:56px;background:var(--orange-light);border-radius:50%;display:grid;place-items:center;margin:0 auto 1.25rem;">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style="margin-bottom:.4rem;">Request received!</h3>
        <p style="font-size:.92rem;max-width:36ch;margin:0 auto;">We'll review your project details and get back to you within 1 business day.</p>
      </div>`;
    }, 1100);
  });
}

/* FAQ accordion */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-question').setAttribute('aria-expanded','false'); });
    if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
  btn.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); btn.click(); } });
});

/* Footer year */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
