import Key from "@interfaces/key";

interface AppScreen extends HTMLElement {
  updateResult: (
    leftNumber: string,
    operator: string,
    rightNumber: string
  ) => string;
}

class AppRoot extends HTMLElement {
  leftNumber: string;
  operator: string;
  rightNumber: string;
  screen?: AppScreen;

  constructor() {
    super();
    this.leftNumber = "0";
    this.operator = "";
    this.rightNumber = "";
  }

  reduceExpression() {
    if (this.operator !== "" && this.rightNumber !== "") {
      switch (this.operator) {
        case "+":
          this.leftNumber = String(Number(this.leftNumber) + Number(this.rightNumber));
          break;
        case "-":
          this.leftNumber = String(Number(this.leftNumber) - Number(this.rightNumber));
          break;
        case "x":
          this.leftNumber = String(Number(this.leftNumber) * Number(this.rightNumber));
          break;
        case "/":
          this.leftNumber = String(Number(this.leftNumber) / Number(this.rightNumber));
          break;
        default:
          throw new Error("Operator is not valid");
      }
    } else {
      throw new Error("Something went wrong");
    }
    this.operator = "";
    this.rightNumber = "";
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleNumber(number: string) {
    if (this.operator !== "") {
      if (number === "0") {
        if (this.rightNumber !== "") {
          this.rightNumber += number;
        }
      } else {
        this.rightNumber += number;
      }
    } else {
      if (number === "0") {
        if (this.leftNumber !== "0") {
          this.leftNumber += number;
        }
      } else {
        if (this.leftNumber === "0") {
          this.leftNumber = number;
        } else {
          this.leftNumber += number;
        }
      }
    }
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleOperator(newOperator: string) {
    if (this.operator !== "") {
      if (this.rightNumber !== "") {
        if (this.rightNumber.endsWith(".")) {
          this.rightNumber = this.rightNumber.slice(0, this.rightNumber.length - 1);
        }
        this.reduceExpression();
      }
    } else if (this.leftNumber.endsWith(".")) {
      this.leftNumber = this.leftNumber.slice(0, this.leftNumber.length - 1);
    }
    this.operator = newOperator;
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleFloat(dot: string) {
    if (this.operator !== "") {
      if (this.rightNumber !== "") {
        if (!this.rightNumber.includes(".")) {
          this.rightNumber += dot;
        }
      }
    } else if (!this.leftNumber.includes(".")) {
      this.leftNumber += dot;
    }
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleResult() {
    if (this.operator !== "") {
      if (this.rightNumber.endsWith(".")) this.rightNumber = this.rightNumber.slice(0, this.rightNumber.length - 1);
      if (this.rightNumber !== "") {
        this.reduceExpression();
      } else {
        this.operator = "";
        this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
      }
    } else if (this.leftNumber.endsWith(".")) {
      this.leftNumber = this.leftNumber.slice(0, this.leftNumber.length - 1);
      this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
    }
  }

  handleDelete() {
    if (this.operator !== "") {
      if (this.rightNumber !== "") {
        this.rightNumber = this.rightNumber.slice(0, this.rightNumber.length - 1);
      } else {
        this.operator = "";
      }
    } else {
      if (this.leftNumber.length > 1) {
        this.leftNumber = this.leftNumber.slice(0, this.leftNumber.length - 1);
      } else {
        this.leftNumber = "0";
      }
    }
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleReset() {
    this.leftNumber = "0";
    this.operator = "";
    this.rightNumber = "";
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  connectedCallback() {
    const bar = document.createElement("app-bar");
    this.screen = <AppScreen>document.createElement("app-screen");
    const keypad = document.createElement("app-keypad");
    this.append(bar, this.screen, keypad);
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
    keypad.addEventListener("app-key-pressed", (event) => {
      const key: Key = (<CustomEvent>event).detail.key;
      switch (key.type) {
        case "number":
          this.handleNumber(key.label);
          break;
        case "operator":
          this.handleOperator(key.label);
          break;
        case "float":
          this.handleFloat(key.label);
          break;
        case "result":
          this.handleResult();
          break;
        case "reset":
          this.handleReset();
          break;
        case "delete":
          this.handleDelete();
          break;
        default:
          throw new Error("The key type is not valid");
      }
    });
  }
}

export default AppRoot;