const phoneControls = document.querySelectorAll(".controlButton");
const pcControl = document.querySelectorAll(".taster");
const fullscreenButton = document.getElementById("fullscreen");
const turnScreen = document.getElementById("turnScreen");
const turnScreen2 = document.getElementById("turnScreen2");
const turnScreenButton = document.getElementById("turnScreen-button");
let turn = 1

// Phone check
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );
}
  if (isMobileDevice()) {
    phoneControls.forEach((button) => {
      button.style.display = "inline-block";
    });
    pcControl.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    phoneControls.forEach((button) => {
      button.style.display = "none"; // Hide buttons on desktop if needed
    });
    pcControl.forEach((element) => {
      element.style.display = "block"; // Or adjust depending on the need
    });
  }


// Iphone check of fullscreen button
function isShit() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
  if (isShit()) {
    fullscreenButton.style.display = "none"; // Hide button on iPhone
  } else {
    fullscreenButton.style.display = "inline-block"; // Show button otherwise
  }


// Turn check
function turned() {
  return window.matchMedia("(orientation: landscape)").matches;
}

// Turn button
turnScreenButton.onclick = function () {
  turn = 0;
};

  // Check turn every 15 frames
  let frameCount = 0;
  function checkEveryFiveFrames() {
    frameCount++;
    if (frameCount % 15 === 0) {
      if (turned() || turn === 0) {
        turnScreen.style.display = "none"; // Hide the turn screen
        turnScreen2.style.display = "none"; // Hide the turn screen
        turnScreenButton.style.display = "none"; // Hide the turn screen button
      } else {
        turnScreen.style.display = "block"; // Show the turn screen
        turnScreen2.style.display = "block"; // Show the turn screen
        turnScreenButton.style.display = "block"; // Show the turn screen button
      }
    }
    requestAnimationFrame(checkEveryFiveFrames);
  }
  checkEveryFiveFrames();

