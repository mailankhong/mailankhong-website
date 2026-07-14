// Cursor-spotlight grid: brightens the per-section background grid around the
// pointer. Each section/hero gets local pointer coords (--lx/--ly) used by its
// ::after spotlight mask. White on dark sections, warm orange on beige ones.
(function () {
  if (window.matchMedia && window.matchMedia('(pointer:coarse)').matches) return;
  const secs = Array.prototype.slice.call(document.querySelectorAll('.sec, .hero'));
  let ev = null, raf = 0;
  function tick() {
    raf = 0;
    if (!ev) return;
    for (let i = 0; i < secs.length; i++) {
      const r = secs[i].getBoundingClientRect();
      if (r.bottom < -300 || r.top > window.innerHeight + 300) continue; // skip off-screen
      secs[i].style.setProperty('--lx', (ev.clientX - r.left) + 'px');
      secs[i].style.setProperty('--ly', (ev.clientY - r.top) + 'px');
    }
  }
  window.addEventListener('mousemove', function (e) {
    ev = e;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
})();
