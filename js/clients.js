// Client logos cursor tooltip
document.addEventListener('DOMContentLoaded', function() {
    const cursorTooltip = document.getElementById('cursor-tooltip');
    const clientLogos = document.querySelectorAll('.client-logo');
    
    if (!cursorTooltip || !clientLogos.length) return;

    clientLogos.forEach(logo => {
        const img = logo.querySelector('.client-logo-img');
        const companyName = img ? img.getAttribute('alt') : '';

        logo.addEventListener('mouseenter', () => {
            if (companyName) {
                cursorTooltip.textContent = companyName;
                cursorTooltip.classList.add('active');
            }
        });

        logo.addEventListener('mousemove', (e) => {
            if (companyName) {
                cursorTooltip.style.left = e.clientX + 'px';
                cursorTooltip.style.top = e.clientY + 'px';
            }
        });

        logo.addEventListener('mouseleave', () => {
            cursorTooltip.classList.remove('active');
        });
    });
});

