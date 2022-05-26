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

  setActiveThemeSwitchInput(theme: string) {
    const input = <HTMLInputElement>document.querySelector(`.theme-switch__input[value=${theme}]`);
    input.checked = true;
  };

  createThemeSwitch() {
    const template = <HTMLTemplateElement>document.getElementById("template-theme-switch");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const element = <HTMLDivElement>fragment.querySelector(".theme-switch");
    const inputs = <NodeListOf<HTMLInputElement>>fragment.querySelectorAll(".theme-switch__input");
    const buttons = <NodeListOf<HTMLButtonElement>>fragment.querySelectorAll(".theme-switch__button");
    buttons.forEach((button, index) => {
      button.setAttribute("id", `theme-switch-button-${index + 1}`);
    });
    const defaultTheme = document.documentElement.dataset.theme;
    inputs.forEach((input, index) => {
      if (input.value === defaultTheme) input.checked = true;
      input.setAttribute("id", `theme-switch-input-${index + 1}`);
      input.addEventListener("change", (event) => {
        const newTheme = (<HTMLInputElement>event.target).value;
        this.dispatchEvent(new CustomEvent("app-theme-switch", { detail: { newTheme } }));
      });
    });
    return element;
  }
}

export default AppBar;