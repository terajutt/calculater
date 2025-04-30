// GST Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const gstForm = document.getElementById('gstForm');
    const gstResult = document.getElementById('gstResult');
    const gstPlaceholder = document.getElementById('gstPlaceholder');
    
    // Get input elements
    const amountInput = document.getElementById('amount');
    const gstRateSelect = document.getElementById('gstRate');
    const addGstRadio = document.getElementById('addGst');
    const removeGstRadio = document.getElementById('removeGst');
    
    // Get result display elements
    const baseAmountElement = document.getElementById('baseAmount');
    const cgstAmountElement = document.getElementById('cgstAmount');
    const sgstAmountElement = document.getElementById('sgstAmount');
    const totalGstElement = document.getElementById('totalGst');
    const finalAmountElement = document.getElementById('finalAmount');
    const baseAmountLabelElement = document.getElementById('baseAmountLabel');
    const finalAmountLabelElement = document.getElementById('finalAmountLabel');
    const basePercentageElement = document.getElementById('basePercentage');
    const gstPercentageElement = document.getElementById('gstPercentage');
    
    // Add form submission event listener
    gstForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form inputs
        if (!validateGstInputs()) {
            return;
        }
        
        // Calculate GST
        calculateGst();
    });
    
    // Add form reset event listener
    gstForm.addEventListener('reset', function() {
        hideResults();
        
        // Clear validation states
        amountInput.classList.remove('is-invalid');
        gstRateSelect.classList.remove('is-invalid');
    });
    
    // Add calculation type change event listener
    addGstRadio.addEventListener('change', updateLabels);
    removeGstRadio.addEventListener('change', updateLabels);
    
    // Function to update labels based on calculation type
    function updateLabels() {
        if (addGstRadio.checked) {
            baseAmountLabelElement.textContent = 'Base Amount (without GST)';
            finalAmountLabelElement.textContent = 'Final Amount (Including GST)';
        } else {
            baseAmountLabelElement.textContent = 'Base Amount (after removing GST)';
            finalAmountLabelElement.textContent = 'Original Amount (Including GST)';
        }
    }
    
    // Input validation function
    function validateGstInputs() {
        let isValid = true;
        
        // Validate amount
        if (!amountInput.value || amountInput.value < 0) {
            amountInput.classList.add('is-invalid');
            isValid = false;
        } else {
            amountInput.classList.remove('is-invalid');
        }
        
        // Validate GST rate
        if (!gstRateSelect.value) {
            gstRateSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            gstRateSelect.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    // Function to calculate GST
    function calculateGst() {
        // Get input values
        const amount = parseFloat(amountInput.value);
        const gstRate = parseFloat(gstRateSelect.value) / 100;
        const isAddGst = addGstRadio.checked;
        
        let baseAmount, finalAmount, totalGst, cgst, sgst;
        
        // Calculate GST based on calculation type
        if (isAddGst) {
            // Add GST to amount
            baseAmount = amount;
            totalGst = baseAmount * gstRate;
            finalAmount = baseAmount + totalGst;
        } else {
            // Remove GST from amount (amount is inclusive of GST)
            finalAmount = amount;
            baseAmount = finalAmount / (1 + gstRate);
            totalGst = finalAmount - baseAmount;
        }
        
        // Calculate CGST and SGST (both are half of the total GST)
        cgst = totalGst / 2;
        sgst = totalGst / 2;
        
        // Calculate percentages for progress bar
        const basePercentage = (baseAmount / finalAmount) * 100;
        const gstPercentage = (totalGst / finalAmount) * 100;
        
        // Display results
        baseAmountElement.textContent = `₹${baseAmount.toFixed(2)}`;
        cgstAmountElement.textContent = `₹${cgst.toFixed(2)}`;
        sgstAmountElement.textContent = `₹${sgst.toFixed(2)}`;
        totalGstElement.textContent = `₹${totalGst.toFixed(2)}`;
        finalAmountElement.textContent = `₹${finalAmount.toFixed(2)}`;
        
        // Update progress bar
        basePercentageElement.style.width = `${basePercentage}%`;
        basePercentageElement.setAttribute('aria-valuenow', basePercentage);
        
        gstPercentageElement.style.width = `${gstPercentage}%`;
        gstPercentageElement.setAttribute('aria-valuenow', gstPercentage);
        
        // Show results
        showResults();
    }
    
    // Function to show results
    function showResults() {
        gstResult.classList.remove('d-none');
        gstPlaceholder.classList.add('d-none');
    }
    
    // Function to hide results
    function hideResults() {
        gstResult.classList.add('d-none');
        gstPlaceholder.classList.remove('d-none');
    }
    
    // Initialize labels
    updateLabels();
});
