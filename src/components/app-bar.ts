class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bar");
    const titleElement = <HTMLHeadingElement>document.createElement("h1");
    const themeSwitch = document.createElement("app-theme-switch");
    titleElement.classList.add("bar__title");
    titleElement.textContent = "calc";
    this.append(titleElement, themeSwitch);
  }
}

export default AppBar;