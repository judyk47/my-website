// Portfolio interactions: scroll-triggered reveals for sections,
// batch reveal for skill cards, and column-by-column reveal for the tech grid.
// All effects fall back to "just show everything" when reduced motion is on
// or IntersectionObserver isn't supported.

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showAllFallback() {
  document.querySelectorAll('.reveal, .reveal-right, .tech-item').forEach((el) => {
    el.classList.add('is-visible');
  });
}

if (prefersReduced || !('IntersectionObserver' in window)) {
  showAllFallback();
} else {

  // Generic fade-up reveal (section headers, project cards, contact block)
  const genericEls = document.querySelectorAll('.reveal');
  const genericObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          genericObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  genericEls.forEach((el) => genericObserver.observe(el));

  // Skills: reveal each batch of 3 cards together, staggered slightly
  const batches = document.querySelectorAll('.skills-batch');
  const batchObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.reveal-right');
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('is-visible'), i * 120);
          });
          batchObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
  );
  batches.forEach((batch) => batchObserver.observe(batch));

  // Tech grid: reveal column by column once the grid comes into view
  const techGrid = document.getElementById('techGrid');
  if (techGrid) {
    const techObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (let col = 1; col <= 5; col++) {
              const items = techGrid.querySelectorAll(`.tech-item[data-col="${col}"]`);
              setTimeout(() => {
                items.forEach((item) => item.classList.add('is-visible'));
              }, (col - 1) * 160);
            }
            techObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    techObserver.observe(techGrid);
  }
}
