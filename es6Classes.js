class CircleGenerator {
    constructor() {
        this.selectedColor = "#CCE8CC";
        document.addEventListener("DOMContentLoaded", () => {
            document.addEventListener("click", this.handleClick.bind(this));
        });
    }

    handleClick(event) {
        const radius = this.getRandomNumber(10, 200);
        const circle = this.createCircle(event.clientX, event.clientY, radius);
        this.animateCircle(circle, radius);
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createCircle(x, y, radius) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.left = `${x - radius / 2}px`;
        circle.style.top = `${y - radius / 2}px`;
        circle.style.width = `${radius}px`;
        circle.style.height = `${radius}px`;
        circle.style.backgroundColor = this.selectedColor;
        document.body.appendChild(circle);
        return circle;
    }

    animateCircle(circle, initialRadius) {
        let currentRadius = initialRadius;
        let delay = 30;
        const shrinkInterval = setInterval(() => {
            currentRadius -= 1;
            circle.style.width = `${currentRadius}px`;
            circle.style.height = `${currentRadius}px`;
            circle.style.left = `${parseFloat(circle.style.left) + 0.5}px`;
            circle.style.top = `${parseFloat(circle.style.top) + 0.5}px`;
            if (currentRadius <= 0) {
                clearInterval(shrinkInterval);
                circle.parentNode.removeChild(circle);
            }
        }, delay);
    }

    selectColor(color) {
        this.selectedColor = color;
        this.resetColorChoices();
        this.highlightSelectedColor(color);
    }

    resetColorChoices() {
        const colorChoices = document.getElementsByClassName("colorChoice");
        for (let i = 0; i < colorChoices.length; i++) {
            colorChoices[i].style.border = "1px solid black";
        }
    }

    highlightSelectedColor(color) {
        const colorChoice = document.getElementById(color);
        if (colorChoice) {
            colorChoice.style.border = "3px solid black";
        }
    }

    reset() {
        this.removeAllCircles();
        this.selectColor('#CCE8CC');
    }

    removeAllCircles() {
        const circles = document.getElementsByClassName("circle");
        while (circles.length > 0) {
            circles[0].parentNode.removeChild(circles[0]);
        }
    }
}

// Instantiate CircleGenerator class
const circleGenerator = new CircleGenerator();
