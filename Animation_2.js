// Obtention de l'élément canvas et du contexte 2D
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ajustement des dimensions du canvas à la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Paramètres pour l'animation des cercles
const numCircles = 9;
const maxFrames = 500; // Ajuster le nombre d'images pour arrêter l'animation
const circles = [];

// Fonction pour initialiser les cercles avec leurs propriétés
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

// Fonction pour dessiner les points de la spirale
function drawSpiralPoints() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.fillStyle = "#ffffff"; // Couleur des points

  // Paramètres pour les points de la spirale
  const numPoints = 100;
  const spiralDensity = 0.2;
  const rotationSpeed = 0.005;
  const pointSize = 2;

  // Boucle pour dessiner chaque point de la spirale
  for (let i = 0; i < numPoints; i++) {
    // Ajuster le calcul du rayon pour un effet plus spiralé
    const angle = i * spiralDensity;
    const radius = i * 2;

    // Calcul de la position du point
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Application de la rotation au point
    const rotatedX =
      (x - centerX) * Math.cos(rotationSpeed) -
      (y - centerY) * Math.sin(rotationSpeed) +
      centerX;
    const rotatedY =
      (x - centerX) * Math.sin(rotationSpeed) +
      (y - centerY) * Math.cos(rotationSpeed) +
      centerY;

    // Dessin du point sur le canvas
    ctx.beginPath();
    ctx.arc(rotatedX, rotatedY, pointSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Fonction pour dessiner les cercles
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

// Fonction principale pour dessiner et animer les cercles
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

// Fonction pour obtenir une couleur aléatoire en hexadécimal
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Initialisation des cercles et démarrage de l'animation
let frames = 0;
initializeCircles();
draw();

// Gestion du redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initializeCircles();
});
