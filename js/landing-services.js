// Landing Page - Service Category Cards Redirect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-category-card');
    
    if (!serviceCards.length) return;
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            
            // Redirect to services page with filter parameter (service name matches filter name)
            window.location.href = `services.html?filter=${service}`;
        });
    });
});

