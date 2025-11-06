// Services Page - Filtering and Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterChips.length || !projectCards.length) return;
    
    let activeFilter = null;
    
    // Check for URL parameter to auto-select filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        // Find and activate the matching chip
        const matchingChip = Array.from(filterChips).find(chip => chip.getAttribute('data-filter') === filterParam);
        if (matchingChip) {
            matchingChip.classList.add('active');
            activeFilter = filterParam;
            filterProjects(filterParam);
        }
    }
    
    // Filter chip click handler
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active'));
            
            // If clicking the same chip, deselect it (show all)
            if (activeFilter === filterValue) {
                activeFilter = null;
                showAllProjects();
            } else {
                // Activate clicked chip
                this.classList.add('active');
                activeFilter = filterValue;
                filterProjects(filterValue);
            }
        });
    });
    
    // Filter projects based on selected chip
    function filterProjects(filterValue) {
        projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (cardCategory === filterValue) {
                // Show matching cards with fade in
                setTimeout(() => {
                    card.classList.remove('hidden');
                    // Force reflow
                    void card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, index * 50); // Stagger animation
            } else {
                // Hide non-matching cards with fade out
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300); // Wait for animation to complete
            }
        });
    }
    
    // Show all projects
    function showAllProjects() {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('hidden');
                // Force reflow
                void card.offsetHeight;
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 30); // Stagger animation
        });
    }
    
    // Project card microinteractions
    projectCards.forEach(card => {
        // Hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px)';
            this.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
        
        // Click effect with ripple animation
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(77, 166, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10';
            
            this.appendChild(ripple);
            
            // Click animation
            this.style.transform = 'translateX(8px) scale(0.97)';
            
            setTimeout(() => {
                ripple.remove();
                this.style.transform = '';
                
                // TODO: Add redirect to project page when ready
                // const projectUrl = this.getAttribute('data-url');
                // if (projectUrl) {
                //     window.location.href = projectUrl;
                // }
            }, 300);
        });
        
        // Active state animation
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateX(6px) scale(0.96)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateX(12px) scale(1)';
        });
    });
    
    // Add ripple animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

