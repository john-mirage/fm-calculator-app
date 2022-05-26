import Key from "@interfaces/key";

class AppKeypad extends HTMLElement {
  keys: Key[];

  constructor() {
    super();
    this.keys = [
      {
        label: "7",
        shape: "square",
        type: "number",
      },
      {
        label: "8",
        shape: "square",
        type: "number",
      },
      {
        label: "9",
        shape: "square",
        type: "number",
      },
      {
        label: "del",
        shape: "square",
        type: "delete",
      },
      {
        label: "4",
        shape: "square",
        type: "number",
      },
      {
        label: "5",
        shape: "square",
        type: "number",
      },
      {
        label: "6",
        shape: "square",
        type: "number",
      },
      {
        label: "+",
        shape: "square",
        type: "operator",
      },
      {
        label: "1",
        shape: "square",
        type: "number",
      },
      {
        label: "2",
        shape: "square",
        type: "number",
      },
      {
        label: "3",
        shape: "square",
        type: "number",
      },
      {
        label: "-",
        shape: "square",
        type: "operator",
      },
      {
        label: ".",
        shape: "square",
        type: "float",
      },
      {
        label: "0",
        shape: "square",
        type: "number",
      },
      {
        label: "/",
        shape: "square",
        type: "operator",
      },
      {
        label: "x",
        shape: "square",
        type: "operator",
      },
      {
        label: "reset",
        shape: "rectangle",
        type: "reset",
      },
      {
        label: "=",
        shape: "rectangle",
        type: "result",
      },
    ];
  }

  connectedCallback() {
    this.classList.add("keypad");
    this.keys.forEach((key) => {
      const buttonElement = <HTMLButtonElement>document.createElement("button");
      const labelElement = <HTMLSpanElement>document.createElement("span");
      buttonElement.classList.add("key", `key--${key.shape}`, `key--${key.type}`);
      labelElement.classList.add("key__label");
      labelElement.textContent = key.label;
      buttonElement.appendChild(labelElement);
      buttonElement.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("app-key-pressed", { detail: { key }}));
      });
      this.appendChild(buttonElement);
    });
  }
}

export default AppKeypad;