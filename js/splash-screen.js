// Splash Screen - Cycle through service names
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');
    
    if (!splashScreen || !splashText || !mainContent) return;
    
    const services = [
        'Digital Innovation',
        'Interactive Experiences',
        'Creative Solutions'
    ];
    
    let currentIndex = 0;
    let splashTimeout;
    
    // Prevent body scroll while splash screen is active
    document.body.classList.add('splash-active');
    
    // Start with first service
    splashText.textContent = services[0];
    
    // Cycle through services every 2 seconds (no fade effects)
    splashTimeout = setInterval(() => {
        currentIndex++;
        if (currentIndex >= services.length) {
            // All services shown, immediately show main content
            clearInterval(splashTimeout);
            splashScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Remove splash-active class to enable scrolling
            document.body.classList.remove('splash-active');
            
            // Show navigation immediately
            const stickyNav = document.getElementById('sticky-nav');
            if (stickyNav) {
                stickyNav.classList.add('visible');
            }
        } else {
            splashText.textContent = services[currentIndex];
        }
    }, 2000);
});

