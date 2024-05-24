
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
    if(secondNumber === 0){
        return "🤯";
    }
    return firstNumber / secondNumber;
}

let currentNumber = 0;

function populateDisplay(stringValue){
    const input = document.querySelector("input");  
    input.value = stringValue;
    currentNumber = Number(stringValue);
}

function calculator(){

    let firstNumber = null;
    let secondNumber;
    let currentOperator;

    let stringValue = '';
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const clear = document.querySelector("#clear");
    const deleted = document.querySelector("#delete");
    const toMinus = document.querySelector("#plus-minus");

    numbers.forEach((number) => {
        let getNumber = function(e) {
            if (stringValue.length <= 9) {
                stringValue += number.textContent;
                stringValue = stringHandler(stringValue);
                    populateDisplay(stringValue);
            }

        };
        number.addEventListener("click", getNumber);
    });
    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            if(firstNumber === null){
                stringValue = '';
                firstNumber = currentNumber;
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
            }
            else{
                secondNumber = currentNumber;
                firstNumber = operate(firstNumber, secondNumber, currentOperator); 
                console.log((+firstNumber.toFixed(9)) );               
                (typeof firstNumber === "number") ? populateDisplay(+firstNumber.toFixed(9)) : populateDisplay(firstNumber);
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
                secondNumber = null;
                stringValue = '';
            }
        });
    });
    clear.addEventListener("click", ()=>{
        firstNumber = null;
        secondNumber = null;
        stringValue = "";
        populateDisplay("0");
    })
    deleted.addEventListener("click", ()=>{
        stringValue = stringValue.slice(0, -1);

        if(stringValue === "")
            stringValue = "0";
        populateDisplay(stringValue);
    })
    toMinus.addEventListener("click", ()=>{
        console.log(stringValue);
        if(!(stringValue === "0" || stringValue === "")){
            stringValue = "-" + stringValue;
            populateDisplay(stringValue);
        }
    })
}
calculator();

function stringHandler(string){
    if(string === "")
        string = "0";
    if(string[0] === "."){
        string = "0" + string;
    }
    if(string[string.length-1] === '.' && string.substring(0, string.length -1).includes('.'))
        string = string.slice(0, -1);

    // remove multiple leading zeros 
    if(Number(string) === 0 && !string.includes(".")){
        string = '0';
    }
    // remove leading zero
    if(string[0] === "0" && !string.includes(".") && string !== "0"){
        string = string.slice(1);
    }
    return string;
}


// Format big floats and big int