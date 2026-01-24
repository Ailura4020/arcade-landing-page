/* =========================================
   POINT D'ENTRÉE PRINCIPAL (MAIN.JS)
   ========================================= */
import { initCarousel } from './modules/Carousel3D.js';
import { ModalManager } from './modules/ModalManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    console.log("System Booting...");

    // 1. Initialisation des composants statiques
    ModalManager.init();
    initMobileMenu(); // Gestion du menu burger

    // 2. Chargement des données JEUX depuis le JSON (Fetch)
    try {
        // On va chercher le fichier à la racine
        const response = await fetch('./data/games.json');
        
        // On vérifie si le fichier existe bien
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // On convertit la réponse en données utilisables
        const gamesData = await response.json();
        
        // 3. On lance le Carrousel avec ces données
        initCarousel(gamesData);
        console.log("Arcade Mode: READY 🚀 - Data loaded from JSON");

    } catch (error) {
        console.error("ERREUR CRITIQUE : Impossible de charger les jeux.", error);
        // Ici, on pourrait afficher un message d'erreur à l'écran pour l'utilisateur
        document.getElementById('showcase').innerHTML = `<p style="color:red; text-align:center;">ERROR: DATA CORRUPTED (Check JSON)</p>`;
    }
});

/* --- Petit utilitaire pour le menu mobile --- */
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