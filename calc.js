const operation = document.getElementById("operation");
const result = document.getElementById("result");
const reset = document.getElementById("reset");
const gridButtons = document.querySelector(".gridButtons");
let expression = [];

const isMathOperator = value => {
    switch(value){
        case "+": return true;
        case "-": return true;
        case "/": return true;
        case "*": return true;
        default: return false;
    }
}

const calcResult = () => {
    // https://stackoverflow.com/a/62402481
    result.innerText = Function(`'use strict'; return (${expression.join("")})`)();
}

const insertOperation = value => {
    if(value === "="){
        calcResult();
        return;
    }

    // bloqueia o inicio com operações
    if(operation.innerText === "-" && isMathOperator(value))
        return;

    // aceita numeros para iniciar
    if(operation.innerText === "-" && !isMathOperator(value))
        expression.push(value);
    // caso não seja uma operação adiciona o numero ao atual
    else if(!isMathOperator(value)){
        const v = expression.pop();

        if(isMathOperator(v)){
            expression.push(v);
            expression.push(value);
        }
        else
            expression.push(`${v}${value}`);
    }
    // caso ja tenha um resultado, coloca ele na operação junto da  operação clicada
    else if(result.innerText !== "0"){
        expression = [];
        expression.push(result.innerText);
        expression.push(value);
    }
    // adiciona a expressao no array
    else{
        const v = expression.pop();

        if(isMathOperator(v))
            expression.push(value);
        else{
            expression.push(v);
            expression.push(value);
        }
    }

    if(expression.length > 0)
        operation.innerText = expression.join(" ");
}

const resetCalc = e => {
    operation.innerText = "-";
    result.innerText = "0";
    expression = [];
}

for(const c of gridButtons.children){
    c.addEventListener("click", e => {
        insertOperation(c.innerText)
    });
}

reset.addEventListener("click", resetCalc); // chama metodo que reseta a calculadora