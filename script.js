// Small progressive enhancement: animate the "Projects delivered" number.
(function () {
  const el = document.querySelector('[data-count]');
  if (!el) return;

  const target = Number(el.getAttribute('data-count'));
  if (!Number.isFinite(target)) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = `${target}+`;
    return;
  }

  let started = false;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && !started) {
        started = true;
        let n = 0;
        const steps = 40;
        const inc = Math.max(1, Math.floor(target / steps));
        const t = setInterval(() => {
          n += inc;
          if (n >= target) {
            n = target;
            clearInterval(t);
          }
          el.textContent = `${n}+`;
        }, 20);
      }
    }
  }, { threshold: 0.4 });

  io.observe(el);
})();
