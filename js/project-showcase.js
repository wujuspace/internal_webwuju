// Project Showcase - Hover to reveal image
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    const projectImage = document.getElementById('project-image');
    
    if (!projectItems.length || !projectImage) return;

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

    const projectImagePlaceholder = document.querySelector('.project-image-placeholder');
    
    // Don't show default image - only show on hover
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active from all items
            projectItems.forEach(i => i.classList.remove('active'));
            
            // Add active to hovered item
            item.classList.add('active');
            
            // Show image placeholder
            if (projectImagePlaceholder) {
                projectImagePlaceholder.classList.add('show');
            }
            
            // Update image
            const imageSrc = item.getAttribute('data-image');
            const gradient = projectImages[imageSrc] || projectImages['project2.jpg'];
            
            projectImage.style.background = gradient;
            projectImage.src = ''; // Clear src if using actual images
            projectImage.classList.add('active');
        });
        
        item.addEventListener('mouseleave', () => {
            // Hide image when leaving item
            if (projectImagePlaceholder) {
                projectImagePlaceholder.classList.remove('show');
            }
            projectImage.classList.remove('active');
        });
    });
});

