// Services Page - Filtering, Sorting, and Project Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const categoryChips = document.querySelectorAll('.filter-chip[data-filter]');
    const sortChips = document.querySelectorAll('.sort-chip[data-sort]');
    const clientChips = document.querySelectorAll('.client-chip[data-client]');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsContainer = document.querySelector('.services-projects');
    
    if (!projectCards.length || !projectsContainer) return;
    
    let activeCategoryFilter = null;
    let activeSort = 'newest'; // Default to newest
    let activeClientFilter = 'all'; // Default to all clients
    
    // Initialize: Set newest as active by default
    const newestChip = document.querySelector('.sort-chip[data-sort="newest"]');
    if (newestChip) {
        newestChip.classList.add('active');
    }
    
    // Set "All Clients" as active by default
    const allClientsChip = document.querySelector('.client-chip[data-client="all"]');
    if (allClientsChip) {
        allClientsChip.classList.add('active');
    }
    
    // Check for URL parameter to auto-select category filter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam) {
        const matchingChip = Array.from(categoryChips).find(chip => chip.getAttribute('data-filter') === filterParam);
        if (matchingChip) {
            matchingChip.classList.add('active');
            activeCategoryFilter = filterParam;
        }
    }
    
    // Category filter chip click handler
    categoryChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all category chips
            categoryChips.forEach(c => c.classList.remove('active'));
            
            // If clicking the same chip, deselect it (show all)
            if (activeCategoryFilter === filterValue) {
                activeCategoryFilter = null;
            } else {
                // Activate clicked chip
                this.classList.add('active');
                activeCategoryFilter = filterValue;
            }
            
            applyFilters();
        });
    });
    
    // Sort chip click handler
    sortChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const sortValue = this.getAttribute('data-sort');
            
            // Remove active class from all sort chips
            sortChips.forEach(c => c.classList.remove('active'));
            
            // Activate clicked chip
            this.classList.add('active');
            activeSort = sortValue;
            
            applyFilters();
        });
    });
    
    // Client filter chip click handler
    clientChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const clientValue = this.getAttribute('data-client');
            
            // Remove active class from all client chips
            clientChips.forEach(c => c.classList.remove('active'));
            
            // Activate clicked chip
            this.classList.add('active');
            activeClientFilter = clientValue;
            
            applyFilters();
        });
    });
    
    // Main function to apply all filters and sorting
    function applyFilters() {
        const visibleCards = [];
        
        // First, filter by category and client
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardClient = card.getAttribute('data-client');
            
            let matchesCategory = !activeCategoryFilter || cardCategory === activeCategoryFilter;
            let matchesClient = activeClientFilter === 'all' || cardClient === activeClientFilter;
            
            if (matchesCategory && matchesClient) {
                visibleCards.push(card);
            } else {
                // Hide non-matching cards with fade out
                card.style.opacity = '0';
                card.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Sort visible cards
        visibleCards.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            
            if (activeSort === 'newest') {
                return dateB - dateA; // Newest first
            } else {
                return dateA - dateB; // Oldest first
            }
        });
        
        // Reorder cards in DOM and show them
        visibleCards.forEach((card, index) => {
            // Remove from current position
            card.remove();
            
            // Insert at new position
            if (index === 0) {
                projectsContainer.insertBefore(card, projectsContainer.firstChild);
            } else {
                projectsContainer.insertBefore(card, visibleCards[index - 1].nextSibling);
            }
            
            // Show with animation
            setTimeout(() => {
                card.classList.remove('hidden');
                // Force reflow
                void card.offsetHeight;
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 50); // Stagger animation
        });
    }
    
    // Project card microinteractions
    projectCards.forEach(card => {
        // Hover effect enhancement
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateX(12px)';
                this.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.12)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
        
        // Click effect with ripple animation
        card.addEventListener('click', function(e) {
            if (this.classList.contains('hidden')) return;
            
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
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateX(6px) scale(0.96)';
            }
        });
        
        card.addEventListener('mouseup', function() {
            if (!this.classList.contains('hidden')) {
                this.style.transform = 'translateX(12px) scale(1)';
            }
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
