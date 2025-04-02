const phoneControls = document.querySelectorAll(".controlButton");
const pcControl = document.querySelectorAll(".taster");
const fullscreenButton = document.getElementById("fullscreen");

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
// Iphone check
function isShit() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
if (isIsit()) {
  fullscreenButton.style.display = "none"; // Hide button on iPhone
} else {
  fullscreenButton.style.display = "inline-block"; // Show button otherwise
}
