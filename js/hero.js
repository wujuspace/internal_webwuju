// Gradient Blob Animation (Mouse Movement & Scroll)
document.addEventListener('DOMContentLoaded', function() {
    const gradientBlob = document.getElementById('gradient-blob');
    
    if (!gradientBlob) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let blobX = 0;
    let blobY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 200;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 200;
    });

    function animateBlob() {
        const scrollY = window.pageYOffset;
        const scrollEffect = scrollY * 0.1;
        
        blobX += (mouseX - blobX) * 0.05;
        blobY += (mouseY - blobY) * 0.05;
        
        const blurAmount = 60 + scrollY * 0.02;
        gradientBlob.style.filter = `blur(${Math.min(blurAmount, 120)}px)`;
        gradientBlob.style.transform = `translate(${blobX + scrollEffect * 0.3}px, ${blobY + scrollY * 0.1}px) scale(${1 + scrollY * 0.0001})`;
        
        requestAnimationFrame(animateBlob);
    }
    
    animateBlob();
});

