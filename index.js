let calculator = document.querySelector(".calculator");
let grid_values = ["", "&#x2b;", "&#8722;", "&#215;", "&#247;", "7", "8", "9", "AC", "4", "5", "6", "&#8592;", "1", "2", "3", "=", "0", "."];
let grid_classes = ["display", "add", "subtract", "multiply", "divide", "seven", "eight", "nine", "clear", "four", "five", "six", "backspace", "one", "two", "three", "equals", "zero", "decimal"];

let display_valueA = "";
let display_valueB = "";
let operation = null;

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

    // Controls clear
    if(button.innerHTML == "AC"){
        // reset global values
        display_valueA = "";
        display_valueB = "";
        operation = null;

        // clear display
        display.innerHTML = "";
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

    // Controls number entry
    if(!(isNaN(Number(button.innerHTML)))){
        // First number (no operation set)
        if(operation == null){
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

    // Controls equals
    if(button.classList.contains("equals")){
        // If numbers and operator defined
        if(display_valueA && display_valueB && operation){
            display.innerHTML = operate(display_valueA, display_valueB);
        }

        // set result as first number, and reset the rest
        display_valueA = display.innerHTML;
        display_valueB = "";
        operation = null;
    }
}










// Uses global "operation" variable
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


