export default class BubblesBox {
  static bubblesCondenseOnClick = false;
  constructor() {
    this.existingBubbles = [];
    this.moleculesCoordinate = [];
    this.bubblesCondenseOnClick = BubblesBox.bubblesCondenseOnClick;
  }
  render() {
    // Reset
    const app = document.querySelector(".app");

    const existingBubblesBox = document.querySelector(".bubblesBox");
    existingBubblesBox && existingBubblesBox.remove();

    this.bubblesBoxElement = document.createElement("div");
    this.bubblesBoxElement.setAttribute("class", "bubblesBox");

    app.append(this.bubblesBoxElement);

    this.attachEventListeners();
    return this.bubblesBoxElement;
  }
  attachEventListeners() {
    this.bubblesBoxElement.addEventListener("click", (e) =>
      this.condenseOnClick(e)
    );

    this.bubblesBoxElement.addEventListener("dblclick", (e) => {
      this.condenseOnDoubleClick(e);
    });
  }

  condenseOnClick(e) {
    if (!BubblesBox.bubblesCondenseOnClick) return;
    const mouseCoordinates = { x: e.clientX, y: e.clientY };
    const bubblesAll = document.querySelectorAll(".bubble");
    bubblesAll.forEach((bubble) => {
      if (!bubble.classList.contains("condensed")) {
        bubble.style.top = `${mouseCoordinates.y - 5}px`;
        bubble.style.left = `${mouseCoordinates.x - 5}px`;
        bubble.classList.add("condensed");
      }
    });
  }
  condenseOnDoubleClick(e) {
    if (!BubblesBox.bubblesCondenseOnClick) return;
    const mouseCoordinates = { x: e.clientX, y: e.clientY };
    const bubblesAll = document.querySelectorAll(".bubble");
    bubblesAll.forEach((bubble) => {
      if (bubble.classList.contains("condensed")) {
        bubble.style.top = `${mouseCoordinates.y - 5}px`;
        bubble.style.left = `${mouseCoordinates.x - 5}px`;
      }
    });
  }
}
