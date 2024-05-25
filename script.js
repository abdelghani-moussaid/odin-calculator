
function operate(firstNumber, secondNumber, operator){
    switch(operator){
        case 'add':
            return firstNumber + secondNumber;
        case 'subtract':
            return firstNumber - secondNumber;
        case 'multiply':
            return firstNumber * secondNumber;
        case 'divide':
            if(secondNumber === 0){
                return "🤯";
            }
            return firstNumber / secondNumber;
        default:
            alert("Wrong operator");
            break;
    }
}

// stringValue is the input of the user and gets updated with the latest result of the operations, it's type is string to handle 
// currentNumber is stringValue converted to number to calculate  
let currentNumber = 0;

function populateDisplay(stringValue){
    const input = document.querySelector("input");  
    stringValue = handleString(stringValue)
    input.value = stringValue;
    currentNumber = Number(stringValue);
}

function calculate(){

    let firstNumber = null;
    let secondNumber;
    let currentOperator;
    let stringValue = ''; // display value

    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const clear = document.querySelector("#clear");
    const deleted = document.querySelector("#delete");
    const toMinus = document.querySelector("#plus-minus");

    // with each number or dot clicked concatenate char input and send to display (I included the dot in numbers DOM)
    numbers.forEach((number) => {
        let getNumber = function(e) {
            if (stringValue.length <= 9) {
                stringValue += number.textContent;
                stringValue = handleString(stringValue);
                populateDisplay(stringValue);
            }

        };
        number.addEventListener("click", getNumber);
    });

    // if: user clicks an operator (+,-,*,/) and the first number is empty
    // then: first number takes current input and the display is emptied

    // else: user clicks operator and the first number is already set
    // then: the second number takes the current input, 
    //       calculate the result of operate the two numbers
    //       display result   
    //       the first number takes in the result
    //       the second number is emptied
    //       the display value is emptied
    
    // if: equals is clicked; the first number is emptied 

    operators.forEach((operator) => {
        operator.addEventListener("click", () => {
            if(firstNumber === null){
                firstNumber = currentNumber;
                stringValue = '';
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
            }
            else{
                secondNumber = currentNumber;
                firstNumber = operate(firstNumber, secondNumber, currentOperator); 
                populateDisplay(firstNumber.toString());
                operator.id === 'equals' ? firstNumber = null: currentOperator = operator.id;
                secondNumber = null;
                stringValue = '';
            }
        });
    });

    // when clear all button is clicked
    // remove empty everything
    clear.addEventListener("click", ()=>{
        firstNumber = null;
        secondNumber = null;
        stringValue = "";
        populateDisplay(stringValue);
    })

    // when backstroke button is clicked
    // remove last value
    deleted.addEventListener("click", ()=>{
        stringValue = stringValue.slice(0, -1);
        populateDisplay(stringValue);
    })
    toMinus.addEventListener("click", ()=>{
        // after plus-minus button clicks
        // make positive numbers other than zero negative 
        if(+stringValue !== 0 && stringValue !== "" && stringValue[0] !== "-"){
            stringValue = "-" + stringValue;
        }
        // make negative numbers positive
        else if(stringValue[0] === "-"){
            stringValue = stringValue.slice(1);
        }
        populateDisplay(stringValue);
    })
}
function handleString(string){
    const MAX_DISPLAY_LENGTH = 11;
    const MAX_INT_LENGTH = 9;

    // when input is empty initially, or after backstroke and clear all, convert it to zero
    if(string === "")
        string = "0";

    // add zero to input when the first click is dot
    if(string[0] === ".")
        string = "0" + string;
    
    // prevent multiple dots 
    if(string[string.length-1] === '.' && string.substring(0, string.length -1).includes('.'))
        string = string.slice(0, -1);

    // remove leading zero from non null values
    if(string[0] === "0" && !string.includes(".") && string !== "0"){
        string = string.slice(1);
    }
    
    // if string is longer then display length : 
    // 1.222222222222222222222222222 => slice(0,10) : 1.222222222 
    // 55555555.52555555555555555555 => slice(0,10) : 55555555.52
    // 55555555555555555.55555555555 => toExponential(2) : 5.55e+11
    // 55555555555555555555555555555 => toExponential(2) : 5.55e+12
    if(string.length > MAX_DISPLAY_LENGTH){
        const integerLength = string.indexOf('.');
        if(integerLength === -1 || integerLength > MAX_INT_LENGTH){
            string = Number(string).toExponential(2);
        } else {
            string = Number(string.slice(0,MAX_DISPLAY_LENGTH));
        }
    }
    return string;
}


calculate();
