/* Polyfill for Object.create for older browsers */
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

/* Circle constructor */
function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.element = null;
}

/* Method to create circle element */
Circle.prototype.createElement = function() {
    var circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = (this.x - this.radius / 2) + "px";
    circle.style.top = (this.y - this.radius / 2) + "px";
    circle.style.width = this.radius + "px";
    circle.style.height = this.radius + "px";
    circle.style.backgroundColor = selectedColor;
    document.body.appendChild(circle);
    this.element = circle;
};

/* Method to animate circle */
Circle.prototype.animate = function() {
    var self = this;
    var currentRadius = this.radius;
    var shrinkInterval = setInterval(function() {
        currentRadius -= 1;
        self.element.style.width = currentRadius + "px";
        self.element.style.height = currentRadius + "px";
        self.element.style.left = parseFloat(self.element.style.left) + 0.5 + "px";
        self.element.style.top = parseFloat(self.element.style.top) + 0.5 + "px";
        if (currentRadius <= 0) {
            clearInterval(shrinkInterval);
            self.element.parentNode.removeChild(self.element);
        }
    }, 10);
};

/* Event listener for document click */
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", handleClick);
});

/* Function to handle mouse click event */
function handleClick(event) {
    var radius = getRandomNumber(10, 200);
    var circle = new Circle(event.clientX, event.clientY, radius);
    circle.createElement();
    circle.animate();
}

/* Function to generate a random number between min and max */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Default color */
var selectedColor = "#CCE8CC";

/* Function to select color */
function selectColor(color) {
    selectedColor = color;
    resetColorChoices();
    highlightSelectedColor(color);
}

/* Function to reset color choices border */
function resetColorChoices() {
    var colorChoices = document.getElementsByClassName("colorChoice");
    for (var i = 0; i < colorChoices.length; i++) {
        colorChoices[i].style.border = "1px solid black";
    }
}

/* Function to highlight selected color */
function highlightSelectedColor(color) {
    var colorChoice = document.getElementById(color);
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
    var circles = document.getElementsByClassName("circle");
    while (circles.length > 0) {
        circles[0].parentNode.removeChild(circles[0]);
    }
}
