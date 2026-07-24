const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const menuViewer = document.getElementById('menuViewer');
const menuOpenButtons = document.querySelectorAll('[data-open-menu]');
const menuCloseButton = document.querySelector('[data-close-menu]');

function openPhotographicMenu() {
  menuViewer.classList.add('open');
  menuViewer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePhotographicMenu() {
  menuViewer.classList.remove('open');
  menuViewer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

menuOpenButtons.forEach(button => button.addEventListener('click', openPhotographicMenu));
menuCloseButton.addEventListener('click', closePhotographicMenu);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuViewer.classList.contains('open')) closePhotographicMenu();
});
