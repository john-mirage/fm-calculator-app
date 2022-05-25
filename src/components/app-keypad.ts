import Key from "@interfaces/key";

class AppKeypad extends HTMLElement {
  keys: Key[];

  constructor() {
    super();
    this.keys = [
      {
        label: "7",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "8",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "9",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "del",
        shape: "square",
        type: "del-reset",
      },
      {
        label: "4",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "5",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "6",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "+",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "1",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "2",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "3",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "-",
        shape: "square",
        type: "number-operator",
      },
      {
        label: ".",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "0",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "/",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "x",
        shape: "square",
        type: "number-operator",
      },
      {
        label: "reset",
        shape: "rectangle",
        type: "del-reset",
      },
      {
        label: "=",
        shape: "rectangle",
        type: "equal",
      },
    ];
  }

  connectedCallback() {
    this.classList.add("keypad");
    this.keys.forEach((key) => {
      const buttonElement = document.createElement("button");
      const labelElement = document.createElement("label");
      buttonElement.classList.add("key", `key--${key.shape}`, `key--${key.type}`);
      labelElement.classList.add("key__label");
      labelElement.textContent = key.label;
      buttonElement.appendChild(labelElement);
      this.appendChild(buttonElement);
    });
  }
}

export default AppKeypad;