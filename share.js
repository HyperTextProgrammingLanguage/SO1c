document.addEventListener("keydown", function(event) {
    if (event.key === "i") {
        if (window.opener) {
            window.close();
        } else {
            console.warn("Cannot close the window because it was not opened by a script.");
        }
    }
});