class AppThemeSwitch extends HTMLElement {
  currentTheme: string;

  constructor() {
    super();
    this.currentTheme = "theme-1";
  }

  connectedCallback() {
    this.classList.add("theme-switch");
    const template = document.getElementById("template-theme-switch") as HTMLTemplateElement;
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const inputs = fragment.querySelectorAll(".theme-switch__input") as NodeListOf<HTMLInputElement>;
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