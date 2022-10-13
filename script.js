let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let displayValue = "0";
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {button.addEventListener('click', function() {
    if (button.classList.contains("digit")) {
        inputDigit(this.value);
        populateDisplay();
    } else if (button.classList.contains("operator")) {
        inputOperator(this.value);
        populateDisplay();
    } else if (button.classList.contains("clear")) {
        clearDisplay();
        populateDisplay();
    } else if (button.classList.contains("negative")) {
        changeSign(displayValue);
        populateDisplay();
    } else if (button.classList.contains("equals")) {
        inputEquals();
        populateDisplay();
    } else if (button.classList.contains("backspace")) {
        inputBackspace();
        populateDisplay();
    } else if (button.classList.contains("decimal")) {
        inputDecimal(this.value);
        populateDisplay();
    }})});

function populateDisplay() {
    const display = document.querySelector("#display");
    display.textContent = displayValue;
    if (displayValue.length > 10) {
        display.textContent = displayValue.substring(0, 11);
    }
}

populateDisplay();

function operate(num1, num2, symbol) {
    if (symbol === "+") {
        return num1 + num2;
    } else if (symbol === "-") {
        return num1 - num2;
    } else if (symbol === "*") {
        return num1 * num2;
    } else if (symbol === "/") {
        if (num2 === 0) {
            return "divisionBy0";
        }
        else {
            return num1 / num2;
        }
    }
}

function inputDigit(digit) {
    if (displayValue.length > 10) {
        displayValue = displayValue;
    } else {
    if (firstOperator === null) {
        if (displayValue === "0" || displayValue === 0) {
        displayValue = digit;
        } else if (displayValue === firstOperand) {
        displayValue = digit;
        } else {
        displayValue += digit;
        }
    } else {
        if (displayValue === firstOperand) {
        displayValue = digit;
        } else {
        displayValue += digit;
        }
    }
}
}

function inputOperator(operator) {
    if (firstOperator === null && secondOperator === null) {
        firstOperand = displayValue;
        firstOperator = operator;
    } else if (firstOperator !== null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        console.log(typeof secondOperand);
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = round(result, 11).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = round(result, 11).toString();
        firstOperand = displayValue;
        result = null;
    }
}

function inputEquals() {
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator !== null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if (result === "divisionBy0") {
            displayValue = "NOPE";
        } else {
            displayValue = round(result, 11).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if (result === "divisionBy0") {
            displayValue = "NOPE";
        } else {
            displayValue = round(result, 11).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputBackspace() {
    displayValue = displayValue.slice(0, -1);
}

function clearDisplay() {
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
    displayValue = "0";
}

function changeSign(num) {
    displayValue = Number(num) * (-1);
}

function inputDecimal(point) {
    if (displayValue.includes(".")) {
        displayValue = displayValue;
    } else {
        displayValue += point;
    }
}

function round(num, symbols) {
    return parseFloat(Math.round(num + 'e' + symbols) + 'e-' + symbols);
}