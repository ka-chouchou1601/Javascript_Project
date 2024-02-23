
// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const numCircles = 4;
// const circles = [];

// function initializeCircles() {
//   for (let i = 0; i < numCircles; i++) {
//     const radius = 30 + i * 20; // Adjust the radius based on the circle's position
//     const color = getRandomColor();
//     const rotationSpeed = Math.random() * 0.02;

//     circles.push({ radius, color, rotationSpeed });
//   }
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;

//   circles.forEach((circle) => {
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
//     ctx.strokeStyle = circle.color;
//     ctx.lineWidth = 3;
//     ctx.stroke();
//     ctx.closePath();

//     const pointCount = Math.floor(circle.radius / 2);

//     for (let i = 0; i < pointCount; i++) {
//       const angle = (i / pointCount) * 2 * Math.PI;
//       const x = centerX + circle.radius * Math.cos(angle);
//       const y = centerY + circle.radius * Math.sin(angle);

//       ctx.beginPath();
//       ctx.arc(x, y, 2, 0, 2 * Math.PI);
//       ctx.fillStyle = "#fff";
//       ctx.fill();
//       ctx.closePath();
//     }

//     circle.radius += 0.5; // Adjust the rate at which the circles grow
//   });

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

// initializeCircles();
// draw();

// // Redraw on window resize
// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   initializeCircles();
// });


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numCircles = 10;
const circles = [];

