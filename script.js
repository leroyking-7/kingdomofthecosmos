// === Theme Toggle ===
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// === Remember Theme ===
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  // === Dynamic Year ===
  const year = new Date().getFullYear();
  document.getElementById('copyright').textContent =
    `© ${year} Kingdom of the Cosmos. All rights reserved.`;
});
