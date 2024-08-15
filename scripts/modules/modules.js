export const calc_add = (num1 = null, num2 = null) => {
  if (num1 === null || num2 === null) return "Error";
  return num1 + num2;
};

export const calc_substract = (num1 = null, num2 = null) => {
  if (num1 === null || num2 === null) return "Error";
  return num1 - num2;
};

export const calc_divide = (num1 = null, num2 = null) => {
  if (num2 === 0) return "Cannot divide by zero";
  if (num1 === null || num2 === null) return "Error";
  return num1 / num2;
};

export const calc_multiply = (num1 = null, num2 = null) => {
  if (num1 === null || num2 === null) return "Error";
  return num1 * num2;
};

export const calc_square = (num1 = null) => {
  if (num1 === null) return "Error";
  return num1 * num1;
};

export const calc_squareRoot = (num1 = null) => {
  if (num1 < 0) return "Invalid input";
  if (num1 === null) return "Error";
  return Math.sqrt(num1);
};
