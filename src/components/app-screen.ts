class AppScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("screen");
    const paragraphElement = document.createElement("p") as HTMLParagraphElement;
    paragraphElement.classList.add("screen__result");
    this.appendChild(paragraphElement);
  }
}

export default AppScreen;