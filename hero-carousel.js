/* Coverflow controller — vanilla, self-contained.
   Inclui: rotação automática, entrada coreografada (cards montam a formação),
   float contínuo, tilt 3D que segue o cursor, swipe mobile e reduced-motion. */
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

  /* entrada: cards começam recuados/invisíveis (data-entrance="pending") */
  var hasEntered = false;
  var heroSection = stage.closest('.lp-hero');
  if (!reduce.matches) stage.dataset.entrance = 'pending';

  function layout() {
    for (var i = 0; i < N; i++) {
      var off = (i - active) % N;
      if (off >  N / 2) off -= N;        // menor distância com sinal
      if (off < -N / 2) off += N;
      cards[i].dataset.slot = (Math.abs(off) <= 2) ? String(off) : 'hide';
    }
  }

  function go(delta) { active = (active + delta + N) % N; layout(); }
  function next() { go(1); }

  function start() {
    if (reduce.matches) return;          // nunca gira sob reduced-motion
    if (!hasEntered) return;             // não gira durante a montagem da entrada
    if (timer) return;
    timer = setInterval(next, STEP_MS);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  /* reduced-motion: leque estático, sem timer */
  function applyMotionMode() {
    if (reduce.matches) {
      stop();
      stage.removeAttribute('data-entrance');
      stage.setAttribute('data-static', '');
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

  /* pausa ao passar o mouse na área */
  stage.addEventListener('mouseenter', stop);
  stage.addEventListener('mouseleave', start);

  /* pausa quando a aba fica oculta */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  /* ---- Entrada coreografada (um disparo) + pausa offscreen ---- */
  function runEntrance() {
    if (hasEntered) return;
    if (reduce.matches) { finishEntrance(); return; }        // reduced-motion = fade simples
    if (heroSection) heroSection.classList.add('cf-intro');  // copy + ticker sobem
    requestAnimationFrame(function () {
      stage.dataset.entrance = 'in';                         // vira os vars -> transição .9s leva os cards à formação
      var center = cards[active];
      if (center) center.classList.add('cf-enter-draw');     // redesenha o gráfico do centro
      var done = false;
      var finish = function () { if (done) return; done = true; finishEntrance(); };
      if (center) center.addEventListener('transitionend', function te(e) {
        if (e.propertyName === 'transform') { center.removeEventListener('transitionend', te); finish(); }
      });
      setTimeout(finish, 1300);          // segurança: stagger(180)+duração(900)+folga
    });
  }
  function finishEntrance() {
    hasEntered = true;
    stage.removeAttribute('data-entrance');  // remove os delays de stagger -> rotação sem atraso
    if (!reduce.matches) {
      stage.classList.add('cf-live');        // liga o float contínuo
      start();                               // entrega pra rotação automática
    }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (!hasEntered) runEntrance();                          // monta uma vez
          else { stage.classList.add('cf-live'); start(); }        // retoma após sair de vista
        } else { stop(); if (hasEntered) stage.classList.remove('cf-live'); }
      });
    }, { threshold: 0.15 }).observe(stage);
  } else { runEntrance(); }                  // sem IO -> monta imediatamente

  /* ---- Arrastar (swipe mobile + click-drag desktop) ---- */
  var downX = null, dragging = false;
  stage.addEventListener('pointerdown', function (e) {
    downX = e.clientX; dragging = true; stop();
  });
  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    var dx = (e.clientX != null ? e.clientX : downX) - downX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);   // arrastar pra esquerda → próximo
    downX = null;
    if (!reduce.matches) start();
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('pointerleave', function (e) { if (dragging) endDrag(e); });

  /* clicar num card lateral o traz pro centro */
  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      if (dragging) return;
      if (card.dataset.slot !== '0' && card.dataset.slot !== 'hide') {
        active = i; layout();
      }
    });
  });

  /* ---- Tilt 3D que segue o cursor (só ponteiro fino, sem reduced-motion) ---- */
  var fine = window.matchMedia('(pointer:fine)');
  if (fine.matches && !reduce.matches) {
    var tiltRAF = null, pendingX = 0, pendingY = 0;
    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      pendingY = ((e.clientX - r.left) / r.width  - 0.5) *  12; // rotateY -6..+6
      pendingX = ((e.clientY - r.top ) / r.height - 0.5) * -8;  // rotateX +4..-4 (parallax)
      if (tiltRAF) return;
      tiltRAF = requestAnimationFrame(function () {
        track.style.setProperty('--cf-ty', pendingY.toFixed(2) + 'deg');
        track.style.setProperty('--cf-tx', pendingX.toFixed(2) + 'deg');
        tiltRAF = null;
      });
    });
    stage.addEventListener('mouseleave', function () {
      track.style.setProperty('--cf-ty', '0deg');
      track.style.setProperty('--cf-tx', '0deg');
    });
  }
})();
