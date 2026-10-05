const $ = s => document.querySelector(s);
const song = $('#song'), playBtn = $('#playBtn'), seek = $('#seek'), vol = $('#vol');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- starfield ---- */
const sc = $('#stars'), sx = sc.getContext('2d');
let stars = [];
function sizeStars() {
  sc.width = innerWidth; sc.height = innerHeight;
  stars = Array.from({ length: Math.min(140, innerWidth / 6) }, () => ({
    x: Math.random() * sc.width, y: Math.random() * sc.height,
    r: Math.random() * 1.6 + .3, p: Math.random() * 6, s: Math.random() * .4 + .1,
    c: Math.random() > .85 ? '255,209,102' : '200,215,255'
  }));
}
function drawStars(t = 0) {
  sx.clearRect(0, 0, sc.width, sc.height);
  for (const s of stars) {
    s.y -= s.s * .3; if (s.y < 0) s.y = sc.height;
    sx.fillStyle = `rgba(${s.c},${.35 + .35 * Math.sin(t / 700 + s.p)})`;
    sx.beginPath(); sx.arc(s.x, s.y, s.r, 0, 7); sx.fill();
  }
  if (!reduce) requestAnimationFrame(drawStars);
}
addEventListener('resize', sizeStars); sizeStars(); drawStars();

/* ---- confetti ---- */
const cc = $('#confetti'), cx = cc.getContext('2d');
let bits = [], raf;
function confetti(n = 110) {
  if (reduce) return;
  cc.width = innerWidth; cc.height = innerHeight;
  const cols = ['#ffd166', '#6d8cff', '#a07cff', '#ffffff'];
  for (let i = 0; i < n; i++) bits.push({
    x: innerWidth / 2, y: innerHeight * .6, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4,
    w: Math.random() * 8 + 4, h: Math.random() * 5 + 3, a: Math.random() * 6, va: (Math.random() - .5) * .4,
    c: cols[i % 4], life: 1
  });
  cancelAnimationFrame(raf); tick();
}
function tick() {
  cx.clearRect(0, 0, cc.width, cc.height);
  bits = bits.filter(b => b.life > 0);
  for (const b of bits) {
    b.vy += .35; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.a += b.va; b.life -= .008;
    cx.save(); cx.globalAlpha = Math.max(b.life, 0); cx.translate(b.x, b.y); cx.rotate(b.a);
    cx.fillStyle = b.c; cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cx.restore();
  }
  if (bits.length) raf = requestAnimationFrame(tick); else cx.clearRect(0, 0, cc.width, cc.height);
}

/* ---- open surprise (music starts only after this click) ---- */
$('#openBtn').addEventListener('click', () => {
  song.volume = +vol.value;
  song.play().then(() => playBtn.textContent = '⏸').catch(() => playBtn.textContent = '▶');
  confetti();
  $('#intro').hidden = true;
  $('#main').hidden = false;
  scrollTo(0, 0);
  watch();
});

/* ---- player ---- */
playBtn.addEventListener('click', () => {
  if (song.paused) { song.play(); playBtn.textContent = '⏸'; }
  else { song.pause(); playBtn.textContent = '▶'; }
});
vol.addEventListener('input', () => song.volume = +vol.value);
song.addEventListener('timeupdate', () => { if (song.duration) seek.value = song.currentTime / song.duration * 100; });
seek.addEventListener('input', () => { if (song.duration) song.currentTime = seek.value / 100 * song.duration; });

/* ---- lightbox ---- */
const lb = $('#lightbox');
document.querySelectorAll('.polaroid').forEach(p => {
  const img = p.querySelector('img');
  img.addEventListener('error', () => img.style.visibility = 'hidden'); // keeps the gradient placeholder
  p.tabIndex = 0;
  const open = () => {
    if (img.style.visibility === 'hidden') return;
    $('#lbImg').src = img.src; $('#lbCap').textContent = p.querySelector('figcaption').textContent;
    lb.hidden = false;
  };
  p.addEventListener('click', open);
  p.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
});
const close = () => lb.hidden = true;
$('#lbClose').addEventListener('click', close);
lb.addEventListener('click', e => { if (e.target === lb) close(); });
addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

/* ---- wish fade-in + final confetti ---- */
function watch() {
  const lines = [...document.querySelectorAll('.wish-text p')];
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    lines.forEach((l, i) => setTimeout(() => l.classList.add('on'), reduce ? 0 : i * 900));
    o.disconnect();
  }), { threshold: .3 }).observe($('#wishText'));
  new IntersectionObserver((es, o) => es.forEach(e => {
    if (e.isIntersecting) { confetti(80); o.disconnect(); }
  }), { threshold: .6 }).observe($('#finale h2'));
}
