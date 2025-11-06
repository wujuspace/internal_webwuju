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
    
    // Image is now positioned on the right side (sticky), no need for positioning function
    // Just show/hide it on hover
    
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
            
            // Show image overview (it's sticky positioned on the right)
            projectImageOverview.style.display = 'block';
            projectImageOverview.classList.add('show');
        });
        
        item.addEventListener('mouseleave', () => {
            // Hide image overview when leaving item
            projectImageOverview.classList.remove('show');
            projectImage.classList.remove('active');
        });
    });
    
    // No need for scroll position update since image is sticky positioned
});

