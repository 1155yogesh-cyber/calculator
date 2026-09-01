

let expression = "";

const result = document.getElementById("result");
const history = document.getElementById("history");


// ============================================
// ADD NUMBER
// ============================================

function addNumber(number) {

    // Start fresh after Error
    if (result.textContent === "Error") {
        clearDisplay();
    }

    // Prevent multiple decimal points
    if (number === ".") {

        const parts = expression.split(/[+\-*/%]/);
        const currentNumber = parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }

        // Convert .5 to 0.5
        if (currentNumber === "") {
            expression += "0";
        }
    }

    expression += number;

    result.textContent = expression;
}


// ============================================
// ADD OPERATOR
// ============================================

function addOperator(operator) {

    if (expression === "") {
        return;
    }

    const last = expression.slice(-1);

    // Replace previous operator
    if ("+-*/%".includes(last)) {
        expression = expression.slice(0, -1);
    }

    expression += operator;

    result.textContent = expression;
}


// ============================================
// CLEAR
// ============================================

function clearDisplay() {

    expression = "";

    result.textContent = "0";

    history.textContent = "";
}


// ============================================
// DELETE
// ============================================

function deleteLast() {

    if (expression === "") {
        return;
    }

    expression = expression.slice(0, -1);

    if (expression === "") {
        result.textContent = "0";
    } else {
        result.textContent = expression;
    }
}


// ============================================
// CALCULATE
// ============================================

function calculate() {

    if (expression === "") {
        return;
    }

    const last = expression.slice(-1);

    // Don't calculate incomplete expression
    if ("+-*/%".includes(last)) {
        return;
    }

    try {

        let calculation = expression;

        // Convert percentage
        calculation = calculation.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        // Calculate
        let answer = Function(
            "return " + calculation
        )();

        // Check invalid result
        if (!Number.isFinite(answer)) {
            throw new Error("Invalid calculation");
        }

        // Round decimal
        answer = Number(answer.toFixed(10));

        // Show history
        history.textContent = expression + " =";

        // Show result
        result.textContent = answer;

        // Save result
        expression = answer.toString();

    } catch (error) {

        result.textContent = "Error";

        expression = "";
    }
}


// ============================================
// KEYBOARD SUPPORT
// ============================================

document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        addNumber(key);
    }

    // Decimal
    else if (key === ".") {
        addNumber(".");
    }

    // Operators
    else if ("+-*/%".includes(key)) {
        addOperator(key);
    }

    // Enter
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Equal
    else if (key === "=") {
        event.preventDefault();
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearDisplay();
    }

    // Delete
    else if (key === "Delete") {
        clearDisplay();
    }
});


// ============================================
// MAKE FUNCTIONS AVAILABLE TO HTML onclick
// ============================================

window.addNumber = addNumber;
window.addOperator = addOperator;
window.clearDisplay = clearDisplay;
window.deleteLast = deleteLast;
window.calculate = calculate;

