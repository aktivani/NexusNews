// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our latest news updates.`);
            this.reset();
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to a server
            console.log('Form submission:', formData);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.textContent;
            const articleTitle = document.querySelector('h1').textContent;
            const url = window.location.href;
            
            let shareUrl;
            switch(platform) {
                case 'Twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'Facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'LinkedIn':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    // Mobile menu toggle (for future enhancement)
    const setupMobileMenu = () => {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth < 768) {
            // Add mobile menu toggle button if it doesn't exist
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '☰';
                document.querySelector('header .container').appendChild(menuToggle);
                
                menuToggle.addEventListener('click', function() {
                    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        } else {
            // Remove toggle button and ensure nav is visible on larger screens
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
            }
            if (nav) {
                nav.style.display = 'flex';
            }
        }
    };

    // Initialize mobile menu
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // Image lazy loading for performance
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});