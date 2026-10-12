(() => {
  history.scrollRestoration = 'manual';

  const resetScrollPosition = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  resetScrollPosition();
  window.addEventListener('pageshow', resetScrollPosition);

  const revealTargets = document.querySelectorAll(
    '.section-block, #recent, #faq, .service-card, .card, .accordion-item, .about-image'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
  });

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12
    }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
})();
