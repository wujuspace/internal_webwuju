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
    
    // Function to position image vertically aligned with the project item
    function positionImageWithItem(item) {
        const itemRect = item.getBoundingClientRect();
        const listWrapper = document.querySelector('.project-list-wrapper');
        const listWrapperRect = listWrapper.getBoundingClientRect();
        
        // Calculate the top position relative to the list wrapper
        // Get the scroll position of the window
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate the absolute position of the item
        const itemAbsoluteTop = itemRect.top + scrollTop;
        
        // Calculate the absolute position of the list wrapper
        const listWrapperAbsoluteTop = listWrapperRect.top + scrollTop;
        
        // Calculate relative position within the list wrapper
        const relativeTop = itemAbsoluteTop - listWrapperAbsoluteTop;
        
        // Set the image position to align with the item
        projectImageOverview.style.top = `${relativeTop}px`;
        projectImageOverview.style.transform = 'translateY(0)';
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
            
            // Position image aligned with the item
            positionImageWithItem(item);
            
            // Show image overview
            projectImageOverview.style.display = 'block';
            projectImageOverview.classList.add('show');
        });
        
        item.addEventListener('mouseleave', () => {
            // Hide image overview when leaving item
            projectImageOverview.classList.remove('show');
            projectImage.classList.remove('active');
        });
    });
    
    // Update image position on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const activeItem = document.querySelector('.project-item.active');
            if (activeItem && projectImageOverview.classList.contains('show')) {
                positionImageWithItem(activeItem);
            }
        }, 10);
    });
});

