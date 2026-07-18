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
