document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments DOM nécessaires
    const lightbox = document.getElementById('netflix-lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Vérification de l'existence des éléments nécessaires
    if (!lightbox || !lightboxContent || !closeLightbox) {
        return;
    }

    // Fonction pour fermer la lightbox
    function closeLightboxFunction() {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }

    // Sélection de toutes les cartes Netflix
    const netflixCards = document.querySelectorAll('.netflix-card');

    // Vérification de l'existence des cartes Netflix
    if (netflixCards.length === 0) {
        return;
    }

    // Ajout d'un écouteur d'événements pour chaque carte Netflix
    netflixCards.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Vérification de l'existence de l'attribut href
            const href = link.getAttribute('href');
            if (!href) {
                return;
            }

            // Récupération du contenu de la page liée
            fetch(href)
                .then(response => response.text())
                .then(html => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');

                    // Extraction des éléments nécessaires du contenu
                    const titleElement = doc.querySelector('h1');
                    const contentElement = doc.querySelector('.entry-content');
                    const featuredImageElement = doc.querySelector('.wp-post-image');
                    const prestations = doc.querySelector('.prestations');

                    if(prestations){
                        contentElement.querySelectorAll('.prestations').forEach(e => e.remove());
                        prestations.querySelectorAll("a").forEach(link => {
                            //link.href="#";
                            newNode = document.createElement('span');
                            newNode.classList.add('prestation');
                            newNode.innerHTML = link.text;
                            link.replaceWith(newNode);
                        });
                        contentElement.appendChild(prestations);
                    }

                    // Vérification et préparation du contenu
                    const title = titleElement ? titleElement.innerHTML : __('Titre non disponible', 'netflix-like-cards');
                    const content = contentElement ? contentElement.innerHTML : __('Contenu non disponible', 'netflix-like-cards');
                    const featuredImageSrc = featuredImageElement ? featuredImageElement.src : '';
                    
                    

                    // Injection du contenu dans la lightbox
                    lightboxContent.innerHTML = `
                        <div class="lightbox-header" style="background-image: url('${featuredImageSrc}');">
                            <h1>${title}</h1>
                        </div>
                        <div class="lightbox-body">${content}</div>
                    `;
                    
                    // Affichage de la lightbox
                    lightbox.classList.add('active');
                    document.body.classList.add('lightbox-open');
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du contenu pour la lightbox:', error);
                });
        });
    });

    // Ajout d'écouteurs d'événements pour fermer la lightbox
    closeLightbox.addEventListener('click', closeLightboxFunction);

    // Fermeture de la lightbox en cliquant en dehors du contenu
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFunction();
    });

    // Fermeture de la lightbox avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightboxFunction();
    });
});
