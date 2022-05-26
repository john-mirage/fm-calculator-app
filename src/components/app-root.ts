import Key from "@interfaces/key";

interface AppScreen extends HTMLElement {
  updateResult: (
    leftNumber: string,
    operator: string,
    rightNumber: string
  ) => string;
}

interface AppBar extends HTMLElement {
  setActiveThemeSwitchInput: (theme: string) => void;
}

class AppRoot extends HTMLElement {
  leftNumber: string;
  operator: string;
  rightNumber: string;
  availableThemes: string[];
  lightThemePreferredMQL: MediaQueryList;
  screen?: AppScreen;
  bar?: AppBar;

  constructor() {
    super();
    this.leftNumber = "0";
    this.operator = "";
    this.rightNumber = "";
    this.availableThemes = ["theme-1", "theme-2", "theme-3"];
    this.lightThemePreferredMQL = window.matchMedia("(prefers-color-scheme: light)");
    const localStorageTheme = localStorage.getItem("theme") || "";
    if (this.availableThemes.includes(localStorageTheme)) {
      document.documentElement.dataset.theme = localStorageTheme;
    } else if (this.lightThemePreferredMQL.matches) {
      document.documentElement.dataset.theme = "theme-2";
    } else {
      document.documentElement.dataset.theme = "theme-1";
    }
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
    this.operator = newOperator.replace("*", "x");
    this.screen?.updateResult(this.leftNumber, this.operator, this.rightNumber);
  }

  handleFloat() {
    if (this.operator !== "") {
      if (this.rightNumber !== "") {
        if (!this.rightNumber.includes(".")) {
          this.rightNumber += ".";
        }
      }
    } else if (!this.leftNumber.includes(".")) {
      this.leftNumber += ".";
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
    this.screen = <AppScreen>document.createElement("app-screen");
    this.bar = this.createBar();
    const keypad = this.createKeypad();
    this.listenKeyboard();
    this.append(this.bar, this.screen, keypad);
    this.lightThemePreferredMQL.addEventListener("change", () => {
      const localStorageTheme = localStorage.getItem("theme") || "";
      if (!this.availableThemes.includes(localStorageTheme)) {
        document.documentElement.dataset.theme = this.lightThemePreferredMQL.matches ? "theme-2" : "theme-1";
        this.bar?.setActiveThemeSwitchInput(document.documentElement.dataset.theme);
      }
    });
  }

  createBar() {
    const bar = <AppBar>document.createElement("app-bar");
    bar?.addEventListener("app-theme-switch", (event) => {
      const newTheme = (<CustomEvent>event).detail.newTheme;
      localStorage.setItem("theme", newTheme);
      document.documentElement.dataset.theme = newTheme;
    });
    return bar;
  }

  createKeypad() {
    const keypad = document.createElement("app-keypad");
    keypad.addEventListener("app-key-pressed", (event) => {
      const key: Key = (<CustomEvent>event).detail.key;
      switch (key.type) {
        case "number": this.handleNumber(key.label); break;
        case "operator": this.handleOperator(key.label); break;
        case "float": this.handleFloat(); break;
        case "result": this.handleResult(); break;
        case "reset": this.handleReset(); break;
        case "delete": this.handleDelete(); break;
        default: throw new Error("The key type is not valid");
      }
    });
    return keypad;
  }

  listenKeyboard() {
    document.addEventListener("keydown", (event) => {
      const keyPressed = event.key;
      const digitRegex = /^\d$/;
      const operatorRegex = /^[*x\-+/]$/;
      const resultRegex = /^Enter$|^=$/;
      const deleteRegex = /^Delete$|^Backspace$/;
      const floatRegex = /^[.,]$/;
      if (digitRegex.test(keyPressed)) {
        this.handleNumber(keyPressed);
      } else if (operatorRegex.test(keyPressed)) {
        this.handleOperator(keyPressed);
      } else if (floatRegex.test(keyPressed)) {
        this.handleFloat();
      } else if (deleteRegex.test(keyPressed)) {
        this.handleDelete();
      } else if (resultRegex.test(keyPressed)) {
        this.handleResult();
      }
    });
  }
}

export default AppRoot;