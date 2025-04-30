// Arithmetic Calculator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get calculator elements
    const display = document.getElementById('display');
    const calcButtons = document.querySelectorAll('.calc-btn');
    const equalsBtn = document.getElementById('equalsBtn');
    const clearBtn = document.getElementById('clearBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Calculator state
    let currentInput = '';
    let currentOperation = null;
    let previousInput = null;
    let shouldResetDisplay = false;
    
    // Initialize display
    display.value = '0';
    
    // Add event listeners to number and operation buttons
    calcButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            
            // Check if the button is an operator
            if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else {
                handleNumber(value);
            }
        });
    });
    
    // Add event listener for equals button
    equalsBtn.addEventListener('click', () => {
        calculate();
    });
    
    // Add event listener for calculate button
    calculateBtn.addEventListener('click', () => {
        calculate();
    });
    
    // Add event listener for clear button (backspace)
    clearBtn.addEventListener('click', () => {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                display.value = '0';
            } else {
                display.value = currentInput;
            }
        }
    });
    
    // Add event listener for clear all button
    clearAllBtn.addEventListener('click', () => {
        resetCalculator();
    });
    
    // Add keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        
        // Number keys (0-9) and decimal point
        if (/[0-9.]/.test(key)) {
            handleNumber(key);
        }
        // Operator keys
        else if (['+', '-', '*', '/'].includes(key)) {
            handleOperator(key);
        }
        // Enter key for calculation
        else if (key === 'Enter') {
            calculate();
        }
        // Backspace key for clearing one character
        else if (key === 'Backspace') {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    display.value = '0';
                } else {
                    display.value = currentInput;
                }
            }
        }
        // Escape key for clearing all
        else if (key === 'Escape') {
            resetCalculator();
        }
    });
    
    // Function to handle number input
    function handleNumber(num) {
        // If display should be reset (after an operation)
        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }
        
        // Handle decimal point
        if (num === '.' && currentInput.includes('.')) {
            return; // Prevent multiple decimal points
        }
        
        // Handle leading zero
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
        
        display.value = currentInput;
    }
    
    // Function to handle operator input
    function handleOperator(op) {
        // If there's a current input
        if (currentInput !== '') {
            // If there was a previous calculation, perform it
            if (previousInput !== null && currentOperation !== null) {
                calculate();
            }
            
            previousInput = parseFloat(currentInput);
            currentOperation = op;
            shouldResetDisplay = true;
        }
    }
    
    // Function to perform calculation
    function calculate() {
        // If there's no previous input or operation, nothing to calculate
        if (previousInput === null || currentOperation === null || currentInput === '') {
            return;
        }
        
        const currentValue = parseFloat(currentInput);
        let result;
        
        // Perform calculation based on the operation
        switch (currentOperation) {
            case '+':
                result = previousInput + currentValue;
                break;
            case '-':
                result = previousInput - currentValue;
                break;
            case '*':
                result = previousInput * currentValue;
                break;
            case '/':
                // Check for division by zero
                if (currentValue === 0) {
                    display.value = 'Error: Division by zero';
                    resetCalculatorState();
                    return;
                }
                result = previousInput / currentValue;
                break;
            default:
                return;
        }
        
        // Format the result (handle floating point precision)
        const formattedResult = formatResult(result);
        
        // Update display and reset state
        display.value = formattedResult;
        currentInput = formattedResult.toString();
        previousInput = null;
        currentOperation = null;
    }
    
    // Function to format the result to avoid floating point precision issues
    function formatResult(result) {
        // Convert to string and check if it has a decimal point
        const resultString = result.toString();
        
        if (resultString.includes('.')) {
            // If the decimal part has more than 8 digits, round it
            const [integerPart, decimalPart] = resultString.split('.');
            
            if (decimalPart.length > 8) {
                return parseFloat(result.toFixed(8));
            }
        }
        
        return result;
    }
    
    // Function to reset calculator
    function resetCalculator() {
        resetCalculatorState();
        display.value = '0';
    }
    
    // Function to reset calculator state
    function resetCalculatorState() {
        currentInput = '';
        previousInput = null;
        currentOperation = null;
        shouldResetDisplay = false;
    }
});
