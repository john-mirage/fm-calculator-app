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

let expression = "0";
screenResult.textContent = expression;

const regex = /^(?!,)(?<left>[\d,]+)(?<!,)(?<operator>[+\-x\/])(?!,)(?<right>[\d,]+)(?<!,)$/;

function reduceExpression(expression: string) {
  const { groups } = expression.match(regex);
  console.log(groups);
  switch (groups.operator) {
    case "+":
      screenResult.textContent = String(Number(groups.left) + Number(groups.right));
      break;
    case "-":
      screenResult.textContent = String(Number(groups.left) - Number(groups.right));
      break;
    case "x":
      screenResult.textContent = String(Number(groups.left) * Number(groups.right));
      break;
    case "/":
      screenResult.textContent = String(Number(groups.left) / Number(groups.right));
      break;
    default:
      throw new Error("The operator is not valid");
  }
}

function handleNumbers(number) {
  if (screenResult.textContent !== "0") {
    screenResult.textContent += number;
  } else  {
    screenResult.textContent = number;
  }
}

function handleOperators(operator) {
  const lastChar = screenResult.textContent[screenResult.textContent.length - 1];
  const lastCharIsOperator = lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "/";
  if (lastCharIsOperator) {
    screenResult.textContent = screenResult.textContent.slice(0, -1) + operator;
  } else {
    const expressionHasOperator = screenResult.textContent.search(/[+\-x\/]/);
    if (expressionHasOperator !== -1) {
      reduceExpression(screenResult.textContent);
    }
    screenResult.textContent += operator;
  }
}

function handleResult() {
  const lastChar = screenResult.textContent[screenResult.textContent.length - 1];
  const lastCharIsOperator = lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "/";
  if (lastCharIsOperator) {
    screenResult.textContent = screenResult.textContent.slice(0, -1);
  } else {
    reduceExpression(screenResult.textContent);
  }
}

function handleDelete() {
  if (screenResult.textContent.length <= 1) {
    screenResult.textContent = "0";
  } else {
    screenResult.textContent = screenResult.textContent.slice(0, -1);
  }
}

function handleClear() {
  screenResult.textContent = "0";
}

const keys = [
  {
    label: "7",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "8",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "9",
    action: handleNumbers,
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
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "5",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "6",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "+",
    action: handleOperators,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "1",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "2",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "3",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "-",
    action: handleOperators,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: ".",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "0",
    action: handleNumbers,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "/",
    action: handleOperators,
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "x",
    action: handleOperators,
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
  button.addEventListener("click", (event) => {
    key.action(key.label);
  });
  keypad.appendChild(document.createComment(key.label));
  keypad.appendChild(keyFragment);
});
