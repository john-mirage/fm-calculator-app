class AppBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("bar");
    const titleElement = <HTMLHeadingElement>document.createElement("h1");
    const themeSwitch = this.createThemeSwitch();
    titleElement.classList.add("bar__title");
    titleElement.textContent = "calc";
    this.append(titleElement, themeSwitch);
  }

  createThemeSwitch() {
    const template = <HTMLTemplateElement>document.getElementById("template-theme-switch");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLDivElement>fragment.querySelector(".theme-switch");
    const inputs = <NodeListOf<HTMLInputElement>>fragment.querySelectorAll(".theme-switch__input");
    const defaultTheme = document.documentElement.dataset.theme;
    inputs.forEach((input) => {
      if (input.value === defaultTheme) input.checked = true;
      input.addEventListener("change", (event) => {
        const newTheme = (<HTMLInputElement>event.target).value;
        this.dispatchEvent(new CustomEvent("app-theme-switch", { detail: { newTheme } }));
      });
    });
    return element;
  }
}

export default AppBar;