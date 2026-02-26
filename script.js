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
document.querySelectorAll(".toggleBtn").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    target.classList.toggle("active");
  });
});
document.querySelector(".toggleMore").addEventListener("click", function(){
  document.querySelector(".moreContent").classList.toggle("active");

  this.textContent =
    this.textContent.includes("More")
      ? "View Our Track Record & Supplied Items"
      : "View Our Track Record & Supplied Items";
});
document.querySelectorAll('.capHeader').forEach(header => {
  header.addEventListener('click', () => {
    const card = header.parentElement;

    document.querySelectorAll('.capCard').forEach(item => {
      if(item !== card){
        item.classList.remove('active');
      }
    });

    card.classList.toggle('active');
  });
});
