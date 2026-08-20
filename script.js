const hero = document.querySelector('.hero');
const frames = document.querySelectorAll('.art-frame');
const trailImages = ['web-assets/pixel-trail-01.png', 'web-assets/pixel-trail-02.png', 'web-assets/pixel-trail-03.png', 'web-assets/13792342604741298.jpg'];
let lastTrail = 0;
let trailIndex = 0;
hero.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5);
  const y = (event.clientY / window.innerHeight - 0.5);
  frames.forEach((frame, index) => {
    const strength = (index + 1) * 16;
    frame.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0) rotate(${x * (index - 1) * 1.6}deg)`;
  });
  const now = performance.now();
  if (now - lastTrail > 115) {
    lastTrail = now;
    const card = document.createElement('div');
    card.className = 'trail-card';
    card.style.left = `${event.clientX}px`;
    card.style.top = `${event.clientY}px`;
    card.style.rotate = `${(Math.random() * 12 - 6).toFixed(2)}deg`;
    const image = document.createElement('img');
    image.src = trailImages[trailIndex % trailImages.length];
    image.alt = '';
    card.appendChild(image);
    document.body.appendChild(card);
    trailIndex += 1;
    window.setTimeout(() => card.remove(), 1400);
  }
});
hero.addEventListener('pointerleave', () => frames.forEach(frame => frame.style.transform = ''));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.project').forEach((project, i) => { project.style.transitionDelay = `${i * 50}ms`; observer.observe(project); });
