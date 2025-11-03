// Hero section interactions
document.addEventListener('DOMContentLoaded', function() {
    const heroCtaButton = document.querySelector('.hero-cta-button');
    
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function() {
            // Scroll to contact section or trigger chat action
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Cursor-following gradient animation
    const heroSection = document.querySelector('.hero-section-blue');
    const gradientContainer = document.querySelector('.background-gradient-animation');
    
    if (heroSection && gradientContainer) {
        // Wrap each blob in a container to separate animation from cursor transform
        const gradientBlobs = document.querySelectorAll('.gradient-blob');
        const blobWrappers = [];
        
        gradientBlobs.forEach((blob, index) => {
            // Create wrapper for each blob (only if not already wrapped)
            if (!blob.parentElement.classList.contains('gradient-blob-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = `gradient-blob-wrapper gradient-blob-wrapper-${index + 1}`;
                
                // Insert wrapper before blob
                blob.parentNode.insertBefore(wrapper, blob);
                // Move blob into wrapper
                wrapper.appendChild(blob);
                
                blobWrappers.push(wrapper);
            } else {
                blobWrappers.push(blob.parentElement);
            }
        });
        
        // Re-select blobs after wrapping
        const wrappedBlobs = document.querySelectorAll('.gradient-blob');
        
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let isMoving = false;
        
        // Lerp function for smooth interpolation
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }
        
        // Get mouse position relative to hero section
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Normalize to -1 to 1
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // Normalize to -1 to 1
            isMoving = true;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
            isMoving = false;
        });
        
        // Smooth animation loop
        function animate() {
            // Smooth interpolation towards target
            const lerpFactor = isMoving ? 0.05 : 0.02; // Faster when moving, slower when returning
            currentX = lerp(currentX, mouseX, lerpFactor);
            currentY = lerp(currentY, mouseY, lerpFactor);
            
            // Apply parallax effect with different intensities for each blob
            wrappedBlobs.forEach((blob, index) => {
                const intensity = [1.5, 1.2, 1.8, 1.3, 1.0][index]; // Different parallax strengths
                const offsetX = currentX * 150 * intensity;
                const offsetY = currentY * 150 * intensity;
                
                // Apply cursor offset to blob (inside wrapper that has animation)
                // Wrapper-5 already handles centering with translate(-50%, -50%)
                blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start animation loop
        animate();
    }
});

