// ==========================================================================
// MJPE Tech - Main JS
// Version 1.1 - Interactions & Dynamisme
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("MJPE Tech JS chargé avec succès 🚀");

  // 1. Défilement fluide pour les ancres internes (#)
  initSmoothScroll();

  // 2. Mise en avant de la page active dans le menu de navigation
  highlightCurrentPage();

  // 3. Animation et validation basique du formulaire de contact
  initContactForm();
});

/**
 * Gère le défilement fluide lors d'un clic sur un lien d'ancre interne
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/**
 * Ajoute une classe "active" au lien de la navigation qui correspond à la page actuelle
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach((link) => {
    // Récupère juste le nom du fichier (ex: index.html ou contact.html)
    const linkPath = link.getAttribute("href");

    if (
      currentPath.includes(linkPath) ||
      (currentPath === "/" && linkPath === "index.html")
    ) {
      link.style.color = "#22d3ee";
      link.style.fontWeight = "700";
    }
  });
}

/**
 * Gère les interactions et la validation du formulaire de contact
 */
function initContactForm() {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      // Pour l'instant, on bloque l'envoi réel pour afficher une jolie alerte
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (name && email) {
        // Création d'un message de remerciement dynamique
        alert(
          `Merci pour votre message, ${name} ! L'équipe de MJPE Tech vous répondra rapidement à l'adresse : ${email}.`,
        );

        // Réinitialise le formulaire
        form.reset();
      }
    });
  }
}
