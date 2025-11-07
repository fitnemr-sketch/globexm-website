/**
 * Globe XM - Animations Module
 * Handle scroll reveals and animation triggers
 */

(function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Number counter animation for stats
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = element.textContent.replace(/[0-9]+/, Math.floor(current));
        }, 16);
    }
    
    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => statObserver.observe(stat));
    
    // Enhanced World Map Card Interactions
    const initWorldMapCards = () => {
        const worldMapCards = document.querySelectorAll('.world-region-card');
        
        worldMapCards.forEach((card, index) => {
            // Optional: Click to lock flip state
            let isFlipped = false;
            card.addEventListener('click', (e) => {
                e.preventDefault();
                isFlipped = !isFlipped;
                
                if (isFlipped) {
                    card.classList.add('flipped-lock');
                } else {
                    card.classList.remove('flipped-lock');
                }
            });
        });
    };
    
    // Stacked Cards Scroll Animation
    const initStackedCards = () => {
        const container = document.getElementById('stackedCardsContainer');
        if (!container) return;
        
        // Only apply animation on desktop
        if (window.innerWidth < 768) return;
        
        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate scroll progress
            // When section enters viewport (top is at bottom of screen)
            // to when section is in middle of viewport
            const scrollStart = windowHeight;
            const scrollEnd = windowHeight / 2;
            
            const scrollProgress = Math.max(0, Math.min(1, 
                (scrollStart - rect.top) / (scrollStart - scrollEnd)
            ));
            
            // Apply expanded class based on scroll progress
            if (scrollProgress > 0.8) {
                container.classList.add('expanded');
            } else {
                container.classList.remove('expanded');
            }
        };
        
        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial check
        handleScroll();
        
        // Re-initialize on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth < 768) {
                    container.classList.add('expanded');
                } else {
                    handleScroll();
                }
            }, 250);
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initWorldMapCards();
            initStackedCards();
        });
    } else {
        initWorldMapCards();
        initStackedCards();
    }
})();
