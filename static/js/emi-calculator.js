// EMI Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const emiForm = document.getElementById('emiForm');
    const emiResult = document.getElementById('emiResult');
    const emiPlaceholder = document.getElementById('emiPlaceholder');
    
    // Get input elements
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTenureInput = document.getElementById('loanTenure');
    const tenureTypeSelect = document.getElementById('tenureType');
    
    // Get result display elements
    const monthlyEmiElement = document.getElementById('monthlyEmi');
    const totalInterestElement = document.getElementById('totalInterest');
    const totalPaymentElement = document.getElementById('totalPayment');
    const principalPercentageElement = document.getElementById('principalPercentage');
    const interestPercentageElement = document.getElementById('interestPercentage');
    const principalTextElement = document.getElementById('principalText');
    const interestTextElement = document.getElementById('interestText');
    
    // Add form submission event listener
    emiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form inputs
        if (!validateEmiInputs()) {
            return;
        }
        
        // Calculate EMI
        calculateEmi();
    });
    
    // Add form reset event listener
    emiForm.addEventListener('reset', function() {
        hideResults();
        
        // Clear validation states
        loanAmountInput.classList.remove('is-invalid');
        interestRateInput.classList.remove('is-invalid');
        loanTenureInput.classList.remove('is-invalid');
    });
    
    // Input validation function
    function validateEmiInputs() {
        let isValid = true;
        
        // Validate loan amount
        if (!loanAmountInput.value || loanAmountInput.value < 1000) {
            loanAmountInput.classList.add('is-invalid');
            isValid = false;
        } else {
            loanAmountInput.classList.remove('is-invalid');
        }
        
        // Validate interest rate
        if (!interestRateInput.value || interestRateInput.value < 0.1 || interestRateInput.value > 50) {
            interestRateInput.classList.add('is-invalid');
            isValid = false;
        } else {
            interestRateInput.classList.remove('is-invalid');
        }
        
        // Validate loan tenure
        if (!loanTenureInput.value || loanTenureInput.value < 1 || 
            (tenureTypeSelect.value === 'months' && loanTenureInput.value > 360) ||
            (tenureTypeSelect.value === 'years' && loanTenureInput.value > 30)) {
            loanTenureInput.classList.add('is-invalid');
            isValid = false;
        } else {
            loanTenureInput.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Function to calculate EMI
    function calculateEmi() {
        // Get input values
        const loanAmount = parseFloat(loanAmountInput.value);
        const interestRate = parseFloat(interestRateInput.value) / 100 / 12; // Monthly interest rate
        
        // Convert tenure to months if in years
        let loanTenure = parseInt(loanTenureInput.value);
        if (tenureTypeSelect.value === 'years') {
            loanTenure = loanTenure * 12;
        }
        
        // Calculate EMI using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
        const emi = (loanAmount * interestRate * Math.pow(1 + interestRate, loanTenure)) / 
                    (Math.pow(1 + interestRate, loanTenure) - 1);
        
        // Calculate total payment and interest
        const totalPayment = emi * loanTenure;
        const totalInterest = totalPayment - loanAmount;
        
        // Calculate principal and interest percentages
        const principalPercentage = (loanAmount / totalPayment) * 100;
        const interestPercentage = (totalInterest / totalPayment) * 100;
        
        // Display results
        monthlyEmiElement.textContent = `₹${emi.toFixed(2)}`;
        totalInterestElement.textContent = `₹${totalInterest.toFixed(2)}`;
        totalPaymentElement.textContent = `₹${totalPayment.toFixed(2)}`;
        
        // Update progress bar
        principalPercentageElement.style.width = `${principalPercentage}%`;
        principalPercentageElement.setAttribute('aria-valuenow', principalPercentage);
        
        interestPercentageElement.style.width = `${interestPercentage}%`;
        interestPercentageElement.setAttribute('aria-valuenow', interestPercentage);
        
        // Update text percentages
        principalTextElement.textContent = `Principal: ${principalPercentage.toFixed(1)}%`;
        interestTextElement.textContent = `Interest: ${interestPercentage.toFixed(1)}%`;
        
        // Show results
        showResults();
    }
    
    // Function to show results
    function showResults() {
        emiResult.classList.remove('d-none');
        emiPlaceholder.classList.add('d-none');
    }
    
    // Function to hide results
    function hideResults() {
        emiResult.classList.add('d-none');
        emiPlaceholder.classList.remove('d-none');
    }
});
