/* 
   Nom du fichier : header-scripts.js
   Auteur : Lady Quintero
   Date de création : Septembre - Octobre 2023
   Description : Ce script gère le comportement du menu burger mobile, la fermeture du menu, 
   et la navigation des photos uniques (survol) sur le site.
*/
// MENU BURGER MOBILE
// Gérer le clic sur le bouton d'ouverture du menu
$('#open-fullscreen-menu-button').click(function(e) {
    e.stopPropagation(); // Empêche la propagation de l'événement pour éviter la fermeture
    $('header').toggleClass('mobile-menu-opened');
    console.log('BOUTON CLIQUÉ!');
});

// FERMER MENU - CLIQUER SUR LE BOUTON DE FERMETURE
// Gérer le clic sur le bouton de fermeture du menu
$('#close-fullscreen-menu-button').click(function() {
    $('header').removeClass('mobile-menu-opened');
    console.log('MENU FERMÉ!');
});

// Fermer le menu lors d'un clic en dehors de celui-ci
$(document).click(function(event) {
    if (!$('header').has(event.target).length && !$('header').is(event.target)) {
        $('header').removeClass('mobile-menu-opened');
        // console.log('MENU FERMÉ!');
    }
});

// PHOTO UNIQUE - NAVIGATION DES PHOTOS (SURVOL)
if( $('.right-container').length ){
    // Mise en cache des éléments fréquemment utilisés
    const wrapper = document.querySelector('.thumbnail-wrapper');
    const prevArrowLink = document.getElementById('prev-arrow-link');
    const nextArrowLink = document.getElementById('next-arrow-link');

    // Crée un objet Image pour précharger la vignette actuelle
    const currentThumbnailPreloader = new Image();
    const currentThumbnailURL = document.querySelector('.right-container a.photo img').getAttribute('src');
    currentThumbnailPreloader.src = currentThumbnailURL;
    currentThumbnailPreloader.onload = function () {
        preloadCurrentThumbnail(); // Déclenche le chargement initial après la précharge
    };

    // Charge et affiche une vignette
    function loadThumbnail(thumbnailURL) {
        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailURL;
        
        // Efface le contenu existant dans le 'container'
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        
        // Ajoute la vignette au 'container'
        wrapper.appendChild(thumbnail);
    }

    // Précharge et affiche la vignette de l'article actuel
    function preloadCurrentThumbnail() {
        loadThumbnail(currentThumbnailURL);
    }

    // Gestion des événements pour le survol de la souris
    function handleMouseover(direction) {
        const arrowLink = (direction === 'prev') ? prevArrowLink : nextArrowLink;
        const thumbnailURL = arrowLink.getAttribute('data-thumbnail');
        loadThumbnail(thumbnailURL);
    }

    // Gestion des événements pour le départ de la souris
    function handleMouseout() {
        preloadCurrentThumbnail();
    }

    // Déclenche la précharge de la vignette de l'article actuel lorsque la page se charge
    window.addEventListener('load', preloadCurrentThumbnail);

    // Attache des écouteurs d'événements en utilisant la délégation d'événements
    prevArrowLink.addEventListener('mouseover', () => handleMouseover('prev'));
    nextArrowLink.addEventListener('mouseover', () => handleMouseover('next'));
    prevArrowLink.addEventListener('mouseout', handleMouseout);
    nextArrowLink.addEventListener('mouseout', handleMouseout);
}