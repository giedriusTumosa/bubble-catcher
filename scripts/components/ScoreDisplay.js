import Bubble from "./Bubble.js";
import BubblesBox from "./BubblesBox.js";

export default class ScoreDisplay {
  constructor() {
    this._score = 0;
  }

  get score() {
    return this._score;
  }

  increaseScore() {
    this._score++;
    this.render();
  }
  render() {
    const app = document.querySelector(".app");
    // Reset
    const existingScoreDisplay = document.querySelector(".scoreDisplay");
    existingScoreDisplay && existingScoreDisplay.remove();

    // Generate element
    this.scoreDisplayElement = document.createElement("p");
    this.scoreDisplayElement.setAttribute("class", "scoreDisplay");
    this.text = document.createTextNode("BUBBLES CAPTURED:");
    this.scoreDisplayElement.append(this.text);

    this.scoreValue = document.createElement("p");
    this.scoreValue.setAttribute("class", "scoreValue");

    this.text = document.createTextNode(`${this._score}`);
    this.scoreValue.append(this.text);
    this.scoreDisplayElement.append(this.scoreValue);

    // Launch button

    this.gameLaunchButton = document.createElement("button");
    this.gameLaunchButton.setAttribute("class", "buttonGameLaunch");
    this.gameLaunchButton.setAttribute("type", "button");
    this.gameLaunchButton.textContent = "Launch";

    // Stop button

    this.gameStopButton = document.createElement("button");
    this.gameStopButton.setAttribute("class", "buttonGameStop");
    this.gameStopButton.setAttribute("type", "button");
    this.gameStopButton.textContent = "Stop";

    // Rotation on
    this.checkBoxRotationWrapper = document.createElement("div");
    this.checkBoxRotationWrapper.setAttribute(
      "class",
      "checkBoxRotationWrapper"
    );
    this.checkBoxRotation = document.createElement("input");
    this.checkBoxRotation.setAttribute("id", "rotationCheckbox");
    this.checkBoxRotation.setAttribute("name", "rotationCheckbox");
    this.checkBoxRotation.setAttribute("type", "checkbox");
    Bubble.bubblesAreFloating
      ? this.checkBoxRotation.setAttribute("checked", "checked")
      : this.checkBoxRotation.removeAttribute("checked");

    this.checkBoxRotationLabel = document.createElement("label");
    this.checkBoxRotationLabel.textContent = `Floating bubbles:`;
    this.checkBoxRotationLabel.setAttribute("for", "rotationCheckbox");
    this.checkBoxRotationWrapper.append(
      this.checkBoxRotationLabel,
      this.checkBoxRotation
    );

    // Condense on click

    this.checkBoxCondensatorWrapper = document.createElement("div");
    this.checkBoxCondensatorWrapper.setAttribute(
      "class",
      "checkBoxCondensatorWrapper"
    );

    this.checkBoxCondensator = document.createElement("input");
    this.checkBoxCondensator.setAttribute("id", "condensatorCheckbox");
    this.checkBoxCondensator.setAttribute("name", "condensatorCheckbox");
    this.checkBoxCondensator.setAttribute("type", "checkbox");
    BubblesBox.bubblesCondenseOnClick
      ? this.checkBoxCondensator.setAttribute("checked", "checked")
      : this.checkBoxCondensator.removeAttribute("checked");

    this.checkBoxCondensatorLabel = document.createElement("label");
    this.checkBoxCondensatorLabel.textContent = `Condense on click:`;
    this.checkBoxCondensatorLabel.setAttribute("for", "condensatorCheckbox");

    this.checkBoxCondensatorWrapper.append(
      this.checkBoxCondensatorLabel,
      this.checkBoxCondensator
    );

    // Appends
    this.scoreDisplayElement.append(
      this.gameLaunchButton,
      this.gameStopButton,
      this.checkBoxRotationWrapper,
      this.checkBoxCondensatorWrapper
    );

    app.append(this.scoreDisplayElement);
    return this.scoreDisplayElement;
  }
}
