document.addEventListener('DOMContentLoaded', () => {
  const typedEl = document.querySelector('.typing');
  const roles = [
    'Frontend Developer',
    'UI Designer',
    'JavaScript Developer'
  ];

  if (typedEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseAfterType = 1200;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          setTimeout(() => { deleting = true; tick(); }, pauseAfterType);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
    }
    tick();
  }


  const navLinks = document.getElementById('navLinks');
  function toggleMenu() {
    if (!navLinks) return;
    navLinks.classList.toggle('show'); 
  }
  window.toggleMenu = toggleMenu;


  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
  }


  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 850) navLinks.classList.remove('show');
      });
    });
  }


  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;

  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme === 'light') body.classList.add('light-mode');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('light-mode');

      if (themeBtn.classList.contains('fa-moon')) {
        themeBtn.classList.remove('fa-moon');
        themeBtn.classList.add('fa-sun');
      } else {
        themeBtn.classList.remove('fa-sun');
        themeBtn.classList.add('fa-moon');
      }

      localStorage.setItem(
        'site-theme',
        body.classList.contains('light-mode') ? 'light' : 'dark'
      );
    });
  }


  const missing = [];
  if (!typedEl) missing.push('.typing');
  if (!navLinks) missing.push('#navLinks');
  if (!menuBtn) missing.push('.menu-btn');
  if (!themeBtn) missing.push('#themeBtn');
  if (missing.length) {
    console.info(
      'Note: some UI elements were not found in the DOM:',
      missing.join(', '),
      '\n(If you expect them, ensure the element IDs/classes match and script runs after DOM loads.)'
    );
  }
});
