/* Event listener for document click */
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", handleClick);
});

/* Function to handle mouse click event */
function handleClick(event) {
    let radius = getRandomNumber(10, 200);
    let circle = createCircle(event.clientX, event.clientY, radius);
    animateCircle(circle, radius);
}

/* Function to generate a random number between min and max */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Default color */
let selectedColor = "#CCE8CC";

/* Function to create a circle element */
function createCircle(x, y, radius) {
    var circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = (x - radius / 2) + "px";
    circle.style.top = (y - radius / 2) + "px";
    circle.style.width = radius + "px";
    circle.style.height = radius + "px";
    circle.style.backgroundColor = selectedColor;
    document.body.appendChild(circle);
    return circle;
}

/* Function to animate the circle */
function animateCircle(circle, initialRadius) {
    var currentRadius = initialRadius;
    var shrinkInterval = setInterval(function() {
        currentRadius -= 1;
        circle.style.width = currentRadius + "px";
        circle.style.height = currentRadius + "px";
        circle.style.left = parseFloat(circle.style.left) + 0.5 + "px";
        circle.style.top = parseFloat(circle.style.top) + 0.5 + "px";
        if (currentRadius <= 0) {
            clearInterval(shrinkInterval);
            circle.parentNode.removeChild(circle);
        }
    }, 10);
}  

/* Function to select color */
function selectColor(color) {
    selectedColor = color;
    resetColorChoices();
    highlightSelectedColor(color);
}

/* Function to reset color choices border */
function resetColorChoices() {
    let colorChoices = document.getElementsByClassName("colorChoice");
    for (let i = 0; i < colorChoices.length; i++) {
        colorChoices[i].style.border = "1px solid black";
    }
}

/* Function to highlight selected color */
function highlightSelectedColor(color) {
    let colorChoice = document.getElementById(color);
    if (colorChoice) {
        colorChoice.style.border = "3px solid black";
    }
}

/* Function to reset the screen */
function reset() {
    removeAllCircles();
    selectColor('#CCE8CC');
}

/* Function to remove all circles from the screen */
function removeAllCircles() {
    let circles = document.getElementsByClassName("circle");
    while (circles.length > 0) {
        circles[0].parentNode.removeChild(circles[0]);
    }
}