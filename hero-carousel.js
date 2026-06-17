/* Coverflow controller — vanilla, self-contained. Place at end of body
   or in an IIFE after DOM is ready. */
(function () {
  var stage = document.getElementById('cfStage');
  var track = document.getElementById('cfTrack');
  if (!stage || !track) return;
  var cards = Array.prototype.slice.call(track.querySelectorAll('.cf-card'));
  var N = cards.length;            // 7
  if (!N) return;

  var active = 0;
  var timer = null;
  var STEP_MS = 3200;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function layout() {
    for (var i = 0; i < N; i++) {
      var off = (i - active) % N;
      if (off >  N / 2) off -= N;        // wrap to shortest signed distance
      if (off < -N / 2) off += N;
      cards[i].dataset.slot = (Math.abs(off) <= 2) ? String(off) : 'hide';
    }
  }

  function go(delta) { active = (active + delta + N) % N; layout(); }
  function next() { go(1); }

  function start() {
    if (reduce.matches) return;          // never auto-rotate under reduced-motion
    if (timer) return;
    timer = setInterval(next, STEP_MS);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  /* ---- Reduced motion: static fan, no timer ---- */
  function applyMotionMode() {
    if (reduce.matches) {
      stop();
      stage.setAttribute('data-static', '');
      // ensure a legible spread: center first card, fan the rest
      active = 0;
      layout();
    } else {
      stage.removeAttribute('data-static');
      layout();
      start();
    }
  }
  applyMotionMode();
  if (reduce.addEventListener) reduce.addEventListener('change', applyMotionMode);
  else if (reduce.addListener) reduce.addListener(applyMotionMode); // Safari < 14

  /* ---- Req 3: pause on hover over the AREA (slow = full pause here) ---- */
  stage.addEventListener('mouseenter', stop);
  stage.addEventListener('mouseleave', start);

  /* ---- Perf: pause when tab hidden or stage offscreen ---- */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.15 }).observe(stage);
  }

  /* ---- Req 5: pointer drag (mobile swipe + desktop click-drag) ---- */
  var downX = null, dragging = false;
  stage.addEventListener('pointerdown', function (e) {
    downX = e.clientX; dragging = true; stop();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    var dx = (e.clientX != null ? e.clientX : downX) - downX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);   // swipe left → next
    downX = null;
    if (!reduce.matches) start();
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('pointerleave', function (e) { if (dragging) endDrag(e); });

  /* Optional: click a side card to bring it to center (nice-to-have, cheap) */
  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      if (dragging) return;            // ignore click that ended a drag
      if (card.dataset.slot !== '0' && card.dataset.slot !== 'hide') {
        active = i; layout();
      }
    });
  });
})();