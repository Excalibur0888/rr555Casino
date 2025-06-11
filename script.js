// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        // Insert toggle button before the nav menu
        navContainer.insertBefore(navToggle, navMenu);
        
        // Toggle menu on button click
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            const icon = navToggle.querySelector('i');
            icon.className = navMenu.classList.contains('nav-menu-open') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('nav-menu-open')) {
                navMenu.classList.remove('nav-menu-open');
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });

        // Close menu when window is resized above mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 968 && navMenu.classList.contains('nav-menu-open')) {
                navMenu.classList.remove('nav-menu-open');
                const icon = navToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const categoryItems = document.querySelectorAll('.category-item');
            
            categoryItems.forEach(item => {
                const categoryText = item.querySelector('span').textContent.toLowerCase();
                if (categoryText.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // If search is empty, show all categories
            if (searchTerm === '') {
                categoryItems.forEach(item => {
                    item.style.display = 'flex';
                });
            }
        });
    }
    
    // Category filtering
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            const categoryName = this.querySelector('span').textContent;
            console.log('Selected category:', categoryName);
            // Add filtering logic here if needed
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .game-card, .testimonial-card, .deal-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[src=""]');
    images.forEach(img => {
        // Set placeholder background
        img.style.background = 'linear-gradient(45deg, #2a2a2a, #1a1a1a)';
        img.style.minHeight = '200px';
        img.style.display = 'block';
    });
    
    // Floating Action Button animations
    const fabs = document.querySelectorAll('.fab');
    fabs.forEach(fab => {
        fab.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        fab.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Ticker animation control
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        // Pause animation on hover
        tickerContent.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        tickerContent.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Form validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation logic here
            console.log('Form submitted');
        });
    });
    
    // Button click tracking
    const trackButtons = document.querySelectorAll('button[onclick*="negolous.com"]');
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track button clicks for analytics
            console.log('Button clicked:', this.textContent.trim());
        });
    });
    
    // Responsive table handling
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // Copy to clipboard functionality
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Copied to clipboard:', text);
            // Show success message
            showNotification('Copied to clipboard!');
        });
    }
    
    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            const openMenu = document.querySelector('.nav-menu-open');
            if (openMenu) {
                openMenu.classList.remove('nav-menu-open');
                const toggle = document.querySelector('.nav-toggle i');
                if (toggle) toggle.className = 'fas fa-bars';
            }
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Handle scroll events here
            const scrolled = window.pageYOffset;
            const nav = document.querySelector('.main-nav');
            
            if (nav) {
                if (scrolled > 100) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }
            }
        }, 10);
    });
    
    // Add loading states to buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Error handling for external links
    const externalLinks = document.querySelectorAll('a[href*="negolous.com"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            try {
                // Track external link clicks
                console.log('External link clicked:', this.href);
            } catch (error) {
                console.error('Error tracking link click:', error);
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .nav-scrolled {
        background: rgba(17, 17, 17, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .keyboard-navigation button:focus,
    .keyboard-navigation a:focus {
        outline: 2px solid var(--primary-gold) !important;
        outline-offset: 2px !important;
    }
    
    @media (max-width: 968px) {
        .nav-toggle {
            display: block !important;
            background: none;
            border: none;
            color: var(--text-light);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--darker-bg);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu-open {
            transform: translateY(0) !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        
        .nav-menu li {
            margin-bottom: 0.5rem;
        }
        
        .nav-link {
            display: block;
            padding: 1rem;
            text-align: center;
        }
    }
    
    .table-wrapper {
        overflow-x: auto;
        margin: 1rem 0;
    }
    
    @media (max-width: 768px) {
        .table-wrapper {
            font-size: 0.8rem;
        }
    }
`;

document.head.appendChild(style);

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Add meta theme-color for mobile browsers
const themeColorMeta = document.createElement('meta');
themeColorMeta.name = 'theme-color';
themeColorMeta.content = '#FFD700';
document.head.appendChild(themeColorMeta);

// Preload critical resources
function preloadResource(href, as, type = null) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
}

// Preload fonts
preloadResource('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', 'style');

// Add structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "OnlineGamingPlatform",
    "name": "rr555 Casino",
    "description": "Bangladesh's premier online casino with 1,500+ games, instant withdrawals, and exclusive bonuses",
    "url": window.location.origin,
    "logo": window.location.origin + "/logo.png",
    "sameAs": [],
    "offers": {
        "@type": "Offer",
        "description": "250% Welcome Bonus + 100 Free Spins",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "50",
            "priceCurrency": "BDT"
        }
    }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);