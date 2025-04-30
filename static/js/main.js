// Main JavaScript - Initializes all components and handles tab switching

document.addEventListener('DOMContentLoaded', function() {
    // Get all calculator tabs
    const calculatorTabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
    
    // Add event listener for tab switching
    calculatorTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            // Get the newly activated tab
            const activeTab = event.target.getAttribute('id');
            
            // Add analytics tracking (if needed)
            console.log(`Tab switched to: ${activeTab}`);
        });
    });
    
    // Function to format currency numbers with commas
    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Function for input validation
    function validateNumberInput(input, minValue, maxValue) {
        const value = parseFloat(input.value);
        
        if (isNaN(value) || value < minValue || (maxValue !== undefined && value > maxValue)) {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
            return true;
        }
    }
    
    // Export utility functions for use in other scripts
    window.calculatorUtils = {
        formatCurrency,
        validateNumberInput
    };
});
