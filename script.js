// Typed-line effect for the hero terminal element.
// Respects prefers-reduced-motion by rendering the full line instantly.

const text = "I turn raw data into decisions worth trusting.";
const el = document.getElementById('typed');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (el) {
  if (prefersReduced) {
    el.textContent = text;
  } else {
    let i = 0;
    const speed = 28;
    function type() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
}

// Technology grid filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const techItems = document.querySelectorAll('.tech-item');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    techItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('is-hidden', !show);
    });
  });
});

// Scroll-triggered reveal animation
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedForReveal = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedForReveal) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
