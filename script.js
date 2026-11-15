/* JOEL WILLIAMS MATHEW —DOSSIER · global bootstrap (defensive) */
// Preloader
(function () {
  var pre = document.getElementById('preloader');
  if (!pre) return;
  var done = function () {
    pre.style.opacity = '0';
    pre.style.visibility = 'hidden';
    setTimeout(function () { try { pre.remove(); } catch (e) {} }, 650);
  };
  var preBar = document.getElementById('preBar'), preText = document.getElementById('preText');
  var steps = ['loading universe_', 'warming nebula_', 'calibrating stars_', 'deploying intelligence_'];
  var pv = 0, iv = setInterval(function () {
    pv += Math.random() * 28 + 10;
    if (pv >= 100) { pv = 100; clearInterval(iv); setTimeout(done, 380); }
    if (preBar) preBar.style.width = pv + '%';
    if (preText) preText.textContent = steps[Math.min(steps.length - 1, Math.floor(pv / 26))];
  }, 140);
  // Hold no more than 3.5s
  setTimeout(function () { try { clearInterval(iv); done(); } catch (e) {} }, 3500);
})();

// Starfield canvas
(function () {
  var c = document.getElementById('stars');
  if (!c) return;
  var x = c.getContext && c.getContext('2d');
  if (!x) return;
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W, H, stars = [], shoots = [];
  function size() {
    W = c.width = innerWidth; H = c.height = innerHeight;
    stars = Array.from({ length: 180 }, function () {
      return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .3, s: Math.random() * .35 + .06, o: Math.random() * .6 + .2 };
    });
  }
  size();
  addEventListener('resize', size);
  setInterval(function () {
    if (shoots.length < 2 && Math.random() > .55) shoots.push({ x: Math.random() * W * .7 + W * .15, y: Math.random() * H * .25, vx: 6 + Math.random() * 4, vy: 2.5 + Math.random() * 2, life: 1 });
  }, 1400);
  (function loop() {
    x.clearRect(0, 0, W, H);
    stars.forEach(function (s) {
      s.y += s.s; if (s.y > H) s.y = 0;
      s.o += Math.random() * .04 - .02; s.o = Math.max(.15, Math.min(.85, s.o));
      x.globalAlpha = s.o; x.fillStyle = '#fff'; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fill();
    });
    shoots = shoots.filter(function (s) { return s.life > 0; });
    shoots.forEach(function (s) {
      s.x += s.vx; s.y += s.vy; s.life -= .018;
      var g = x.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
      g.addColorStop(0, 'rgba(255,255,255,' + (.9 * s.life) + ')');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.globalAlpha = 1; x.strokeStyle = g; x.lineWidth = 2; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x - s.vx * 9, s.y - s.vy * 9); x.stroke();
    });
    x.globalAlpha = 1; requestAnimationFrame(loop);
  })();
})();

// Typed hero line
(function () {
  var roles = ['AI/ML Developer', 'Generative AI Builder', 'Intelligent Systems Designer', 'Computer Vision Explorer'];
  var el = document.getElementById('typed');
  if (!el) return;
  var ri = 0, ci = 0, del = false;
  (function type() {
    var word = roles[ri];
    el.textContent = word.slice(0, ci);
    if (!del) { ci++; if (ci > word.length) { del = true; return setTimeout(type, 1800); } }
    else { ci--; if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
    setTimeout(type, del ? 38 : 70);
  })();
})();

// Marquee ticker
(function () {
  var items = ['PYTHON', 'TENSORFLOW', 'LLMS', 'LANGCHAIN', 'RAG', 'OPENCV', 'CNN', 'REACT', 'NASA SPACE APPS', 'GEN AI'];
  var mq = document.getElementById('marquee');
  if (!mq) return;
  mq.innerHTML = items.concat(items).map(function (t) { return '<span><b>✦</b> ' + t + '</span>'; }).join('');
})();

// Reveal on scroll (IntersectionObserver)
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; el.style.filter = 'none'; });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; e.target.style.filter = 'none'; io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();

// ============ Ambient hero cursor tracking ============
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  function onMove(e) {
    var r = hero.getBoundingClientRect();
    var x = ((e.clientX - r.left) / r.width) * 100;
    var y = ((e.clientY - r.top) / r.height) * 100;
    hero.style.setProperty('--mx', x.toFixed(1) + '%');
    hero.style.setProperty('--my', y.toFixed(1) + '%');
  }
  hero.addEventListener('mousemove', onMove, { passive: true });
})();
// ============ Scroll Reveal (.rx) â€” rises in as you scroll ============
(function () {
  var els = document.querySelectorAll('.rx');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('rx-in'); }); return; }
  var rx = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rx-in'); rx.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  els.forEach(function (el) { rx.observe(el); });
})();

// Chapter dots / section rail
(function () {
  var chaps = Array.prototype.slice.call(document.querySelectorAll('.chap'));
  if (!('IntersectionObserver' in window)) return;
  var secio = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) { chaps.forEach(function (c) { c.classList.toggle('on', c.dataset.ch === en.target.id); }); }
    });
  }, { threshold: 0.35 });
  ['top', 'about', 'work', 'experience', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) secio.observe(el);
  });
})();

// Scroll progress bar
(function () {
  var bar = document.getElementById('progress');
  if (!bar) return;
  var onScroll = function () {
    var h = document.documentElement;
    var max = Math.max(1, h.scrollHeight - h.clientHeight);
    bar.style.width = (h.scrollTop / max * 100) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Clock
(function () {
  var cl = document.getElementById('clock');
  if (!cl) return;
  var tick = function () {
    var t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    cl.textContent = t + ' IST';
  };
  tick();
  setInterval(tick, 30000);
})();

// Theme toggle
(function () {
  var sel = document.getElementById('themeSelect');
  if (!sel) return;
  var apply = function (t) {
    document.documentElement.dataset.theme = t;
    sel.value = t;
    try { localStorage.setItem('jw-theme', t); } catch (e) {}
  };
  sel.addEventListener('change', function (e) { apply(e.target.value); });
  try {
    var saved = localStorage.getItem('jw-theme');
    if (saved) apply(saved);
  } catch (e) {}
})();

// Resume button state (best effort)
(function () {
  var btn = document.getElementById('resumeBtn');
  var note = document.getElementById('resumeNote');
  if (!btn) return;
  try {
    fetch('assets/joel-resume.pdf', { method: 'HEAD' }).then(function (r) {
      if (r.ok) { btn.style.opacity = '1'; } else { btn.style.opacity = '.55'; btn.setAttribute('aria-disabled', 'true'); }
    }).catch(function () { btn.style.opacity = '.55'; });
  } catch (e) { btn.style.opacity = '.55'; }
})();
