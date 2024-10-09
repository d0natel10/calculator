// основная логика 
const output = document.querySelector('.header__output');
const input = document.querySelector('.header__input');
const buttons = document.querySelectorAll('.header__btn button');
let currentExp = '';
let result = 0;
let openBracketsCount = 0;

function appendToOutput(val) {
    if (val.includes("π") || val.includes("e")){
        output.value += val;
        input.value += val.slice(0,1);
    }
    else if (val.includes("sqrt")){
        input.value += "√("
    }
    else if (val.includes("sin") || val.includes("asin") || val.includes("cos") || val.includes("acos") || val.includes("tan") || val.includes("atan")) {
         input.value += val.slice(5);
    }
    else {
        input.value += val;
    }
        currentExp += val;
    if (currentExp.includes("+") || currentExp.includes("-") || currentExp.includes("*") || currentExp.includes("/")) {
        searchErrors(currentExp);
    }
    else if (currentExp.includes("sqrt") || currentExp.includes("sin") || currentExp.includes("asin") || currentExp.includes("cos") || currentExp.includes("acos") || currentExp.includes("tan") || currentExp.includes("atan")) {
        if (currentExp.endsWith("0") || currentExp.endsWith("1") || currentExp.endsWith("2") || currentExp.endsWith("3") || currentExp.endsWith("4") || currentExp.endsWith("5") || currentExp.endsWith("6") || currentExp.endsWith("7")|| currentExp.endsWith("8") || currentExp.endsWith("9")){
            output.value = "you have not closed bracket `)`";
        }
        else {
            searchErrors(currentExp);
        }
    }
    else if (currentExp.includes("!") && currentExp.length > 1 && (currentExp.slice(0,1) !== '!')){
        if (currentExp.endsWith("!")){
            output.value = "Error";
        }
        else{
            result = factorial(currentExp.slice(0, currentExp.length-1));
            output.value = `${input.value} = ${result}`;
        }
    }
    else if (currentExp.includes("%")){
        result = currentExp.slice(0, currentExp.length-1)/100;
        output.value = `${input.value} = ${result}`;
    }
    else if (currentExp.includes("^") && currentExp.slice(0, currentExp.indexOf("^")).length>=1 && currentExp.slice(currentExp.indexOf("^")+1).length>=1) {
        if (currentExp.endsWith("^")){
            output.value = "Error";
        }
        else {
        result = Math.pow(currentExp.slice(0, currentExp.indexOf("^")), currentExp.slice(currentExp.indexOf("^")+1));
        if (Number.isNaN(result)){
            output.value = "Error";
        }
        else {
            output.value = `${input.value} = ${result}`;
        }
    }
}
}
function searchErrors(value) {
    try {
        if (!value.endsWith("+") && !value.endsWith("-") && !value.endsWith("*") && !value.endsWith("/") && !value.endsWith("(") && !value.endsWith("!") && !value.endsWith("^")){
            result = eval(value);
            if (!Number.isNaN(result)){
                output.value = `${input.value} = ${result}`;
            }
            else {
                output.value = "Error";
            }
        }
    }
    catch(e) {
        console.log(e.message);
    }
}

function factorial(n) {
    if (n < 0) {
        return undefined; 
    }
    if (n === 0 || n === 1) {
        return 1;
    }
            
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function handleButtonClick(button) {
    if (button.innerText === 'C') {
        output.value = '';
        input.value = '';
        currentExp = '';
        result = 0;
    } else if (button.innerText === '=') {
            try {
                if (!currentExp.endsWith("+") && !currentExp.endsWith("-") && !currentExp.endsWith("*") && !currentExp.endsWith("/") && !currentExp.endsWith("(") && !currentExp.endsWith("!") && !currentExp.endsWith("^")){
                    input.value = result;
                    currentExp = result;
                }
                else {
                    output.value = "Error";
                }
            } catch {
              output.value = 'Error';
              input.value = '';
            }
    } else if (button.innerText === '×') {
            appendToOutput('*');
    } else if (button.innerText === '÷') {
            appendToOutput('/');
    } else if (button.innerText === 'π') {
            appendToOutput(`π = ${Math.PI}`);
    } else if (button.innerText === 'e') {
            appendToOutput(`e = ${Math.E}`);
    } else if (button.innerText === '√') {
            openBracketsCount++;
            appendToOutput('Math.sqrt(');
    } else if (button.innerText === 'sin') {
            openBracketsCount++;
            appendToOutput('Math.sin(');
    } else if (button.innerText === 'asin') {
            openBracketsCount++;
            appendToOutput('Math.asin(');
    } else if (button.innerText === 'cos') {
            openBracketsCount++;
            appendToOutput('Math.cos(');
    } else if (button.innerText === 'acos') {
            openBracketsCount++;
            appendToOutput('Math.acos(');
    } else if (button.innerText === 'tan') {
            openBracketsCount++;
            appendToOutput('Math.tan(');
    } else if (button.innerText === 'atan') {
            appendToOutput('Math.atan(');
            openBracketsCount +=1;
    } else if (button.innerText === 'xy') {
            appendToOutput('^');
    } else if (button.innerText === 'x!') {
            appendToOutput('!');
    } else if (button.innerText === '1/x') {
            openBracketsCount +=1;
            appendToOutput('1/(');
    } else if (button.innerText === '%') {
            appendToOutput('%');
    } else if (button.innerText === '()') {
        console.log(currentExp, openBracketsCount);
        if (!currentExp.includes("(") ||  openBracketsCount === 0) {
            appendToOutput('(');
            openBracketsCount++;
        } else if (openBracketsCount > 0) {
            appendToOutput(')');
            openBracketsCount--;
        }
    } else if (button.innerText === ',') {
            appendToOutput('.');
    } else if (button.innerText !== '≣' && button.innerText !== "y"){
            appendToOutput(button.innerText);
          }
}
        
function init() {
    buttons.forEach((button) => {
    button.addEventListener('click', (e) => handleButtonClick(e.target));
    });
}
init();