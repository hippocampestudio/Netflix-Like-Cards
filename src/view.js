// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les carousels Netflix-like sur la page
    const carousels = document.querySelectorAll('.wp-block-create-block-netflix-like-cards');
    
    // Pour chaque carousel trouvé
    carousels.forEach(carousel => {
        // Sélectionne les éléments nécessaires dans le carousel
        const container = carousel.querySelector('.netflix-like-carousel');
        const leftArrow = carousel.querySelector('.carousel-arrow.left');
        const rightArrow = carousel.querySelector('.carousel-arrow.right');
  
        // Fonction pour mettre à jour la visibilité des flèches
        const updateArrowVisibility = () => {
          // Vérifie si le scroll est au début (avec une petite marge d'erreur)
          const isAtStart = container.scrollLeft <= 30;
          // Vérifie si le scroll est à la fin (avec une petite marge d'erreur)
          const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
          
          // Affiche ou cache la flèche gauche en fonction de la position
          leftArrow.style.display = isAtStart ? 'none' : 'block';
          // Affiche ou cache la flèche droite en fonction de la position
          rightArrow.style.display = isAtEnd ? 'none' : 'block';
        };
      
        // Si les flèches gauche et droite existent
        if (leftArrow && rightArrow) {
            // Ajoute un écouteur d'événement pour le clic sur la flèche gauche
            leftArrow.addEventListener('click', () => {
                // Fait défiler le contenu vers la gauche de 200px avec une animation fluide
                container.scrollBy({ left: -200, behavior: 'smooth' });
            });
  
            // Ajoute un écouteur d'événement pour le clic sur la flèche droite
            rightArrow.addEventListener('click', () => {
                // Fait défiler le contenu vers la droite de 200px avec une animation fluide
                container.scrollBy({ left: 200, behavior: 'smooth' });
            });
  
            // Ajoute un écouteur d'événement pour le défilement du contenu
            container.addEventListener('scroll', updateArrowVisibility);
            
            // Met à jour la visibilité des flèches après un court délai pour s'assurer que le contenu est chargé
            setTimeout(updateArrowVisibility, 100);
        }
    });
});
