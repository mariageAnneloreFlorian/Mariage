// Petit effet d'apparition progressive
window.addEventListener("scroll", () => {
    let elements = document.querySelectorAll(".carte");
    elements.forEach((el) => {
        let position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});

// === Décor floral : marguerites + feuilles réparties sur toute la page ===

const svgMarguerite = `
<svg width="55" height="55" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
  <g>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(51 22.5 22.5)"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(102 22.5 22.5)"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(153 22.5 22.5)"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(204 22.5 22.5)"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(255 22.5 22.5)"/>
    <ellipse cx="22.5" cy="8" rx="5.5" ry="10" fill="#ffffff" stroke="#d9a8b5" stroke-width="1.2" transform="rotate(306 22.5 22.5)"/>
    <circle cx="22.5" cy="22.5" r="7" fill="#e8b968"/>
  </g>
</svg>`;

const svgFeuille = `
<svg width="48" height="48" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 2 C32 10, 32 30, 20 38 C8 30, 8 10, 20 2 Z" fill="#9fc2a4" stroke="#7fa885" stroke-width="1.2"/>
  <line x1="20" y1="4" x2="20" y2="36" stroke="#7fa885" stroke-width="1"/>
</svg>`;

function genererDecorFloral() {
    const conteneur = document.getElementById("decorFloral");
    if (!conteneur) return;

    conteneur.innerHTML = "";
    const hauteurPage = document.body.scrollHeight;
    conteneur.style.height = hauteurPage + "px";

    const nombreElements = Math.floor(hauteurPage / 220); // densité

    for (let i = 0; i < nombreElements; i++) {
        const estMarguerite = Math.random() > 0.45;
        const el = document.createElement("div");
        el.className = estMarguerite ? "marguerite" : "feuille";
        el.innerHTML = estMarguerite ? svgMarguerite : svgFeuille;

        // Position : alterne bords gauche/droite, dispersion plus large
        const cote = Math.random() > 0.5 ? "left" : "right";
        const decalageBord = 5 + Math.random() * 130; // px depuis le bord
        el.style[cote] = decalageBord + "px";

        el.style.top = (i * (hauteurPage / nombreElements) + Math.random() * 100) + "px";

        const taille = 0.6 + Math.random() * 0.9;
        el.style.transform = `scale(${taille})`;

        el.style.animationDelay = (Math.random() * 5) + "s";
        el.style.animationDuration = (5 + Math.random() * 4) + "s";

        conteneur.appendChild(el);
    }
}

// Génère au chargement, et régénère une fois les images chargées (hauteur de page stable)
window.addEventListener("load", () => {
    genererDecorFloral();
    setTimeout(genererDecorFloral, 800);
});
window.addEventListener("resize", genererDecorFloral);
// ============================================================
// COMPTE À REBOURS jusqu'au 19 juin 2027
// ============================================================
function demarrerCompteARebours() {
    const elJours = document.getElementById("cr-jours");
    const elHeures = document.getElementById("cr-heures");
    const elMinutes = document.getElementById("cr-minutes");
    const elSecondes = document.getElementById("cr-secondes");

    if (!elJours || !elHeures || !elMinutes || !elSecondes) return;

    // Date du mariage : 19 juin 2027, à 00h00 heure locale.
    // Modifiez l'heure ici si besoin, ex : new Date("2027-06-19T14:00:00")
    const dateMariage = new Date("2027-06-19T00:00:00");

    function mettreAJour() {
        const maintenant = new Date();
        let ecart = dateMariage - maintenant;

        if (ecart <= 0) {
            elJours.textContent = "00";
            elHeures.textContent = "00";
            elMinutes.textContent = "00";
            elSecondes.textContent = "00";
            clearInterval(intervalle);
            return;
        }

        const jours = Math.floor(ecart / (1000 * 60 * 60 * 24));
        const heures = Math.floor((ecart / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((ecart / (1000 * 60)) % 60);
        const secondes = Math.floor((ecart / 1000) % 60);

        elJours.textContent = String(jours).padStart(2, "0");
        elHeures.textContent = String(heures).padStart(2, "0");
        elMinutes.textContent = String(minutes).padStart(2, "0");
        elSecondes.textContent = String(secondes).padStart(2, "0");
    }

    mettreAJour();
    const intervalle = setInterval(mettreAJour, 1000);
}

window.addEventListener("DOMContentLoaded", demarrerCompteARebours);
