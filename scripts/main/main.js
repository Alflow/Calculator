import { updateTime, timer, timeOut } from "../modules/timers.js";
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
              let operation =
                this.tempDisplay.textContent + this.display.textContent;
              //si hay una x como operación, la cambia por  un "*" para que se pueda utilizar un eval
              operation = operation.replace("x", "*");
              console.log("Operación: " + operation);
              this.tempDisplay.innerText = operation;
              this.display.innerText = eval(operation);
              break;

            case "CE":
              this.clearDisplay();
              this.clearTemp();
              break;
            case "+/-":
              this.display.innerText = this.display.textContent * -1;
              break;
            case "x^2":
              this.display.innerText =
                this.display.textContent * this.display.textContent;
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
