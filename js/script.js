document.addEventListener('DOMContentLoaded', () => {
  applyThemeFromStorage();
  setupThemeToggle();
  setupArticleRedirects();
  setupNewsletterForm();
  setupBackToTop();
  ensureDropdown();
});

function applyThemeFromStorage() {
  const saved = localStorage.getItem('theme');
  const theme = saved === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
}
function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.addEventListener('click', toggleTheme);
}

function setupArticleRedirects() {
  const articleCards = document.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    if (card.tagName.toLowerCase() === 'a') return; 
    const link = card.querySelector('a');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = link.href;
      });
    }
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    alert('Thank you for subscribing, ' + email + '!');
    form.reset();
  });
}

function setupBackToTop() {
  let btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function ensureDropdown() {
  const nav = document.querySelector('nav ul');
  if (!nav) return;
  const categoriesLi = [...nav.children].find(li => li.textContent.includes('Categories'));
  if (!categoriesLi) return;
  categoriesLi.classList.add('dropdown');
  if (!categoriesLi.querySelector('.dropdown-menu')) {
    const ul = document.createElement('ul');
    ul.className = 'dropdown-menu';
    ul.innerHTML = `
      <li><a href="article-1.html">The Rise of Quantum Computing</a></li>
      <li><a href="article-2.html">Sustainable Cities of the Future</a></li>
      <li><a href="article-3.html">Global Climate Pact Reached</a></li>
      <li><a href="article-4.html">Review: The New Titanium Smartphone</a></li>
      <li><a href="article-5.html">Breakthrough in Artificial Intelligence</a></li>
      <li><a href="article-6.html">Exploring the Depths of the Ocean</a></li>
      <li><a href="article-7.html">Mars Colonization: Next Giant Leap</a></li>
      <li><a href="article-8.html">The Future of Renewable Energy</a></li>
    `;
    categoriesLi.appendChild(ul);
  }
}
