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

    // Nav cursor-following gradient animation
    const navGradientBlobs = document.querySelectorAll('.nav-gradient-blob');
    
    if (stickyNav && navGradientBlobs.length > 0) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isMoving = false;
        
        // Lerp function for smooth interpolation
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }
        
        // Get mouse position relative to nav
        stickyNav.addEventListener('mousemove', (e) => {
            const rect = stickyNav.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Normalize to -1 to 1
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // Normalize to -1 to 1
            isMoving = true;
        });
        
        stickyNav.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
            isMoving = false;
        });
        
        // Smooth animation loop
        function animate() {
            // Smooth interpolation towards target (slower than hero for subtlety)
            const lerpFactor = isMoving ? 0.03 : 0.01;
            currentX = lerp(currentX, mouseX, lerpFactor);
            currentY = lerp(currentY, mouseY, lerpFactor);
            
            // Apply parallax effect with different intensities (smaller than hero)
            navGradientBlobs.forEach((blob, index) => {
                const intensity = [0.8, 0.6, 1.0][index]; // Smaller parallax for subtlety
                const offsetX = currentX * 80 * intensity; // Smaller offset
                const offsetY = currentY * 80 * intensity;
                
                // Apply cursor offset to blob
                const currentTransform = blob.style.transform || '';
                const baseTransform = index === 2 ? 'translateX(-50%)' : ''; // blob-3 has translateX(-50%)
                
                if (baseTransform) {
                    blob.style.transform = `${baseTransform} translate(${offsetX}px, ${offsetY}px)`;
                } else {
                    blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation loop
        animate();
    }
});

