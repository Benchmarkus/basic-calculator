// global helpers
let storedNumber = 0.0;
let isFirst = true;
let newNumber = true;
let operatorQue = [];

// calculator display
let screenValue = document.querySelector(".screen");

// button action distribution
const buttonContainer = document.querySelector(".button-container");
buttonContainer.addEventListener("click",(e) => {
    if (!e.target.classList.contains("button")) return;

    switch(e.target.id) {
        case "b-0":
        case "b-1":
        case "b-2":
        case "b-3":
        case "b-4":
        case "b-5":
        case "b-6":
        case "b-7":
        case "b-8":
        case "b-9":
        case "b-dot":
            addNumber(e.target);
            break;
        
        case "b-pi":
            addPi();
            break;
            
        case "b-sum":
        case "b-subtract":
        case "b-multiply":
        case "b-divide":
            operatorHandling(e.target);
            break;
        
        case "b-clr":
            clearAll();
            break;

        case "b-equal":
            equal(e.target);
            break;
    };
});

function addNumber(button) {
    // Append numbers unless the latest input was operator. Then start typing a new number.
    if (newNumber) {
        screenValue.textContent = button.textContent;
        newNumber = false;
    } else {
        screenValue.textContent = screenValue.textContent + button.textContent; 
    }
};

function addPi() {
    let tempElement = document.createElement("div");
    tempElement.textContent = "3.141";
    addNumber(tempElement);
};

function sum(screenValue) {
    storedNumber += parseFloat(screenValue.textContent);
    screenValue.textContent = Math.floor(storedNumber*100000)/100000;
};

function subtract(screenValue) {
    storedNumber -= parseFloat(screenValue.textContent);
    screenValue.textContent = Math.floor(storedNumber*100000)/100000;
};

function multiply(screenValue) {
    storedNumber *= parseFloat(screenValue.textContent);
    screenValue.textContent = Math.floor(storedNumber*100000)/100000;
};

function divide(screenValue) {
    storedNumber /= parseFloat(screenValue.textContent);
    screenValue.textContent = Math.floor(storedNumber*100000)/100000;
};

// reset everything
function clearAll() {
    screenValue.textContent = "";
    storedNumber = 0;
    isFirst = true;
    newNumber = true;
    operatorQue = [];
}

// run operatorHandling once to get the last calculation. Then reset and show the last result.
function equal(button) {
    operatorHandling(button);
    let temp = screenValue.textContent;
    clearAll();
    screenValue.textContent = temp;
}

function operatorHandling(button) {
    // newNumber flag for addNumber()
    newNumber = true;

    operatorQue.push(button.id);

    // the very first number doesn't get operated on anything. Only saved to storedNumber.
    if (isFirst) {
        storedNumber = parseFloat(screenValue.textContent);
        isFirst = false;
        return;
    };

    // safeguard
    if (operatorQue.length === 1) return;

    // get the current operation
    let currentOperation = operatorQue.shift();

    switch (currentOperation) {
        case "b-sum":
            sum(screenValue);
            break;

        case "b-subtract":
            subtract(screenValue);
            break;

        case "b-multiply":
            multiply(screenValue);
            break;

        case "b-divide":
            divide(screenValue);
            break;
    }
}