function initializeCircles() {
  for (let i = 0; i < numCircles; i++) {
    const radius = 30;
    const color = getRandomColor();
    const rotationSpeed = Math.random() * 0.02;
    const delay = i * 10; // Ajout d'un délai pour que les cercles apparaissent en même temps

    circles.push({ radius, color, rotationSpeed, points: [], delay });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  circles.forEach((circle) => {
    // Attend le délai avant de commencer à dessiner le cercle
    if (frames > circle.delay) {
      // Dessine le cercle
      ctx.beginPath();
      ctx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
      //      centerX : La coordonnée x du centre du cercle.
      // centerY : La coordonnée y du centre du cercle.
      // circle.radius : Le rayon du cercle.
      // 0: The starting angle of the arc in radians. In this case, 0 radians corresponds to the rightmost point of the circle.

      // 2 * Math.PI: The ending angle of the arc in radians. 2 * Math.PI represents a full circle, so the arc will go all the way around.
      // Définit la couleur du trait pour le cercle actuel
      ctx.strokeStyle = circle.color;

      // Définit l'épaisseur du trait
      ctx.lineWidth = 3;

      // Dessine le contour du cercle sur le canvas
      ctx.stroke();

      // Ferme le chemin du dessin du cercle
      ctx.closePath();

      // Ajoute des points à l'intérieur du cercle pour former une spirale
      const pointCount = 100; // Nombre de points dans la spirale
      // Parcourt un nombre défini de points pour créer une spirale à l'intérieur du cercle
      for (let i = 0; i < pointCount; i++) {
        // Calcule l'angle en fonction de la vitesse de rotation du cercle
        const angle = i * circle.rotationSpeed;

        // Calcule les coordonnées du point sur la spirale
        const x = centerX + circle.radius * Math.cos(angle);
        const y = centerY + circle.radius * Math.sin(angle);

        // Ajoute les coordonnées du point au tableau 'points' du cercle
        circle.points.push({ x, y });

        // Débute un nouveau chemin pour dessiner le point
        ctx.beginPath();

        // Dessine un cercle de rayon 2 aux coordonnées calculées (x, y)
        ctx.arc(x, y, 2, 0, 2 * Math.PI);

        // Remplit le cercle avec une couleur blanche
        ctx.fillStyle = "#fff";
        ctx.fill();

        // Ferme le chemin du dessin du cercle
        ctx.closePath();
      }

      // Augmente la taille du cercle plus rapidement
      circle.radius += 2;
    }
  });
  // Incrémente le compteur de frames
  frames++;
  // Demande à la prochaine frame d'animation d'être dessinée
  requestAnimationFrame(draw);
}

// Fonction qui génère une couleur hexadécimale aléatoire
function getRandomColor() {
  // Chaîne de caractères contenant les chiffres hexadécimaux
  const letters = "0123456789ABCDEF";

  // Initialise la couleur avec le caractère '#' (symbole d'une couleur hexadécimale)
  let color = "#";

  // Génère une couleur hexadécimale en sélectionnant aléatoirement 6 chiffres hexadécimaux
  for (let i = 0; i < 6; i++) {
    // Sélectionne un chiffre hexadécimal aléatoire et l'ajoute à la couleur
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Renvoie la couleur générée
  return color;
}

// Initialise le compteur de frames
let frames = 0; // Compteur de frames

// Initialise les cercles et lance l'animation
initializeCircles();
draw();

// Redessine le canvas lorsqu'on redimensionne la fenêtre
window.addEventListener("resize", () => {
  // Ajuste la largeur du canvas à la largeur de la fenêtre
  canvas.width = window.innerWidth;

  // Ajuste la hauteur du canvas à la hauteur de la fenêtre
  canvas.height = window.innerHeight;

  // Réinitialise les cercles après le redimensionnement de la fenêtre
  initializeCircles();
  
});


//

// // Récupère l'élément canvas du HTML avec l'ID "myCanvas"
// const canvas = document.getElementById("myCanvas");

// // Récupère le contexte de rendu 2D du canvas
// const ctx = canvas.getContext("2d");

// // Ajuste la largeur du canvas à la largeur de la fenêtre
// canvas.width = window.innerWidth;

// // Ajuste la hauteur du canvas à la hauteur de la fenêtre
// canvas.height = window.innerHeight;

// // Nombre de cercles à afficher
// const numCircles = 10;

// // Tableau qui va stocker les informations sur chaque cercle
// const circles = [];

// // Fonction qui initialise les cercles avec des paramètres aléatoires
// function initializeCircles() {
//   // Boucle pour créer chaque cercle
//   for (let i = 0; i < numCircles; i++) {
//     // Rayon du cercle
//     const radius = 30;

//     // Couleur aléatoire du cercle
//     const color = getRandomColor();

//     // Vitesse de rotation aléatoire du cercle
//     const rotationSpeed = Math.random() * 0.02;

//     // Ajout d'un délai pour que les cercles apparaissent en même temps
//     const delay = i * 10;

//     // Ajoute les propriétés du cercle au tableau 'circles'
//     circles.push({ radius, color, rotationSpeed, points: [], delay });
//   }
// }

// // Fonction qui efface le contenu du canvas à chaque frame
// function draw() {
//   // Efface le contenu actuel du canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Calcule les coordonnées du centre du canvas
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;

//   // Parcourt chaque cercle dans le tableau 'circles'
//   circles.forEach((circle) => {
//     // Attend le délai avant de commencer à dessiner le cercle
//     if (frames > circle.delay) {
//       // Commence un nouveau chemin pour dessiner le cercle
//       ctx.beginPath();

//       ctx.arc(centerX, centerY, circle.radius, 0, 2 * Math.PI);
//       //      centerX : La coordonnée x du centre du cercle.
//       // centerY : La coordonnée y du centre du cercle.
//       // circle.radius : Le rayon du cercle.
//       // 0: The starting angle of the arc in radians. In this case, 0 radians corresponds to the rightmost point of the circle.

//       // 2 * Math.PI: The ending angle of the arc in radians. 2 * Math.PI represents a full circle, so the arc will go all the way around.
//       // Définit la couleur du trait pour le cercle actuel
//       ctx.strokeStyle = circle.color;

//       // Définit l'épaisseur du trait
//       ctx.lineWidth = 3;

//       // Dessine le contour du cercle sur le canvas
//       ctx.stroke();

//       // Ferme le chemin du dessin du cercle
//       ctx.closePath();

//       // Ajoute des points à l'intérieur du cercle pour former une spirale
//       const pointCount = 100; // Nombre de points dans la spirale
//       // Parcourt un nombre défini de points pour créer une spirale à l'intérieur du cercle
//       for (let i = 0; i < pointCount; i++) {
//         // Calcule l'angle en fonction de la vitesse de rotation du cercle
//         const angle = i * circle.rotationSpeed;

//         // Calcule les coordonnées du point sur la spirale
//         const x = centerX + circle.radius * Math.cos(angle);
//         const y = centerY + circle.radius * Math.sin(angle);

//         // Ajoute les coordonnées du point au tableau 'points' du cercle
//         circle.points.push({ x, y });

//         // Débute un nouveau chemin pour dessiner le point
//         ctx.beginPath();

//         // Dessine un cercle de rayon 2 aux coordonnées calculées (x, y)
//         ctx.arc(x, y, 2, 0, 2 * Math.PI);

//         // Remplit le cercle avec une couleur blanche
//         ctx.fillStyle = "#fff";
//         ctx.fill();

//         // Ferme le chemin du dessin du cercle
//         ctx.closePath();
//       }

//       // Augmente la taille du cercle plus rapidement
//       circle.radius += 2;
//     }
//   });
//   // Incrémente le compteur de frames
//   frames++;
//   // Demande à la prochaine frame d'animation d'être dessinée
//   requestAnimationFrame(draw);
// }

// // Fonction qui génère une couleur hexadécimale aléatoire
// function getRandomColor() {
//   // Chaîne de caractères contenant les chiffres hexadécimaux
//   const letters = "0123456789ABCDEF";

//   // Initialise la couleur avec le caractère '#' (symbole d'une couleur hexadécimale)
//   let color = "#";

//   // Génère une couleur hexadécimale en sélectionnant aléatoirement 6 chiffres hexadécimaux
//   for (let i = 0; i < 6; i++) {
//     // Sélectionne un chiffre hexadécimal aléatoire et l'ajoute à la couleur
//     color += letters[Math.floor(Math.random() * 16)];
//   }

//   // Renvoie la couleur générée
//   return color;
// }

// // Initialise le compteur de frames
// let frames = 0; // Compteur de frames

// // Initialise les cercles et lance l'animation
// initializeCircles();
// draw();

// // Redessine le canvas lorsqu'on redimensionne la fenêtre
// window.addEventListener("resize", () => {
//   // Ajuste la largeur du canvas à la largeur de la fenêtre
//   canvas.width = window.innerWidth;

//   // Ajuste la hauteur du canvas à la hauteur de la fenêtre
//   canvas.height = window.innerHeight;

//   // Réinitialise les cercles après le redimensionnement de la fenêtre
//   initializeCircles();
// });











