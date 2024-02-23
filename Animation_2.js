// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const numCircles = 8;
// const circles = [];

// function initializeCircles() {
//   circles.length = 0;
//   for (let i = 0; i < numCircles; i++) {
//     const radius = 150;
//     const color = getRandomColor();
//     const rotationSpeed = (i + 1) * 0.02;
//     const delay = i * 5;

//     circles.push({ radius, color, rotationSpeed, points: [], delay });
//   }
// }

// function drawSpiralPoints() {
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;

//   ctx.fillStyle = "#ffffff"; // Point color

//   const numPoints = 100;
//   const spiralDensity = 0.2; // Adjust density
//   const rotationSpeed = 0.005; // Adjust rotation speed
//   const pointSize = 2;

//   for (let i = 0; i < numPoints; i++) {
//     const angle = i * spiralDensity;
//     const radius = i * 2; // Adjust size
//     const x = centerX + radius * Math.cos(angle);
//     const y = centerY + radius * Math.sin(angle);

//     const rotatedX =
//       (x - centerX) * Math.cos(rotationSpeed) -
//       (y - centerY) * Math.sin(rotationSpeed) +
//       centerX;
//     const rotatedY =
//       (x - centerX) * Math.sin(rotationSpeed) +
//       (y - centerY) * Math.cos(rotationSpeed) +
//       centerY;

//     ctx.beginPath();
//     ctx.arc(rotatedX, rotatedY, pointSize, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }

// function drawCircles() {
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;

//   circles.forEach((circle) => {
//     if (frames > circle.delay) {
//       ctx.beginPath();
//       ctx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
//       ctx.strokeStyle = circle.color;
//       ctx.lineWidth = 3;
//       ctx.stroke();
//       ctx.closePath();

//       circle.radius += 2 * circle.rotationSpeed;
//     }
//   });
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawSpiralPoints();
//   drawCircles();
//   frames++;
//   requestAnimationFrame(draw);
// }

// function getRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// let frames = 0;
// initializeCircles();
// draw();

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   initializeCircles();
// });

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numCircles = 9;
const maxFrames = 500; // Adjust the number of frames for the animation to stop
const circles = [];

function initializeCircles() {
  circles.length = 0;
  for (let i = 0; i < numCircles; i++) {
    const radius = 50;
    const color = getRandomColor();
    const rotationSpeed = (i + 1) * 0.02;
    const delay = i * 7;

    circles.push({ radius, color, rotationSpeed, points: [], delay });
  }
}

function drawSpiralPoints() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.fillStyle = "#ffffff"; // Point color

  // Parameters for the spiral points
  const numPoints = 100;
  const spiralDensity = 0.2;
  const rotationSpeed = 0.005;
  const pointSize = 2;

  // Loop to draw each point of the spiral
  for (let i = 0; i < numPoints; i++) {
    // Adjust the radius calculation for a more spiral-like effect
    const angle = i * spiralDensity;
    const radius = i * 2;

    // Calculate the position of the point
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Apply rotation to the point
    const rotatedX =
      (x - centerX) * Math.cos(rotationSpeed) -
      (y - centerY) * Math.sin(rotationSpeed) +
      centerX;
    const rotatedY =
      (x - centerX) * Math.sin(rotationSpeed) +
      (y - centerY) * Math.cos(rotationSpeed) +
      centerY;

    // Draw the point on the canvas
    ctx.beginPath();
    ctx.arc(rotatedX, rotatedY, pointSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCircles() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = circle.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSpiralPoints();
  drawCircles();
  if (frames < maxFrames) {
    circles.forEach((circle) => {
      if (frames > circle.delay) {
        circle.radius += 2 * circle.rotationSpeed;
      }
    });
    frames++;
    requestAnimationFrame(draw);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let frames = 0;
initializeCircles();
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initializeCircles();
});
