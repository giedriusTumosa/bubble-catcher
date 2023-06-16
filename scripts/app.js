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
    const bubbleDiameterInPx = e.target.getBoundingClientRect().width;
    clickedBubble.remove();
    scoreDisplay.increaseScore(bubbleDiameterInPx);
    clickedBubble.classList.add("clicked");
  }

  if (e.target.classList.contains("buttonGameLaunch")) {
    bubblePopUpIntervalId = setInterval(() => {
      const bubble = new Bubble(bubbleNumber);
      bubblesBoxElement.append(bubble.render());
    }, 100);
  }
  if (e.target.classList.contains("buttonGameStop")) {
    clearInterval(bubblePopUpIntervalId);
    const bubblesAll = document.querySelectorAll(".bubble");
    bubblesAll?.forEach((bubble) => {
      console.log("diameter", bubble.bubbleDiameter);
    });
  }
});

app.addEventListener("change", (e) => {
  if (e.target.name === "rotationCheckbox") {
    const bubblesAll = document.querySelectorAll(".bubble");
    if (e.target.checked) {
      bubblesAll?.forEach((bubble) => {
        !bubble.classList.contains("rotationAnimationA") &&
          bubble.classList.add("rotationAnimationA");
      });
      BubbleState.bubblesAreFloating = true;
    } else {
      bubblesAll?.forEach((bubble) => {
        const rotationSide = Math.ceil(Math.random() + 1);
        bubble.classList.contains("rotationAnimationA") &&
          bubble.classList.remove("rotationAnimationA");
      });
      BubbleState.bubblesAreFloating = false;
    }
  }
  if (e.target.name === "condensatorCheckbox") {
    if (e.target.checked) {
      BubbleState.bubblesCondenseOnClick = true;
    } else {
      BubbleState.bubblesCondenseOnClick = false;
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

// TODO: random special bubbles with high scores need to appear
// TODO: gravitacija, kad gravituotu tam tikri bublai link kitu tam tikru bublu
