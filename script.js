document.addEventListener("DOMContentLoaded", () => {
  const phoneControl = document.querySelector(".controlButton");
  const pcControl = document.querySelector(".taster");

  // Phone check
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  }

  if (isMobileDevice() && phoneControl && pcControl) {
    phoneControl.style.display = 'inline-block';
    pcControl.style.display = 'none';
  }
});
