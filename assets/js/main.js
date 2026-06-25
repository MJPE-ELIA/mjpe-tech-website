// =========================
// MJPE Tech - Main JS
// Version 1
// =========================

// Smooth scroll simple (liens internes si ajoutés plus tard)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Simple interaction log (test de chargement)
console.log("MJPE Tech JS chargé avec succès 🚀");
