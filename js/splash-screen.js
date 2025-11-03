// Splash Screen - Simple fade animation
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');
    
    if (!splashScreen || !splashText || !mainContent) return;
    
    // Prevent body scroll while splash screen is active
    document.body.classList.add('splash-active');
    
    // Wait for text animation to complete (0.8s) + display time (1s)
    setTimeout(() => {
        // Start fade out animation - reverse of fade in
        splashText.classList.add('fade-out');
        splashScreen.classList.add('hidden');
        
        // Show main content after fade out completes (0.8s)
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            
            // Remove splash-active class to enable scrolling
            document.body.classList.remove('splash-active');
            
            // Show navigation
            const stickyNav = document.getElementById('sticky-nav');
            if (stickyNav) {
                stickyNav.classList.add('visible');
            }
        }, 800);
    }, 1800);
});

