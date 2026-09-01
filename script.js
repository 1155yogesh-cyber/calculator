let expression = "";

const result = document.getElementById("result");
const history = document.getElementById("history");


// Add number
function addNumber(number) {

    if (result.innerText === "Error") {
        clearDisplay();
    }

    expression += number;

    result.innerText = expression;
}


// Add operator
function addOperator(operator) {

    if (expression === "") {
        return;
    }

    let last = expression.slice(-1);

    // Prevent two operators together
    if ("+-*/%".includes(last)) {
        expression = expression.slice(0, -1);
    }

    expression += operator;

    result.innerText = expression;
}


// Clear calculator
function clearDisplay() {

    expression = "";

    result.innerText = "0";

    history.innerText = "";
}


// Delete last character
function deleteLast() {

    expression = expression.slice(0, -1);

    if (expression === "") {
        result.innerText = "0";
    }
    else {
        result.innerText = expression;
    }
}


// Calculate answer
function calculate() {

    if (expression === "") {
        return;
    }

    try {

        let calculation = expression;

        // Percentage
        calculation = calculation.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        let answer = Function(
            "return " + calculation
        )();

        if (!isFinite(answer)) {
            throw new Error();
        }

        answer = Number(answer.toFixed(10));

        history.innerText = expression + " =";

        result.innerText = answer;

        expression = answer.toString();

    }
    catch {

        result.innerText = "Error";

        expression = "";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    let key = event.key;


    // Numbers
    if (!isNaN(key) || key === ".") {

        addNumber(key);
    }


    // Operators
    else if ("+-*/%".includes(key)) {

        addOperator(key);
    }


    // Enter
    else if (key === "Enter" || key === "=") {

        calculate();
    }


    // Backspace
    else if (key === "Backspace") {

        deleteLast();
    }


    // Escape
    else if (key === "Escape") {

        clearDisplay();
    }

});