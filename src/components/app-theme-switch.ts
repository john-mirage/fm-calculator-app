class AppThemeSwitch extends HTMLElement {
  currentTheme: string;

  constructor() {
    super();
    this.currentTheme = "theme-1";
  }

  connectedCallback() {
    this.classList.add("theme-switch");
    const template = <HTMLTemplateElement>document.getElementById("template-theme-switch");
    const fragment = <DocumentFragment>template.content.cloneNode(true);
    const inputs = <NodeListOf<HTMLInputElement>>fragment.querySelectorAll(".theme-switch__input");
    inputs.forEach((input, index) => {
      input.addEventListener("change", () => {
        const newTheme = `theme-${String(index + 1)}`;
        document.documentElement.classList.replace(this.currentTheme, newTheme);
        this.currentTheme = newTheme;
      });
    });
    this.appendChild(fragment);
  }
}

export default AppThemeSwitch;