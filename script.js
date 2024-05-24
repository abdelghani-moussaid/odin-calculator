
function operate(firstNumber, secondNumber, operator){
    switch(operator){
        case 'add':
            return add(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
        default:
            alert("Wrong operator");
            break;
    }
}

function add(firstNumber, secondNumber){
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber){
    return firstNumber / secondNumber;
}

function getNumber() {
}



let currentNumber;
function populateDisplay(number){
    const input = document.querySelector("input");
    input.value = number;
    currentNumber = number;
}

function calculator(){

    let firstNumber;
    let secondNumber;
    let currentOperator;

    let stringValue = '';
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const clear = document.querySelector("#clear");

    numbers.forEach((number) => {
        let getNumber = function(e) {
            stringValue += number.textContent;
            if (stringValue.length <= 8) {
                populateDisplay(Number(stringValue));
            }

        };
        number.addEventListener("click", getNumber);
    });
    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            if(!firstNumber){
                stringValue = '';
                firstNumber = currentNumber;
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
                console.log("first " + firstNumber + " Curr " + currentOperator );
            }
            else{
                secondNumber = currentNumber;
                firstNumber = operate(firstNumber, secondNumber, currentOperator);
                populateDisplay(firstNumber);
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
                secondNumber = null;
                stringValue = '';
                console.log(` f : ${firstNumber}, ${secondNumber}, ${currentOperator}`);
            }
        });
    });
    clear.addEventListener("click", ()=>{
        firstNumber = null;
        secondNumber = null;
        populateDisplay(0);
    })
}
calculator();
