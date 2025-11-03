// Project Showcase - Hover to reveal image overlay
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    const projectImage = document.getElementById('project-image');
    const projectImageOverview = document.getElementById('project-image-overview');
    
    if (!projectItems.length || !projectImage || !projectImageOverview) return;

    // Create placeholder images using gradient backgrounds (can be replaced with actual images)
    const projectImages = {
        'project1.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project2.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project3.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project4.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project5.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project6.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project7.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project8.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project9.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project10.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project11.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project12.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project13.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project14.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))',
        'project15.jpg': 'linear-gradient(135deg, rgba(77, 166, 255, 0.4), rgba(0, 102, 204, 0.35))'
    };
    
    // Function to position image overview above the hovered item
    function positionImageOverview(item) {
        const rect = item.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Use fixed dimensions from CSS (300x200 desktop, responsive sizes handled in CSS)
        const imageWidth = window.innerWidth > 1024 ? 300 : (window.innerWidth > 768 ? 250 : 200);
        const imageHeight = window.innerWidth > 1024 ? 200 : (window.innerWidth > 768 ? 160 : 140);
        
        // Position thumbnail above the item
        let top = rect.top + scrollY - imageHeight - 20; // 20px gap above item
        let left = rect.left + (rect.width / 2) - (imageWidth / 2); // Center horizontally
        
        // Ensure thumbnail stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 20;
        
        // Constrain horizontal position
        if (left < padding) {
            left = padding;
        } else if (left + imageWidth > viewportWidth - padding) {
            left = viewportWidth - imageWidth - padding;
        }
        
        // Constrain vertical position - don't go above viewport top
        if (top < scrollY + padding) {
            top = scrollY + padding;
        }
        // If thumbnail would go below viewport, position it below the item instead
        if (top + imageHeight > scrollY + viewportHeight - padding) {
            top = rect.bottom + scrollY + 20; // Position below item with 20px gap
        }
        
        projectImageOverview.style.top = `${top}px`;
        projectImageOverview.style.left = `${left}px`;
    }
    
    // Show image on hover
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active from all items
            projectItems.forEach(i => i.classList.remove('active'));
            
            // Add active to hovered item
            item.classList.add('active');
            
            // Update image
            const imageSrc = item.getAttribute('data-image');
            const gradient = projectImages[imageSrc] || projectImages['project2.jpg'];
            
            // Set background image
            projectImage.style.background = gradient;
            projectImage.style.backgroundSize = 'cover';
            projectImage.style.backgroundPosition = 'center';
            projectImage.style.backgroundRepeat = 'no-repeat';
            projectImage.src = ''; // Clear src if using actual images
            projectImage.classList.add('active');
            
            // Position image overview first (before showing)
            positionImageOverview(item);
            
            // Force reflow to ensure position is set
            void projectImageOverview.offsetHeight;
            
            // Then show it
            projectImageOverview.style.display = 'block';
            projectImageOverview.classList.add('show');
        });
        
        item.addEventListener('mouseleave', () => {
            // Hide image overview when leaving item
            projectImageOverview.classList.remove('show');
            projectImage.classList.remove('active');
        });
    });
    
    // Update position on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (projectImageOverview.classList.contains('show')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const activeItem = document.querySelector('.project-item.active');
                if (activeItem) {
                    positionImageOverview(activeItem);
                }
            }, 10);
        }
    });
});

