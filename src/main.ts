import './main.css';

const themeSelectors = document.querySelectorAll(".switch__input");
const keypad = document.querySelector("#keypad");
const keyTemplate = document.querySelector("#key-template") as HTMLTemplateElement;
const screenResult = document.querySelector("#result") as HTMLParagraphElement;

let theme = "theme-1";

themeSelectors.forEach(themeSelector => {
  themeSelector.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    document.documentElement.classList.replace(theme, target.value);
    theme = target.value;
  });
});

let leftNumber: string = "0";
let operator: string = "";
let rightNumber: string = "";

function updateScreen() {
  let expression = `${leftNumber}${operator !== "" ? ` ${operator}` : ""}${rightNumber !== "" ? ` ${rightNumber}` : ""}`;
  screenResult.textContent = expression.replace(/[.]/g, ",");
}

updateScreen();

function reduceExpression() {
  if (operator !== "" && rightNumber !== "") {
    switch (operator) {
      case "+":
        leftNumber = String(Number(leftNumber) + Number(rightNumber));
        break;
      case "-":
        leftNumber = String(Number(leftNumber) - Number(rightNumber));
        break;
      case "x":
        leftNumber = String(Number(leftNumber) * Number(rightNumber));
        break;
      case "/":
        leftNumber = String(Number(leftNumber) / Number(rightNumber));
        break;
      default:
        throw new Error("Operator is not valid");
    }
  } else {
    throw new Error("Something went wrong");
  }
  operator = "";
  rightNumber = "";
  updateScreen();
}

function handleNumber(number) {
  if (operator !== "") {
    if (number === "0") {
      if (rightNumber !== "") {
        rightNumber += number;
      }
    } else {
      rightNumber += number;
    }
  } else {
    if (number === "0") {
      if (leftNumber !== "0") {
        leftNumber += number;
      }
    } else {
      if (leftNumber === "0") {
        leftNumber = number;
      } else {
        leftNumber += number;
      }
    }
  }
  updateScreen();
}

function handleOperator(newOperator) {
  if (operator !== "") {
    if (rightNumber !== "") {
      if (rightNumber.endsWith(".")) {
        rightNumber = rightNumber.slice(0, rightNumber.length - 1);
      }
      reduceExpression();
    }
  } else if (leftNumber.endsWith(".")) {
    leftNumber = leftNumber.slice(0, leftNumber.length - 1);
  }
  operator = newOperator;
  updateScreen();
}

function handleDot(dot) {
  if (operator !== "") {
    if (rightNumber !== "") {
      if (!rightNumber.includes(".")) {
        rightNumber += dot;
      }
    }
  } else if (!leftNumber.includes(".")) {
    leftNumber += dot;
  }
  updateScreen();
}

function handleResult() {
  if (operator !== "") {
    if (rightNumber.endsWith(".")) {
      rightNumber = rightNumber.slice(0, rightNumber.length - 1);
    }
    if (rightNumber !== "") {
      reduceExpression();
    } else {
      operator = "";
    }
  } else if (leftNumber.endsWith(".")) {
    leftNumber = leftNumber.slice(0, leftNumber.length - 1);
  }
  updateScreen();
}

function handleDelete() {
  if (operator !== "") {
    if (rightNumber !== "") {
      rightNumber = rightNumber.slice(0, rightNumber.length - 1);
    } else {
      operator = "";
    }
  } else {
    if (leftNumber.length > 1) {
      leftNumber = leftNumber.slice(0, leftNumber.length - 1);
    } else {
      leftNumber = "0";
    }
  }
  updateScreen();
}

function handleClear() {
  leftNumber = "0";
  operator = "";
  rightNumber = "";
  updateScreen();
}

const keys = [
  {
    label: "7",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "8",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "9",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "del",
    action: handleDelete,
    isRectangle: false,
    type: "del-reset",
  },
  {
    label: "4",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "5",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "6",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "+",
    action: handleOperator,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "1",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "2",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "3",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "-",
    action: handleOperator,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: ".",
    action: handleDot,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "0",
    action: handleNumber,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "/",
    action: handleOperator,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "x",
    action: handleOperator,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "reset",
    action: handleClear,
    isRectangle: true,
    type: "del-reset",
  },
  {
    label: "=",
    action: handleResult,
    isRectangle: true,
    type: "equal",
  },
];

keys.forEach((key) => {
  const keyFragment = keyTemplate.content.cloneNode(true) as HTMLElement;
  const button = keyFragment.querySelector(".keypad__key") as HTMLButtonElement;
  const label = keyFragment.querySelector(".keypad__label") as HTMLSpanElement;
  button.classList.add(key.isRectangle ? "keypad__key--rectangle": "keypad__key--square");
  button.classList.add(`keypad__key--${key.type}`);
  label.textContent = key.label;
  button.addEventListener("click", () => key.action(key.label));
  keypad.appendChild(document.createComment(key.label));
  keypad.appendChild(keyFragment);
});
