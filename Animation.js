// Récupère le canvas et son contexte
const canvas = document.getElementById("Canvas"); // Récupère le canvas à partir de son ID
const ctx = canvas.getContext("2d"); // Récupère le contexte de rendu 2D du canvas

// Ajuste la largeur du canvas à la largeur de la fenêtre (window)
canvas.width = window.innerWidth; // Définit la largeur du canvas à la largeur de la fenêtre
// Ajuste la hauteur du canvas à la hauteur de la fenêtre (window)
canvas.height = window.innerHeight; // Définit la hauteur du canvas à la hauteur de la fenêtre

// Crée un dégradé de couleur pour le fond du canvas
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); // Crée un dégradé de couleur linéaire en utilisant les dimensions du canvas
gradient.addColorStop(0, "#001933"); // Ajoute un arrêt de couleur au dégradé (couleur foncée)

// Initialise les propriétés de chaque cercle dans le tableau
const circles = []; // Tableau pour stocker les cercles

// Vitesse de changement de couleur
const colorChangeSpeed = 0.01;

// Variable pour vérifier si tous les cercles sont apparus
let allCirclesCreated = false;

// Nombre de spirales
const numSpirals = 5;

// Définit la couleur de fond du canvas
ctx.fillStyle = "#000821";

// Fonction pour dessiner et animer les éléments sur le canvas
function draw() {
  // Remplit le canvas avec le dégradé de couleur
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Dessine un rectangle plein couvrant toute la zone du canvas

  // Vérifie si tous les cercles sont apparus
  if (circles.length === 30 && !allCirclesCreated) {
    allCirclesCreated = true;
    // Lance l'animation des couleurs
    animateColors();
  }

  // Dessine et anime chaque cercle dans le tableau
  circles.forEach((circle) => {
    // Dessine les cercles concentriques
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI); // Dessine un cercle à la position (x, y) avec le rayon spécifié
    ctx.strokeStyle = `hsl(${
      (circle.colorChange += colorChangeSpeed) * 360
    }, 70%, 50%)`; // Définit la couleur du contour du cercle en fonction de la couleur changeante
    ctx.lineWidth = 2; // Définit l'épaisseur de la ligne du contour du cercle
    ctx.stroke(); // Trace le contour du cercle

    // Dessine les points sur les spirales avec rotation
    for (let i = 0; i < numSpirals; i++) {
      const spiralAngle = circle.angle + (i * Math.PI * 2) / numSpirals; // Calcule l'angle pour la position du point sur la spirale
      const x = circle.x + circle.radius * Math.cos(spiralAngle); // Calcule la coordonnée x du point sur la spirale
      const y = circle.y + circle.radius * Math.sin(spiralAngle); // Calcule la coordonnée y du point sur la spirale

      ctx.beginPath();
      ctx.arc(x, y, circle.pointRadius, 0, 2 * Math.PI); // Dessine un cercle (point) à la position calculée (x, y)
      ctx.fillStyle = "white"; // Définit la couleur de remplissage du point
      ctx.fill(); // Remplit le point avec la couleur définie
    }

    // Met à jour l'angle et le rayon du point pour l'animation avec rotation
    circle.angle += circle.speed;
    circle.pointRadius += circle.pointSpeed;

    // Inverse la direction de l'animation lorsque le rayon atteint des limites
    if (circle.pointRadius > 5 || circle.pointRadius < 1) {
      circle.pointSpeed = -circle.pointSpeed;
    }
  });

  // Appelle la fonction de dessin de manière récursive pour créer une animation fluide
  requestAnimationFrame(draw);
}

// Fonction pour l'animation aléatoire des couleurs
function animateColors() {
  circles.forEach((circle) => {
    circle.colorChange = Math.random();
  });
}

// Fonction pour ajouter un nouveau cercle avec un nombre initial de points et une rotation
function addCircle() {
  const newCircle = {
    x: canvas.width / 2, // Position x du cercle au centre horizontal du canvas
    y: canvas.height / 2, // Position y du cercle au centre vertical du canvas
    radius: 10 + circles.length * 7, // Rayon du cercle, augmenté pour chaque nouveau cercle ajouté
    speed: 0.02 * (circles.length + 1), // Vitesse de rotation du cercle
    angle: 0, // Angle initial du cercle pour l'animation des points sur la spirale
    pointRadius: 2, // Rayon initial des points sur la spirale
    pointSpeed: 0.000025 * (circles.length + 1), // Vitesse de déplacement des points sur la spirale
    colorChange: Math.random(), // Valeur initiale pour le changement de couleur du cercle
  };

  circles.push(newCircle); // Ajoute le nouveau cercle au tableau de cercles

  // Ajoute un nouveau cercle jusqu'à ce que le nombre total atteigne 30
  if (circles.length < 30) {
    setTimeout(addCircle, 400); // Ajoute un nouveau cercle chaque 0,4 seconde
  }
}

// Appelle la fonction d'ajout de cercles après 0,4 seconde pour démarrer l'animation
setTimeout(addCircle, 400);

// Appelle la fonction de dessin pour démarrer l'animation
draw();


//--
