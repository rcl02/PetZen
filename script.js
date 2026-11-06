// menu mobile
const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  burger.setAttribute('aria-expanded', aberto);
});
menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('aberto'); burger.setAttribute('aria-expanded', false); } });

// fade-in ao rolar
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); } }), {threshold: .12});
document.querySelectorAll('.fade').forEach(el => io.observe(el));

// bolhas no hero
const bolhas = document.querySelector('.bolhas');
for (let i = 0; i < 14; i++) {
  const b = document.createElement('i'), s = 14 + Math.random() * 46;
  b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;animation-duration:${9 + Math.random() * 10}s;animation-delay:${-Math.random() * 15}s`;
  bolhas.appendChild(b);
}
