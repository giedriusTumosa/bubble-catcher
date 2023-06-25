import BubbleState from "../BubbleState.js";

export const MAX_BUBBLE_DIAMETER = 100;
export const MIN_BUBBLE_DIAMETER = 20;
const PADDING = 100;
const MAX_RGB_COLOR_VALUE = 255;

export default class Bubble {
  constructor() {
    this.bubblePositionX = 0;
    this.bubblePositionY = 0;
    this.bubbleDiameter = 0;
    this.isClicked = false;
  }
  render() {
    this.bubbleWrapper = document.createElement("div");
    this.bubbleWrapper.setAttribute("class", "bubbleWrapper");

    this.bubbleElement = document.createElement("div");
    this.bubbleElement.setAttribute("class", "bubble");

    BubbleState.bubblesAreFloating &&
      !this.bubbleElement.classList.contains("rotationAnimationA") &&
      this.bubbleElement.classList.add("rotationAnimationA");

    this.bubbleWrapper.append(this.bubbleElement);

    this.setWidth();
    this.colorize();
    this.setPosition();

    return this.bubbleWrapper;
  }
  colorize() {
    //TODO iskelti i atskira file kaip atskira funkcija
    const bubblesBox = document.querySelector(".bubblesBox");
    const forbiddenBubbleColor =
      window.getComputedStyle(bubblesBox).backgroundColor;

    const [redValue, greenValue, blueValue] = [
      Math.floor(Math.random() * MAX_RGB_COLOR_VALUE + 1),
      Math.floor(Math.random() * MAX_RGB_COLOR_VALUE + 1),
      Math.floor(Math.random() * MAX_RGB_COLOR_VALUE + 1),
    ];

    let bubbleColor = `rgb(${redValue}, ${greenValue}, ${blueValue})
    `;

    if (bubbleColor === forbiddenBubbleColor) {
      bubbleColor = `
        rgb
        (
            ${MAX_RGB_COLOR_VALUE - redValue}, 
            ${MAX_RGB_COLOR_VALUE - greenValue}, 
            ${MAX_RGB_COLOR_VALUE - blueValue}
        )
        `;
    }

    this.bubbleElement.style.backgroundColor = bubbleColor;
  }
  setPosition() {
    const bubblesBoxRectInfo = document
      .querySelector(".bubblesBox")
      .getBoundingClientRect();

    this.bubblePositionX = Math.floor(
      Math.random() *
        (bubblesBoxRectInfo.width -
          this.bubbleDiameter -
          PADDING -
          MAX_BUBBLE_DIAMETER * 2) +
        PADDING
    );

    this.bubblePositionY = Math.floor(
      Math.random() *
        (bubblesBoxRectInfo.height -
          this.bubbleDiameter -
          PADDING -
          MAX_BUBBLE_DIAMETER * 2) +
        PADDING
    );

    this.bubbleElement.style.left = `${this.bubblePositionX}px`;
    this.bubbleElement.style.top = `${this.bubblePositionY}px`;
  }
  setWidth() {
    const bubbleDiameter = Math.ceil(
      Math.random() * (MAX_BUBBLE_DIAMETER - MIN_BUBBLE_DIAMETER) +
        MIN_BUBBLE_DIAMETER
    );
    this.bubbleElement.style.setProperty("width", `${bubbleDiameter}px`);
    this.bubbleDiameter = bubbleDiameter;
  }
}
