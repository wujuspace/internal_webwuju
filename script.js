// Smooth scroll and animations
document.addEventListener('DOMContentLoaded', function() {
    // Splash Screen - Cycle through service names (no effects, direct switch)
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');
    
    const services = [
        'Digital Innovation',
        'Interactive Experiences',
        'Creative Solutions'
    ];
    
    let currentIndex = 0;
    let splashTimeout;
    
    // Prevent body scroll while splash screen is active
    document.body.classList.add('splash-active');
    
    // Start with first service
    splashText.textContent = services[0];
    
    // Cycle through services every 2 seconds (no fade effects)
    splashTimeout = setInterval(() => {
        currentIndex++;
        if (currentIndex >= services.length) {
            // All services shown, immediately show main content
            clearInterval(splashTimeout);
            splashScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Remove splash-active class to enable scrolling
            document.body.classList.remove('splash-active');
            
            // Show navigation immediately
            const stickyNav = document.getElementById('sticky-nav');
            stickyNav.classList.add('visible');
        } else {
            splashText.textContent = services[currentIndex];
        }
    }, 2000);

    // Sticky Navigation
    const stickyNav = document.getElementById('sticky-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            stickyNav.classList.add('scrolled');
        } else {
            stickyNav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Gradient Blob Animation (Mouse Movement & Scroll)
    const gradientBlob = document.getElementById('gradient-blob');
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

    // Project Showcase - Hover to reveal image
    const projectItems = document.querySelectorAll('.project-item');
    const projectImage = document.getElementById('project-image');

    // Create placeholder images using gradient backgrounds (can be replaced with actual images)
    const projectImages = {
        'project1.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))',
        'project2.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))',
        'project3.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))',
        'project4.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))',
        'project5.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))',
        'project6.jpg': 'linear-gradient(135deg, rgba(255, 140, 66, 0.4), rgba(255, 71, 87, 0.35))'
    };

    // Show default active project image
    const activeItem = document.querySelector('.project-item.active');
    if (activeItem) {
        const imageSrc = activeItem.getAttribute('data-image');
        const gradient = projectImages[imageSrc] || projectImages['project2.jpg'];
        projectImage.style.background = gradient;
        projectImage.classList.add('active');
    }

    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active from all items
            projectItems.forEach(i => i.classList.remove('active'));
            
            // Add active to hovered item
            item.classList.add('active');
            
            // Update image
            const imageSrc = item.getAttribute('data-image');
            const gradient = projectImages[imageSrc] || projectImages['project2.jpg'];
            
            projectImage.style.background = gradient;
            projectImage.src = ''; // Clear src if using actual images
            projectImage.classList.add('active');
        });
    });

    // Process Accordion
    const processSteps = document.querySelectorAll('.process-step');

    processSteps.forEach(step => {
        const header = step.querySelector('.step-header');
        
        header.addEventListener('click', () => {
            const isActive = step.classList.contains('active');
            
            // Close all steps
            processSteps.forEach(s => s.classList.remove('active'));
            
            // Open clicked step if it wasn't active
            if (!isActive) {
                step.classList.add('active');
            }
        });
    });

    // Client logos cursor tooltip
    const cursorTooltip = document.getElementById('cursor-tooltip');
    const clientLogos = document.querySelectorAll('.client-logo');

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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // Account for sticky nav
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('.email-input');
            const email = emailInput.value;
            
            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', email);
            
            // Show success message (you can customize this)
            alert('Thank you for subscribing!');
            emailInput.value = '';
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card-portfolio');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
});
