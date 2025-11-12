// for dynamic grid setup
let calculator = document.querySelector(".calculator");
let grid_values = ["", "&#x2b;", "&#8722;", "&#215;", "&#247;", "7", "8", "9", "AC", "4", "5", "6", "&#8592;", "1", "2", "3", "=", "0", "."];
let grid_classes = ["display", "add", "subtract", "multiply", "divide", "seven", "eight", "nine", "clear", "four", "five", "six", "backspace", "one", "two", "three", "equals", "zero", "decimal"];

// global values
let display_valueA = "";
let display_valueB = "";
let operation = null;
let computationCompleted = false;

// keyboard support
let keyboardDOMButton;
let validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "c", "C", "Backspace", "Enter"];



// Dynamic creation of calculator cells
let grid_length = grid_values.length;
for(let i = 0; i < grid_length; i++){
    let el = document.createElement("button");
    if (i==0) el.disabled = true; // disable display interactivity
    el.innerHTML = grid_values[i];
    el.classList.add(grid_classes[i]);
    el.style.gridArea = grid_classes[i];

    // add event listener to buttons (nums and operands)
    el.addEventListener("click", function () {
        update(el);
    });

    calculator.appendChild(el);
}





// Update function for display, values
function update(button){
    let display = document.querySelector(".display");

    // Controls number entry
    if(!(isNaN(Number(button.innerHTML)))){
        // New Computation: hitting a digit after result output
        if(display_valueA && operation == null && computationCompleted){
            display_valueA = button.innerHTML;
            display.innerHTML = button.innerHTML;
            computationCompleted = false;
        }
        // First number (no operation set)
        else if(operation == null){
            display_valueA += button.innerHTML;
            display.innerHTML += button.innerHTML;
        }
         // Second number (operation set)
        else if(operation) {
            // update display with second value
            display.innerHTML = "";
            display_valueB += button.innerHTML;
            display.innerHTML += display_valueB;
        }
    }


    // Controls operators
    if(button.classList.contains("add") || button.classList.contains("subtract") || button.classList.contains("multiply") || button.classList.contains("divide")){
        // only apply operand if num1 entered, and num2 not entered
        if(!(display_valueA == "") && display_valueB == ""){
            operation = button.classList[0];
        }

        // chaining: instead of hitting equals, hitting operator after second num defined
        if(display_valueA && display_valueB && operation){
            // simulate an equals press
            if(display_valueA && display_valueB && operation){
                display.innerHTML = operate(display_valueA, display_valueB);
            }
            display_valueA = display.innerHTML;
            display_valueB = "";
            operation = null;

            // set operation as regular
            operation = button.classList[0];
        }
    }
    

    // Controls equals
    if(button.classList.contains("equals")){
        // If numbers and operator defined
        if(display_valueA && display_valueB && operation){
            display.innerHTML = operate(display_valueA, display_valueB);

            // set result as first number, and reset the rest
            display_valueA = display.innerHTML;
            display_valueB = "";
            operation = null;
        }

        // Special Case Flag: Press Digit after Result Computated
        computationCompleted = true;
    }


    // Controls clear
    if(button.innerHTML == "AC"){
        // reset global values
        display_valueA = "";
        display_valueB = "";
        operation = null;

        // clear display
        display.innerHTML = "";
    }


    // Controls decimal
    if(button.classList.contains("decimal")){
        // Check if decimal already added
        if(!(display.innerText.includes("."))){
            // Figure out if decimal belongs to num1 or num2
            if(operation == null){
                display_valueA += ".";
            } else {
                display_valueB += ".";
            }
            display.innerHTML += ".";
        }
    }

    // Controls backspace
    if(button.classList.contains("backspace")){
        // Special Characters that reset to zero: -x and .x or length 1
        let reset_to_zero = false;
        if(display.innerHTML.length == 1 || 
            (display.innerHTML.length == 2 && display.innerHTML.charAt(0) == ".") || 
            (display.innerHTML.length == 2 && display.innerHTML.charAt(0) == "-"))
        {
            reset_to_zero = true;
        }

        if(operation == null){
            // Modifying num1
            if(reset_to_zero){
                display_valueA = "0";
            } else {
                display_valueA = display_valueA.substring(0, display_valueA.length - 1);
            }
            display.innerHTML = display_valueA;
        } else {
            // Modifying num2
            if(reset_to_zero){
                display_valueB = "0";
            } else {
                display_valueB = display_valueB.substring(0, display_valueB.length - 1);
            }
            display.innerHTML = display_valueB;
        }
    }
}





// Keyboard Support
document.addEventListener("keydown", function(event){
    let valid = false;
    if(validKeys.includes(event.key)) valid = true;

    // Call update function with proper DOM button
    if(valid){
        let button;

        switch(event.key){
            case "0": button = document.querySelector(".zero"); break;
            case "1": button = document.querySelector(".one"); break;
            case "2": button = document.querySelector(".two"); break;
            case "3": button = document.querySelector(".three"); break;
            case "4": button = document.querySelector(".four"); break;
            case "5": button = document.querySelector(".five"); break;
            case "6": button = document.querySelector(".six"); break;
            case "7": button = document.querySelector(".seven"); break;
            case "8": button = document.querySelector(".eight"); break;
            case "9": button = document.querySelector(".nine"); break;
            case ".": button = document.querySelector(".decimal"); break;
            case "+": button = document.querySelector(".add"); break;
            case "-": button = document.querySelector(".subtract"); break;
            case "*": button = document.querySelector(".multiply"); break;
            case "/": button = document.querySelector(".divide"); break;
            case "c": button = document.querySelector(".clear"); break;
            case "C": button = document.querySelector(".clear"); break;
            case "Backspace": button = document.querySelector(".backspace"); break;
            case "Enter": button = document.querySelector(".equals"); break;
        }

        update(button);
    }
});





function operate(a, b){
    switch(operation){
        case "add":
            return add(a, b);
            break;
        case "subtract":
            return subtract(a, b);
            break;
        case "multiply":
            return multiply(a, b);
            break;
        case "divide":
            return divide(a, b);
            break;
        default:
            console.log("No operand chosen.");
    }
}





function add(a, b){
    // avoid concatenation issues
    return Number(a) + Number(b);
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}


