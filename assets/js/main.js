// ==========================================================================
// MJPE Tech - Main JS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("MJPE Tech JS chargé avec succès 🚀");

  // 1. Gestion du défilement fluide
  initSmoothScroll();

  // 2. Gestion de l'envoi asynchrone du formulaire
  initContactFormAJAX();
});

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

function initContactFormAJAX() {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("name");

  if (form) {
    form.addEventListener("submit", function (e) {
      // Empêche la redirection vers la page blanche de Formspree
      e.preventDefault();

      // Préparation des données du formulaire
      const formData = new FormData(form);

      // Envoi des données en arrière-plan à Formspree
      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // 1. Tout supprimer (réinitialise le formulaire)
            form.reset();

            // 2. Remettre le curseur (focus) dans le champ Nom
            if (nameInput) {
              nameInput.focus();
            }

            console.log("Message envoyé avec succès !");
          } else {
            alert("Une erreur est survenue lors de l'envoi.");
          }
        })
        .catch((error) => {
          console.error("Erreur réseau :", error);
          alert("Impossible d'envoyer le message pour le moment.");
        });
    });
  }
}
