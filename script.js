const phoneControls = document.querySelectorAll(".controlButton");
const pcControl = document.querySelectorAll(".taster");

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
