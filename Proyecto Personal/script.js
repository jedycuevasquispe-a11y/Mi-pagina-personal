document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // MENÚ RESPONSIVE
    // =====================================

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            const abierto = navMenu.classList.toggle("open");

            menuBtn.setAttribute("aria-expanded", abierto);
            menuBtn.textContent = abierto ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "☰";
            });
        });
    }
// =====================================
// CAMBIAR TEMA CLARO Y OSCURO
// =====================================

const themeBtn = document.getElementById("themeBtn");  

if (themeBtn) {  
    themeBtn.addEventListener("click", () => {  
        document.body.classList.toggle("light");  

        const temaClaro = document.body.classList.contains("light");  
        themeBtn.textContent = temaClaro ? "🌙" : "☀️";  
    });  
}  
    // =====================================
    // FILTROS DE MIS GUSTOS
    // =====================================

    const botonesFiltro = document.querySelectorAll(".filter-btn");
    const favoritos = document.querySelectorAll(".favorito");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {

            botonesFiltro.forEach(b => b.classList.remove("active"));
            boton.classList.add("active");

            const categoria = boton.dataset.categoria;

            favoritos.forEach(tarjeta => {
                const mostrar =
                    categoria === "todos" ||
                    tarjeta.dataset.categoria === categoria ||
                    tarjeta.dataset.categoria === "todos";

                tarjeta.classList.toggle("oculto", !mostrar);
            });
        });
    });


    // =====================================
    // CARRUSEL DE FONDO DEL ENCABEZADO
    // =====================================

    const heroTrack = document.getElementById("heroTrack");
    const heroSlides = document.querySelectorAll(".hero-background-slide");
    const heroPrev = document.getElementById("prevBtn");
    const heroNext = document.getElementById("nextBtn");
    const heroIndicators = document.getElementById("heroIndicators");

    let heroIndex = 0;
    let heroTimer = null;

    if (
        heroTrack &&
        heroSlides.length > 0 &&
        heroPrev &&
        heroNext &&
        heroIndicators
    ) {

        // Crear indicadores para cada fotografía
        heroIndicators.innerHTML = "";

        heroSlides.forEach((slide, index) => {
            const indicador = document.createElement("button");

            indicador.className = "hero-indicator";
            indicador.setAttribute(
                "aria-label",
                'Mostrar fotografía ${index + 1}'
            );

            indicador.addEventListener("click", () => {
                mostrarHeroSlide(index);
                iniciarHeroCarrusel();
            });

            heroIndicators.appendChild(indicador);
        });

        const heroDots =
            heroIndicators.querySelectorAll(".hero-indicator");


        // Mostrar fotografía seleccionada
        function mostrarHeroSlide(index) {

            heroIndex =
                (index + heroSlides.length) % heroSlides.length;

            heroTrack.style.transform =
                'translateX(-${heroIndex * 100}%)';

            heroDots.forEach((dot, i) => {
                dot.classList.toggle("active", i === heroIndex);
            });
        }


        // Avanzar a la siguiente fotografía
        function siguienteHeroSlide() {
            mostrarHeroSlide(heroIndex + 1);
        }


        // Retroceder a la fotografía anterior
        function anteriorHeroSlide() {
            mostrarHeroSlide(heroIndex - 1);
        }


        // Reiniciar el movimiento automático
        function iniciarHeroCarrusel() {
            clearInterval(heroTimer);

            heroTimer = setInterval(() => {
                siguienteHeroSlide();
            }, 4000);
        }


        // Botón anterior
        heroPrev.addEventListener("click", () => {
            anteriorHeroSlide();
            iniciarHeroCarrusel();
        });


        // Botón siguiente
        heroNext.addEventListener("click", () => {
            siguienteHeroSlide();
            iniciarHeroCarrusel();
        });


        // Iniciar carrusel
        mostrarHeroSlide(0);
        iniciarHeroCarrusel();

    } else {
        console.warn(
            "No se encontraron todos los elementos del carrusel."
        );
    }


    // =====================================
    // FORMULARIO DE CONTACTO POR WHATSAPP
    // =====================================

    const contactForm = document.getElementById("contactForm");
    const alerta = document.getElementById("alerta");

    if (contactForm) {

        contactForm.addEventListener("submit", evento => {
            evento.preventDefault();

            const nombre = document
                .getElementById("nombre")
                .value.trim();

            const mensaje = document
                .getElementById("mensaje")
                .value.trim();

            if (nombre.length < 2 || mensaje.length < 2) {

                if (alerta) {
                    alerta.textContent =
                        "Por favor, completa correctamente los campos.";
                }

                return;
            }

            const miNumero = "59171992465";

            const texto =
                'Hola Jedy, soy ${nombre}. ${mensaje}';

            const url =
                'https://wa.me/${miNumero}?text=${encodeURIComponent(texto)}';

            window.open(url, "_blank");

            if (alerta) {
                alerta.textContent =
                    "Se abrió WhatsApp para enviar tu mensaje.";
            }
        });
    }

});