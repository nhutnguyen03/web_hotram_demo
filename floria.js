/* Floria-inspired micro-interactions for Ho Tram Santorini */
(() => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  if (hero) {
    const updateHero = () => {
      const y = Math.min(window.scrollY, 700);
      hero.style.setProperty('--hero-shift', `${y * 0.10}px`);
      hero.style.backgroundPosition = `center calc(50% + ${y * 0.08}px)`;
    };
    window.addEventListener('scroll', updateHero, { passive: true });
  }

  // Add a subtle active section indicator without replacing the existing theme.js logic.
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Cursor-like hover motion for editorial images on desktop.
  if (window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.highlight-card, .amenity-grid figure, .news-card').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        const image = card.querySelector('img');
        if (image) image.style.transform = `scale(1.035) translate(${x * 5}px, ${y * 5}px)`;
      });
      card.addEventListener('mouseleave', () => {
        const image = card.querySelector('img');
        if (image) image.style.transform = '';
      });
    });
  }
})();
