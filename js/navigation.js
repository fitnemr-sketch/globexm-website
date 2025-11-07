/**
 * Globe XM - Navigation Module
 * Handle mobile menu, sticky header, and active states
 */

(function() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // Mobile menu toggle
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.navbar-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Sticky header on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, 100));
    
    // Highlight active page in navigation
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNav();
})();

// Throttle utility (copied from main.js for standalone use)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
