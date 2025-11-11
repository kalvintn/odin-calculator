let calculator = document.querySelector(".calculator");


let grid_values = ["0", "+", "-", "*", "/", "7", "8", "9", "AC", "4", "5", "6", "&#8592;", "1", "2", "3", "=", "0", "."];
let grid_classes = ["display", "add", "subtract", "multiply", "divide", "seven", "eight", "nine", "clear", "four", "five", "six", "backspace", "one", "two", "three", "equals", "zero", "decimal"];


// Dynamic creation of calculator cells
let l = grid_values.length;
for(let i = 0; i < l; i++){
    let el = document.createElement("div");
    el.innerHTML = grid_values[i];
    el.classList.add(grid_classes[i]);
    el.style.gridArea = grid_classes[i];
    calculator.appendChild(el);
}
