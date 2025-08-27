// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    setupArticleRedirects();
    setupDropdownNavigation();
    setupSmoothScrolling();
    setupCategoryFilters();
});

// Initialize theme from localStorage
function initializeTheme() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeToggle) darkModeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (darkModeToggle) darkModeToggle.checked = false;
    }
    
    // Add event listener for theme toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

// Make entire article cards clickable
function setupArticleRedirects() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't redirect if clicking on a link or button inside the card
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                return;
            }
            
            const articleId = this.getAttribute('data-id');
            // In a real implementation, this would redirect to the actual article page
            window.location.href = `article.html?id=${articleId}`;
        });
        
        // Add hover effect styling
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    });
}

// Setup dropdown navigation for articles
function setupDropdownNavigation() {
    const articlesSelect = document.getElementById('articles-select');
    
    if (articlesSelect) {
        articlesSelect.addEventListener('change', function() {
            if (this.value) {
                // In a real implementation, this would redirect to the selected article
                window.location.href = `article.html?id=${this.value}`;
            }
        });
    }
}

// Setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup category filters
function setupCategoryFilters() {
    const categoryLinks = document.querySelectorAll('.categories-filter a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const category = this.textContent;
            filterArticlesByCategory(category);
        });
    });
}

// Filter articles by category
function filterArticlesByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    const sectionTitle = document.querySelector('.section-title');
    
    if (category === 'All News') {
        articles.forEach(article => {
            article.style.display = 'block';
        });
        if (sectionTitle) sectionTitle.textContent = 'All Articles';
        return;
    }
    
    let visibleCount = 0;
    articles.forEach(article => {
        const articleCategory = article.querySelector('.category-tag').textContent;
        
        if (articleCategory === category) {
            article.style.display = 'block';
            visibleCount++;
        } else {
            article.style.display = 'none';
        }
    });
    
    if (sectionTitle) {
        sectionTitle.textContent = `${category} Articles (${visibleCount})`;
    }
}

// Newsletter form validation
function setupNewsletterValidation() {
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // In a real implementation, you would send this to a server
            alert(`Thank you for subscribing with: ${email}`);
            emailInput.value = '';
        });
    }
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize everything when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    initializeTheme();
    setupArticleRedirects();
    setupDropdownNavigation();
    setupSmoothScrolling();
    setupCategoryFilters();
    setupNewsletterValidation();
}

// Add some additional modern features
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (img.classList.contains('lazy')) {
            imageObserver.observe(img);
        }
    });
}

// Add a "back to top" button
function setupBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&uarr;';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS for back to top button
const backToTopStyles = `
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: var(--shadow);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1000;
}

.back-to-top.show {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = backToTopStyles;
document.head.appendChild(styleSheet);

// Initialize the back to top button
setupBackToTopButton();