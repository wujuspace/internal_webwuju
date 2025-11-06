// About Hero - Cursor Following 3D Object
document.addEventListener('DOMContentLoaded', function() {
    const hero3dObject = document.getElementById('hero-3d-object');
    const aboutHero = document.querySelector('.about-hero');
    
    if (!hero3dObject || !aboutHero) return;
    
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
    aboutHero.addEventListener('mousemove', (e) => {
        const rect = aboutHero.getBoundingClientRect();
        // Normalize to -1 to 1, with center as 0
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        isMoving = true;
    });
    
    aboutHero.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
        isMoving = false;
    });
    
    // Smooth animation loop
    function animate() {
        // Smooth interpolation towards target
        const lerpFactor = isMoving ? 0.08 : 0.03; // Faster when moving, slower when returning
        currentX = lerp(currentX, mouseX, lerpFactor);
        currentY = lerp(currentY, mouseY, lerpFactor);
        
        // Apply transform with rotation and translation
        const rotateX = currentY * 15; // Max 15 degrees rotation
        const rotateY = currentX * 15;
        const translateX = currentX * 30; // Max 30px translation
        const translateY = currentY * 30;
        
        hero3dObject.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateX(${translateX}px) 
            translateY(${translateY}px)
        `;
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();
});

