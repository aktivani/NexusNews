// Nexus News - Site scripts
// Fixes included: whole-card clicks, dark mode persistence, categories hover dropdown

document.addEventListener('DOMContentLoaded', () => {
  applyThemeFromStorage();
  ensureHeaderControls();     // adds/initializes theme toggle + dropdown if missing
  setupArticleCardClicks();   // makes <div class="article-card"> clickable if any exist
});

/* ============== THEME ============== */
function applyThemeFromStorage() {
  const saved = localStorage.getItem('theme');
  const theme = saved === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');
    btn.title = current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
}

/* ============== HEADER ENHANCEMENTS ============== */
function ensureHeaderControls() {
  const headerContainer = document.querySelector('header .container');
  if (!headerContainer) return;

  // Theme toggle button (inject if not present on some pages)
  if (!document.getElementById('theme-toggle-btn')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.className = 'theme-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.textContent = '🌓';
    btn.addEventListener('click', toggleTheme);
    headerContainer.appendChild(btn);
  }

  // Build a dropdown under "Categories" if the HTML lacks one
  const categoriesLi = findCategoriesNavItem();
  if (categoriesLi) {
    categoriesLi.classList.add('dropdown');
    if (!categoriesLi.querySelector('.dropdown-menu')) {
      const ul = document.createElement('ul');
      ul.className = 'dropdown-menu';
      ul.innerHTML = `
        <li><a href="article-1.html">The Rise of Quantum Computing</a></li>
        <li><a href="article-2.html">Sustainable Cities of the Future</a></li>
        <li><a href="article-3.html">Global Climate Pact Reached</a></li>
        <li><a href="article-4.html">Review: The New Titanium Smartphone</a></li>
      `;
      categoriesLi.appendChild(ul);
    }
  }
}

function findCategoriesNavItem() {
  const nav = document.querySelector('header nav ul');
  if (!nav) return null;
  const items = Array.from(nav.querySelectorAll('li'));
  return items.find(li => {
    const a = li.querySelector('a');
    return a && a.textContent.trim().toLowerCase() === 'categories';
  }) || null;
}

/* ============== CARD CLICK HANDLER ============== */
// If any page still uses <div class="article-card"> with an inner link,
// make the whole card clickable to that link.
function setupArticleCardClicks() {
  document.querySelectorAll('.article-card').forEach(card => {
    // If it's already an <a>, nothing to do.
    if (card.tagName.toLowerCase() === 'a') return;

    // Try to find a nested link (e.g., old "Read More" buttons).
    let link = card.querySelector('a');
    let href = link ? link.getAttribute('href') : null;

    // Fallback: if card has a data-id, map to article-N.html
    if (!href) {
      const id = card.getAttribute('data-id');
      if (id) href = `article-${id}.html`;
    }

    if (!href) return;

    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don’t hijack clicks on actual links/buttons inside the card
      if (e.target.closest('a') || e.target.closest('button')) return;
      window.location.href = href;
    });
  });
}
