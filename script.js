// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Typing effect
const roles = ['Web Developer', 'Social Media Manager', 'Hackathon Participant', 'Data Analytics Learner'];
const el = document.getElementById('typing');
let r = 0, c = 0, del = false;
(function type() {
  const word = roles[r];
  el.textContent = word.slice(0, c);
  if (!del && c < word.length) c++;
  else if (del && c > 0) c--;
  else if (!del) { del = true; return setTimeout(type, 1400); }
  else { del = false; r = (r + 1) % roles.length; }
  setTimeout(type, del ? 40 : 90);
})();

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(s => io.observe(s));

// Particle network background
const cv = document.getElementById('bg');
const ctx = cv.getContext('2d');
let W, H, pts = [];
function resize() {
  W = cv.width = innerWidth;
  H = cv.height = innerHeight;
  const n = Math.min(70, Math.floor(W * H / 22000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35
  }));
}
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.fillStyle = 'rgba(34,211,238,.6)';
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) {
        ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 130) * .35})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
addEventListener('resize', resize);
resize();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) draw();

// Contact form (opens mail app)
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('msg').value;
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(msg + '\n\nFrom: ' + name + ' (' + email + ')');
  location.href = `mailto:kawalearjun18@gmail.com?subject=${subject}&body=${body}`;
});