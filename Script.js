// Petit effet d'apparition progressive

window.addEventListener("scroll",()=>{

    let elements=document.querySelectorAll(".carte");

    elements.forEach((el)=>{

        let position=el.getBoundingClientRect().top;

        if(position < window.innerHeight-100){

            el.style.opacity="1";
            el.style.transform="translateY(0)";

        }

    });

});
// Pétales flottants
const conteneurPetales = document.getElementById("petales");
const couleurs = ["#f4bec9", "#dcc9e8", "#eecfae", "#c4dac7"];

function creerPetale() {
    const petale = document.createElement("div");
    petale.classList.add("petale");
    petale.style.left = Math.random() * 100 + "vw";
    petale.style.background = couleurs[Math.floor(Math.random() * couleurs.length)];
    petale.style.animationDuration = 8 + Math.random() * 8 + "s";
    petale.style.width = petale.style.height = 8 + Math.random() * 8 + "px";
    conteneurPetales.appendChild(petale);
    setTimeout(() => petale.remove(), 16000);
}

setInterval(creerPetale, 1200);
