class AppRoot extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const bar = document.createElement("app-bar");
    const screen = document.createElement("app-screen");
    const keypad = document.createElement("app-keypad");
    this.append(bar, screen, keypad);
  }
}

export default AppRoot;