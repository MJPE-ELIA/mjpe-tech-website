// ==========================================================================
// MJPE Tech - Main JS (Nettoyé des alertes natives)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("MJPE Tech JS chargé avec succès 🚀");

  // 1. Initialisation du menu responsive (Burger)
  initResponsiveMenu();

  // 2. Gestion du défilement fluide
  initSmoothScroll();

  // 3. Gestion de l'envoi asynchrone du formulaire
  initContactFormAJAX();
});

/**
 * GÈRE L'OUVERTURE ET LA FERMETURE DU MENU BURGER SUR MOBILE
 */
function initResponsiveMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      nav.classList.toggle("open");
    });

    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        nav.classList.remove("open");
      });
    });
  }
}

/**
 * ANIME LE DÉFILEMENT POUR LES LIENS INTERNES ANCRÉS (#)
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
 * ENVOIE LE FORMULAIRE VIA FORMSPREE SANS ALERTE NAVIGATEUR
 */
function initContactFormAJAX() {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("name");

  if (form) {
    // On crée une zone de message dans le DOM juste en dessous du formulaire si elle n'existe pas
    let statusMessage = document.getElementById("form-status");
    if (!statusMessage) {
      statusMessage = document.createElement("p");
      statusMessage.id = "form-status";
      statusMessage.style.marginTop = "20px";
      statusMessage.style.fontWeight = "600";
      statusMessage.style.textAlign = "center";
      statusMessage.style.transition = "all 0.3s ease";
      form.appendChild(statusMessage); // Ajoute le p à la fin du formulaire
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Message de chargement temporaire discret
      statusMessage.style.color = "var(--text-muted)";
      statusMessage.innerText = "Envoi en cours...";

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
            if (nameInput) nameInput.focus();

            // Style Succès : Vert néon
            statusMessage.style.color = "#10b981";
            statusMessage.innerText =
              "✓ Votre message a bien été envoyé à MJPE Tech.";

            // Efface le message automatiquement après 5 secondes
            setTimeout(() => {
              statusMessage.innerText = "";
            }, 5000);
          } else {
            // Style Erreur : Rouge/Orange néon
            statusMessage.style.color = "#f43f5e";
            statusMessage.innerText =
              "✕ Une erreur est survenue. Veuillez réessayer.";
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
          statusMessage.style.color = "#f43f5e";
          statusMessage.innerText =
            "✕ Impossible d'accéder au serveur. Vérifiez votre connexion.";
        });
    });
  }
}
