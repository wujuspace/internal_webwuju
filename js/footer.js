// Newsletter Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!newsletterForm) return;
    
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
});

