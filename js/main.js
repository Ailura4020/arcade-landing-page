    
/* =========================================
   POINT D'ENTRÉE PRINCIPAL (MAIN.JS)
   ========================================= */

// 1. On importe le nouveau carrousel (et on retire l'ancien Rack)
import { initCarousel } from './modules/Carousel3D.js'; 
import { gamesData } from './data/gamesData.js';
import { ModalManager } from './modules/ModalManager.js';

document.addEventListener('DOMContentLoaded', () => {
    
    console.log("System Booting...");

    // 2. On initialise le gestionnaire de fenêtres (Modal)
    // C'est cette ligne qui manquait pour "ModalManager"
    ModalManager.init();

    // 3. On lance le CARROUSEL 3D
    // C'est cette ligne qui manquait pour "initCarousel"
    initCarousel(gamesData);
    
    console.log("Arcade Mode: READY 🚀");
});

/* --- Petit utilitaire pour le menu mobile (hérité de l'ancien script) --- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }
}