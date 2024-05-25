
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

// stringValue is what is the input of the user and gets updated with the last result of the operations is string for better display
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

    // with each number or dot clicked concatenate send it to display
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

    // if: input then operator(+,-,*,/) are clicked 
    // then: first number takes input and input is reset

    // else: When next input and then operator are clicked and the first number is already set
    // then: the second number takes the input, get operation of the two numbers
    //       the second number is reset
    
    // if: equals is clicked; the calculator data is reset  

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
    clear.addEventListener("click", ()=>{
        firstNumber = null;
        secondNumber = null;
        stringValue = "";
        populateDisplay(stringValue);
    })
    deleted.addEventListener("click", ()=>{
        // when backstroke button is clicked
        // remove last value
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
    // when input is empty initially or after backstroke convert it to zero
    if(string === "")
        string = "0";

    // add zero to input when the first click is dot
    if(string[0] === ".")
        string = "0" + string;
    
    // remove double dot from input
    if(string[string.length-1] === '.' && string.substring(0, string.length -1).includes('.'))
        string = string.slice(0, -1);

    // remove leading zero
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
