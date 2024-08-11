

import {
  calc_add,
  calc_substract,
  calc_divide,
  calc_multiply,
  calc_square,
  calc_squareRoot
} from '../modules/modules.js';

class Calculator {
  constructor() {
    this.display = document.getElementById("result");
    this.tempDisplay = document.getElementById("temp");
    this.initializeButtons();
    this.clearDisplay();
    this.clearTemp();
    this.operatorSubmitted = false;
    this.addingNumbersPossibility = true;
  }

  clearDisplay() {
    this.display.innerText = "0";
  }

  clearTemp() {
    this.tempDisplay.innerText = "";
  }

  hasOperator() {
    const operators = ["+", "-", "/", "*"];
    const lastChar = this.tempDisplay.innerText.slice(-1);
    return operators.includes(lastChar);
  }

  initializeButtons() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("Botón clickeado:", event.target.id);
        const buttonSymbol = event.target.textContent;

        if (button.classList.contains("btn-operator")) {
          switch (buttonSymbol) {
            case "=":
              let num1 = parseFloat(this.tempDisplay.textContent);
              let num2 = parseFloat(this.display.textContent);
              let operator = this.tempDisplay.textContent.slice(-1);
              let result;
          
              switch (operator) {
                case "+":
                  result = calc_add(num1, num2);
                  break;
                case "-":
                  result = calc_substract(num1, num2);
                  break;
                case "/":
                  result = calc_divide(num1, num2);
                  break;
                case "*":
                  result = calc_multiply(num1, num2);
                  break;
                default:
                  result = "Error";
              }
          
              this.display.innerText = result;
              this.tempDisplay.innerText = "";
              this.operatorSubmitted = false;
              break;
          
            case "CE":
              this.clearDisplay();
              this.clearTemp();
              break;
            case "C":
              this.display.innerText = 0;
              break;
            case "+/-":
              this.display.innerText = this.display.textContent * -1;
              break;
            case "x^2":
              this.display.innerText = calc_square(this.display.textContent);
              break;
            case "Del":
              this.display.innerText =
                this.display.innerText.slice(0, -1) || "0";
              break;
            case "sqrt":
              this.display.innerText = calc_squareRoot(this.display.innerText);
              break;
            case "%":
              this.display.innerText = parseFloat(this.display.innerText) / 100;
              break;
            // Agrega más casos según sea necesario
            default:
              if (this.hasOperator()) {
                // Reemplaza el operador existente si ya hay uno
                this.tempDisplay.innerText =
                  this.tempDisplay.innerText.slice(0, -1) + buttonSymbol;
              } else {
                // Añade el operador al tempDisplay y mantiene el número en el display
                this.tempDisplay.innerText =
                  this.display.innerText + buttonSymbol;
              }
          }
          
          this.operatorSubmitted = true;
        } else if (button.classList.contains("btn-number")) {
          // Verificar si el símbolo es un punto decimal
          if (buttonSymbol === ".") {
            if (this.display.innerText.includes(".")) return;
          }

          // Maneja la entrada de números
          if (this.operatorSubmitted) {
            // Si se acaba de ingresar un operador, comienza un nuevo número
            this.display.innerText = buttonSymbol;
            this.operatorSubmitted = false;
          } else {
            // Continúa añadiendo dígitos al número actual
            this.display.innerText =
              this.display.innerText === "0"
                ? buttonSymbol
                : this.display.innerText + buttonSymbol;
          }
        }
      });
    });
  }
}

const calculatorTest = new Calculator();
