// JavaScript (script.js)

// Circles Animation
const circleCanvas = document.getElementById("circleCanvas");
const circleCtx = circleCanvas.getContext("2d");

// Set canvas size
circleCanvas.width = window.innerWidth;
circleCanvas.height = window.innerHeight;

const numCircles = 5;
const circles = [];

function initializeCircles() {
  for (let i = 0; i < numCircles; i++) {
    const radius = 30;
    const color = getRandomColor();
    const rotationSpeed = Math.random() * 0.02;
    const delay = i * 10;

    circles.push({ radius, color, rotationSpeed, points: [], delay });
  }
}

function drawCircles() {
  circleCtx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
  const centerX = circleCanvas.width / 2;
  const centerY = circleCanvas.height / 2;

  circles.forEach((circle) => {
    circleCtx.beginPath();
    circleCtx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
    circleCtx.strokeStyle = circle.color;
    circleCtx.lineWidth = 3;
    circleCtx.stroke();
    circleCtx.closePath();

    const pointCount = 100;
    for (let i = 0; i < pointCount; i++) {
      const angle = i * circle.rotationSpeed;
      const x = centerX + circle.radius * Math.cos(angle);
      const y = centerY + circle.radius * Math.sin(angle);

      circle.points.push({ x, y });

      circleCtx.beginPath();
      circleCtx.arc(x, y, 2, 0, 2 * Math.PI);
      circleCtx.fillStyle = "#fff";
      circleCtx.fill();
      circleCtx.closePath();
    }

    circle.radius += 2;
  });

  requestAnimationFrame(drawCircles);
}

// Spiral Animation
const spiralCanvas = document.getElementById("spiralCanvas");
const spiralCtx = spiralCanvas.getContext("2d");

// Set canvas size
spiralCanvas.width = window.innerWidth;
spiralCanvas.height = window.innerHeight;

const numPoints = 500;
const spiralDensity = 0.02;
const rotationSpeed = 0.005;
const pointSize = 2;

function drawSpiral() {
  spiralCtx.fillStyle = "#000000";
  spiralCtx.fillRect(0, 0, spiralCanvas.width, spiralCanvas.height);

  spiralCtx.fillStyle = "#ffffff";

  for (let i = 0; i < numPoints; i++) {
    const angle = i * spiralDensity;
    const radius = i * 2;
    const x = spiralCanvas.width / 2 + radius * Math.cos(angle);
    const y = spiralCanvas.height / 2 + radius * Math.sin(angle);

    const rotatedX =
      (x - spiralCanvas.width / 2) * Math.cos(rotationSpeed) -
      (y - spiralCanvas.height / 2) * Math.sin(rotationSpeed) +
      spiralCanvas.width / 2;
    const rotatedY =
      (x - spiralCanvas.width / 2) * Math.sin(rotationSpeed) +
      (y - spiralCanvas.height / 2) * Math.cos(rotationSpeed) +
      spiralCanvas.height / 2;

    spiralCtx.beginPath();
    spiralCtx.arc(rotatedX, rotatedY, pointSize, 0, Math.PI * 2);
    spiralCtx.fill();
  }

  requestAnimationFrame(drawSpiral);
}

// Spiral Points Animation
const container = document.getElementById("spiral");
const numberOfPoints = 40;
const radiusSpiral = 250;
const angleIncrement = 0.05;

for (let i = 0; i < numberOfPoints; i++) {
  const angle = angleIncrement * i;
  const x = radiusSpiral * angle * Math.cos(angle);
  const y = radiusSpiral * angle * Math.sin(angle);

  const point = document.createElement("div");
  point.className = "point";
  point.style.transform = `translate(${x}px, ${y}px)`;
  container.appendChild(point);
}

let rotationAngle = 0;

function animateSpiralPoints() {
  rotationAngle += 0.005;
  container.style.transform = `rotate(${rotationAngle}rad)`;
  requestAnimationFrame(animateSpiralPoints);
}

// Additional Functions
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

initializeCircles();
drawCircles();
drawSpiral();
animateSpiralPoints();

window.addEventListener("resize", () => {
  circleCanvas.width = window.innerWidth;
  circleCanvas.height = window.innerHeight;

  spiralCanvas.width = window.innerWidth;
  spiralCanvas.height = window.innerHeight;

  initializeCircles();
});
