// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar shadow on scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,.6)' : 'none';
});

// Active link highlight while scrolling
const links = document.querySelectorAll('#mainNav .nav-link[href^="#"]');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= y) current = s; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
});

// Close mobile menu after clicking a link
document.querySelectorAll('#nav a.nav-link:not(.dropdown-toggle), #nav .dropdown-item').forEach(a =>
  a.addEventListener('click', () => {
    const c = document.getElementById('nav');
    if (c.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(c).hide();
  }));

// Video modal: load on open, stop on close
const vm = document.getElementById('videoModal'), frame = document.getElementById('ytFrame');
vm.addEventListener('show.bs.modal', () => frame.src = frame.dataset.src + '?autoplay=1');
vm.addEventListener('hidden.bs.modal', () => frame.src = '');

// Booking form
const form = document.getElementById('bookingForm');
document.getElementById('date').min = new Date().toISOString().split('T')[0];
form.addEventListener('submit', e => {
  e.preventDefault();
  form.classList.add('was-validated');
  if (!form.checkValidity()) return;
  document.getElementById('formMsg').classList.remove('d-none');
  form.reset();
  form.classList.remove('was-validated');
  // TODO: send form data to your backend / WhatsApp / email service here
});