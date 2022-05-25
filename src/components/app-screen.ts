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
    const frame = <HTMLDivElement>document.createElement("div");
    this.result = <HTMLParagraphElement>document.createElement("p");
    frame.classList.add("screen__frame");
    this.result.classList.add("screen__result");
    frame.appendChild(this.result);
    this.appendChild(frame);
  }
}

export default AppScreen;