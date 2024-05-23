let firstNumber;
let operator;
let secondNumber;

function operate(firstNumber, secondNumber, operator){
    switch(operator){
        case '+':
            add(firstNumber, secondNumber);
            break;
        case '-':
            subtract(firstNumber, secondNumber);
            break;
        case '*':
            multiply(firstNumber, secondNumber);
            break;
        case '/':
            divide(firstNumber, secondNumber);
            break;
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

function populateDisplay(){
    let stringValue = '';
    let userInput = 0;
    const numbers = document.querySelectorAll(".number");
    const input = document.querySelector("input");
    numbers.forEach(number => {
        number.addEventListener("click", () =>{
            stringValue += number.textContent;
            if(stringValue.length <= 8){
                input.value = Number(stringValue);
                userInput = input.value;
            }
        })
    });
    return userInput;
}
populateDisplay();
console.log(userInput);