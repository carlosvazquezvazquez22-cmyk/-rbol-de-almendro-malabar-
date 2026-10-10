// Menú adaptable para celular
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const abierto = navLinks.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", String(abierto));
        menuBtn.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );

        menuBtn.textContent = abierto ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Abrir menú");
            menuBtn.textContent = "☰";
        });
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute("aria-label", "Abrir menú");
            menuBtn.textContent = "☰";
        }
    });
}

// Año automático del pie de página
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// Botón para volver al inicio
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.classList.toggle("visible", window.scrollY > 400);
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Comprobación de las imágenes locales
document.querySelectorAll("img").forEach((imagen) => {
    imagen.addEventListener("error", () => {
        console.warn("No se pudo cargar la imagen:", imagen.getAttribute("src"));
    });
});

console.log("Mundo Almendro está listo 🌿");