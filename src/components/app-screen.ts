class AppScreen extends HTMLElement {
  result?: HTMLParagraphElement;

  constructor() {
    super();
  }

  updateResult(
    leftNumber: string,
    operator: string,
    rightNumber: string
  ) {
    if (this.result) {
      const expression = `${leftNumber}${operator !== "" ? ` ${operator}` : ""}${rightNumber !== "" ? ` ${rightNumber}` : ""}`;
      this.result.textContent = expression.replace(/[.]/g, ",");
    }
  }

  connectedCallback() {
    this.classList.add("screen");
    this.result = <HTMLParagraphElement>document.createElement("p");
    this.result.classList.add("screen__result");
    this.appendChild(this.result);
  }
}

export default AppScreen;