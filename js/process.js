// Process Accordion
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    if (!processSteps.length) return;

    processSteps.forEach(step => {
        const header = step.querySelector('.step-header');
        
        if (!header) return;
        
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
});

