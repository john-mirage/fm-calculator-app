import './main.css';

const themeSelectors = document.querySelectorAll(".switch__input");
const keypad = document.querySelector("#keypad");
const keyTemplate = document.querySelector("#key-template") as HTMLTemplateElement;

let theme = "theme-1";

themeSelectors.forEach(themeSelector => {
  themeSelector.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    document.documentElement.classList.replace(theme, target.value);
    theme = target.value;
  });
});

const keys = [
  {
    label: "7",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "8",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "9",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "del",
    action: "",
    isRectangle: false,
    type: "del-reset",
  },
  {
    label: "4",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "5",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "6",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "+",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "1",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "2",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "3",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "-",
    action: "",
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
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "/",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "x",
    action: "",
    isRectangle: false,
    type: "number-operator",
  },
  {
    label: "reset",
    action: "",
    isRectangle: true,
    type: "del-reset",
  },
  {
    label: "=",
    action: "",
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
  keypad.appendChild(document.createComment(key.label));
  keypad.appendChild(keyFragment);
});
