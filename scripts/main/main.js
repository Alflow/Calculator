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
      this.initializeKeyboard();
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
              const buttonSymbol = event.target.textContent;

              if (button.classList.contains("btn-operator")) {
                  this.handleOperatorButton(buttonSymbol);
              } else if (button.classList.contains("btn-number")) {
                  this.handleNumber(buttonSymbol);
              }
          });
      });
  }

  initializeKeyboard() {
      document.addEventListener("keydown", (event) => {
          const key = event.key;

          if (!isNaN(key) || key === ".") {
              this.handleNumber(key);
          } else if (["+", "-", "/", "*", "Enter", "=", "Backspace", "Escape", "%"].includes(key)) {
              this.handleOperatorKey(key);
          }
      });
  }

  handleOperatorButton(buttonSymbol) {
      switch (buttonSymbol) {
          case "=":
              this.calculateResult();
              break;
          case "CE":
              this.clearDisplay();
              this.clearTemp();
              break;
          case "C":
              this.clearDisplay();
              break;
          case "+/-":
              this.negateValue();
              break;
          case "x^2":
              this.squareValue();
              break;
          case "Del":
              this.backspace();
              break;
          case "sqrt":
              this.squareRootValue();
              break;
          case "%":
              this.percentageValue();
              break;
          default:
              this.handleOperator(buttonSymbol);
      }
      this.operatorSubmitted = true;
  }

  handleOperatorKey(key) {
      switch (key) {
          case "Enter":
          case "=":
              this.calculateResult();
              break;
          case "Backspace":
              this.backspace();
              break;
          case "Escape":
              this.clearDisplay();
              break;
          case "+":
          case "-":
          case "/":
          case "*":
              this.handleOperator(key);
              break;
          case "%":
              this.percentageValue();
              break;
          default:
              break;
      }
      this.operatorSubmitted = true;
  }

  calculateResult() {
      const num1 = parseFloat(this.tempDisplay.textContent);
      const num2 = parseFloat(this.display.textContent);
      const operator = this.tempDisplay.textContent.slice(-1);
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
  }

  negateValue() {
      this.display.innerText = (parseFloat(this.display.textContent) * -1).toString();
  }

  squareValue() {
      this.display.innerText = calc_square(parseFloat(this.display.textContent)).toString();
  }

  backspace() {
      this.display.innerText = this.display.innerText.slice(0, -1) || "0";
  }

  squareRootValue() {
      this.display.innerText = calc_squareRoot(parseFloat(this.display.innerText)).toString();
  }

  percentageValue() {
      this.display.innerText = (parseFloat(this.display.innerText) / 100).toString();
  }

  handleOperator(operator) {
      if (this.hasOperator()) {
          this.tempDisplay.innerText = this.tempDisplay.innerText.slice(0, -1) + operator;
      } else {
          this.tempDisplay.innerText = this.display.innerText + operator;
      }
  }

  handleNumber(number) {
      if (number === "." && this.display.innerText.includes(".")) return;

      if (this.operatorSubmitted) {
          this.display.innerText = number;
          this.operatorSubmitted = false;
      } else {
          this.display.innerText =
              this.display.innerText === "0" ? number : this.display.innerText + number;
      }
  }
}

const calculatorTest = new Calculator();
