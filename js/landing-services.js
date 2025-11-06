// Landing Page - Our Services Cards Redirect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.our-services-card');
    
    if (!serviceCards.length) return;
    
    // Service mapping to filter values (matching services.html filter chips)
    const serviceMapping = {
        'game': 'soccer',           // Map to available filter
        'ar': 'badminton',          // Map to available filter
        'vr': 'boxing',             // Map to available filter
        'digitaltwin': 'formula1', // Map to available filter
        'webdev': 'cricket'        // Map to available filter
    };
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const filterValue = serviceMapping[service] || service;
            
            // Redirect to services page with filter parameter
            window.location.href = `services.html?filter=${filterValue}`;
        });
    });
});

