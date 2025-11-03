// Sticky Navigation
document.addEventListener('DOMContentLoaded', function() {
    const stickyNav = document.getElementById('sticky-nav');
    
    if (!stickyNav) return;
    
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            stickyNav.classList.add('scrolled');
        } else {
            stickyNav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

