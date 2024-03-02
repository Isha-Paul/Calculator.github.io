let currentOperand = '';
let previousOperand = '';
let operation = null;

let history = [];
let historyIndex = -1; // Starts at -1 because no action has been taken yet


function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}


/*function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch(operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    //updateDisplay();

    if (previousOperand !== '' && currentOperand !== '') {
        history.push({previousOperand, currentOperand, operation, result: computation.toString()});
        historyIndex++;
        // Clear future history if new action is taken
        history = history.slice(0, historyIndex + 1);
    }
    // Existing logic to update operands and display
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}*/

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch(operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
        case '%':
            computation = prev % current; // Modulo operation
            break;
        case '^': 
            computation = Math.pow(prev, current); // Power operation
            break;
        default: return;
    }
    // Capture history before clearing operands
    if (previousOperand !== '' && operation != null) {
        history.push({ previousOperand, operation, currentOperand, result: computation.toString() });
        historyIndex++;
        history = history.slice(0, historyIndex + 1);
    }
    // Update operands and display
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}


function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

/*function updateDisplay() {
    document.getElementById('result').innerText = currentOperand;
}*/

function updateDisplay() {
    // Check if an operation is selected to display both operands and the operation
    if(operation != null){
        document.getElementById('result').innerText = `${previousOperand} ${operation} ${currentOperand}`;
    } else {
        // If no operation is selected, just display the current operand
        document.getElementById('result').innerText = currentOperand;
    }
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        const state = history[historyIndex];
        currentOperand = state.result;
        previousOperand = state.previousOperand;
        operation = state.operation;
        updateDisplay();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        const state = history[historyIndex];
        currentOperand = state.result;
        previousOperand = state.previousOperand;
        operation = state.operation;
        updateDisplay();
    }
}



// Initial display
updateDisplay();
