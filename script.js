// === Theme Toggle ===
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  });
}

// === Initialize App ===
window.addEventListener('DOMContentLoaded', () => {
  // 1. Remember Theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  // 2. Dynamic Year
  const yearElement = document.getElementById('copyright');
  if (yearElement) {
    const year = new Date().getFullYear();
    yearElement.textContent = `© ${year} Kingdom of the Cosmos. All rights reserved.`;
  }

  // 3. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
