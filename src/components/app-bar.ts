class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bar");
    const titleElement = document.createElement("h1") as HTMLHeadingElement;
    const themeSwitch = document.createElement("app-theme-switch");
    titleElement.classList.add("bar__title");
    titleElement.textContent = "calc";
    this.append(titleElement, themeSwitch);
  }
}

export default AppBar;