import BubbleState from "./BubbleState.js";
import Bubble from "./components/Bubble.js";
import BubblesBox from "./components/BubblesBox.js";
import ScoreDisplay from "./components/ScoreDisplay.js";

const app = document.querySelector(".app");
const bubbleBox = new BubblesBox();
bubbleBox.render();
app.append(bubbleBox.render());

const bubblesBoxElement = document.querySelector(".bubblesBox");

const scoreDisplay = new ScoreDisplay();
scoreDisplay.render();
const bubbleNumber = 0;

let bubblePopUpIntervalId;
app.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("bubble") &&
    !e.target.classList.contains("clicked")
  ) {
    const clickedBubble = e.target;
    clickedBubble.remove();
    scoreDisplay.increaseScore();
    clickedBubble.classList.add("clicked");
  }

  if (e.target.classList.contains("buttonGameLaunch")) {
    bubblePopUpIntervalId = setInterval(() => {
      const bubble = new Bubble(bubbleNumber);
      bubblesBoxElement.append(bubble.render());
      bubbleBox.existingBubbles.push({
        x: bubble.bubblePositionX,
        y: bubble.bubblePositionY,
      });
    }, 100);
  }
  if (e.target.classList.contains("buttonGameStop")) {
    clearInterval(bubblePopUpIntervalId);
  }
});

app.addEventListener("change", (e) => {
  if (e.target.name === "rotationCheckbox") {
    const bubblesAll = document.querySelectorAll(".bubble");
    if (e.target.checked) {
      bubblesAll?.forEach((bubble) => {
        !bubble.classList.contains("rotationAnimation") &&
          bubble.classList.add("rotationAnimation");
      });
      Bubble.bubblesAreFloating = true;
    } else {
      bubblesAll?.forEach((bubble) => {
        bubble.classList.contains("rotationAnimation") &&
          bubble.classList.remove("rotationAnimation");
      });
      Bubble.bubblesAreFloating = false;
    }
  }
  if (e.target.name === "condensatorCheckbox") {
    if (e.target.checked) {
      BubblesBox.bubblesCondenseOnClick = true;
    } else {
      BubblesBox.bubblesCondenseOnClick = false;
    }
  }
});

// app.addEventListener("mousemove", (e) => {
//   const mouseCoordinates = { x: e.clientX, y: e.clientY };
//   const bubblesAll = document.querySelectorAll(".bubble");
//   bubblesAll.forEach((bubble) => {
//     bubble.style.top = `${mouseCoordinates.y - 5}px`;
//     bubble.style.left = `${mouseCoordinates.x - 5}px`;
//   });
// });

// TODO: score priklauso nuo burbuliuko dydzio, kuo mazesnis, tuo didesnis score
// TODO: random special bubbles with high scores need to appear
