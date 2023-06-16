import BubbleState from "../BubbleState.js";
import { MAX_BUBBLE_DIAMETER } from "./Bubble.js";

export default class ScoreDisplay {
  constructor() {
    this.capturedBubblesCount = 0;
    this.score = 0;
  }

  increaseScore(bubbleDiameter, minimumScoreGain = 10) {
    this.capturedBubblesCount++;
    this.score +=
      minimumScoreGain + MAX_BUBBLE_DIAMETER - bubbleDiameter.toFixed();
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

    this.capturedBubbleCountValue = document.createElement("p");
    this.capturedBubbleCountValue.setAttribute("class", "achievedValue");

    this.text = document.createTextNode(`${this.capturedBubblesCount}`);
    this.capturedBubbleCountValue.append(this.text);

    this.bubbleScoreValue = document.createElement("p");
    this.bubbleScoreValue.setAttribute("class", "achievedValue");

    this.text = document.createTextNode(`SCORE: ${this.score}`);
    this.bubbleScoreValue.append(this.text);

    this.scoreDisplayElement.append(
      this.capturedBubbleCountValue,
      this.bubbleScoreValue
    );

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
    BubbleState.bubblesAreFloating
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
    BubbleState.bubblesCondenseOnClick
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
