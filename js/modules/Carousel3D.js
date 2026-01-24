/* =========================================
   MODULE : CAROUSEL 3D INFINI & DYNAMIQUE
   ========================================= */
import { ModalManager } from './ModalManager.js';

export function initCarousel(gamesData) {
    const container = document.getElementById('showcase');
    const bgContainer = document.getElementById('dynamic-bg'); // On récupère la div du fond
    
    if (!container) return;

    // 1. Structure HTML du Carrousel (Scène + Contrôles)
    container.innerHTML = `
        <div class="carousel-stage">
            <div class="carousel-track">
                </div>
            
            <div class="carousel-controls">
                <button id="prev-btn" class="nav-btn">◀</button>
                <div class="carousel-indicators"></div>
                <button id="next-btn" class="nav-btn">▶</button>
            </div>
        </div>
    `;

    const track = container.querySelector('.carousel-track');
    const indicatorsContainer = container.querySelector('.carousel-indicators');
    let currentIndex = 0;
    const items = [];

    // 2. GÉNÉRATION DES BOITES (DESIGN SPLIT 60/40)
    gamesData.forEach((game, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        
        // Structure HTML de la Boîte 3D
        item.innerHTML = `
            <div class="sega-box-3d">
                <div class="box-face face-front">
                    
                    <div class="box-poster">
                        <img src="${game.poster || 'assets/images/no-cover.jpg'}" alt="${game.title}" class="cover-img">
                        <div class="shine-effect"></div>
                    </div>

                    <div class="box-interface">
                        <div class="info-row">
                            <h3 class="game-title">${game.title}</h3>
                            <span class="game-meta">${game.year || '2026'} • ${game.dev}</span>
                        </div>
                        <div class="action-row">
                            <span class="tag-badge">${game.tag}</span>
                            <button class="btn-start">START</button>
                        </div>
                    </div>

                </div>
                <div class="box-face face-side"></div>
                <div class="box-face face-top"></div>
            </div>
        `;

        // Interaction Clic (Mise à jour)
    item.addEventListener('click', (e) => {
        if (currentIndex === index) {
            if(e.target.closest('.btn-start')) {
                
                // 1. Déclencher l'effet "Balayage"
                container.querySelector('.carousel-stage').classList.add('focus-mode');
                
                // 2. Ouvrir la modale (avec un petit délai pour laisser l'anim se faire)
                setTimeout(() => {
                    ModalManager.open(game);
                }, 100); // 100ms de délai
            }
        } else {
            rotateTo(index);
        }
    });

        track.appendChild(item);
        items.push(item);

        // Création des points indicateurs
        const dot = document.createElement('div');
        dot.className = 'indicator-dot';
        dot.addEventListener('click', () => rotateTo(index));
        indicatorsContainer.appendChild(dot);
    });

    // 3. FONCTION DE NAVIGATION (BOUCLE INFINIE)
    function rotateTo(index) {
        // Gestion de la boucle (Circular Buffer)
        // Si on va trop à gauche (<0), on va à la fin.
        // Si on va trop à droite (>=length), on revient au début.
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        
        currentIndex = index;
        updateVisuals();
        updateBackground(gamesData[currentIndex]); // Change le fond d'écran
    }

    // 4. MISE A JOUR VISUELLE (CLASSES CSS)
    function updateVisuals() {
        items.forEach((item, i) => {
            item.className = 'carousel-item'; // Reset des classes
            
            // Calcul de la distance relative pour la boucle
            let diff = i - currentIndex;
            if (diff > items.length / 2) diff -= items.length;
            if (diff < -items.length / 2) diff += items.length;

            // Attribution des classes selon la position
            if (diff === 0) item.classList.add('is-center');
            else if (diff === -1) item.classList.add('is-left');
            else if (diff === 1) item.classList.add('is-right');
            else if (diff < 0) item.classList.add('is-hidden-left');
            else item.classList.add('is-hidden-right');
        });

        // Mise à jour des points (dots)
        const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // 5. FONCTION BACKGROUND DYNAMIQUE (V2 : Support Vidéo)
    function updateBackground(game) {
        if(!bgContainer) return;
        
        // Logique : Si le jeu a une vidéo, on l'affiche. Sinon, on garde le poster.
        // On ajoute 'muted' et 'autoplay' pour que ça se lance tout seul.
        const mediaHtml = game.video 
            ? `<video src="${game.video}" autoplay loop muted playsinline class="bg-media fade-in"></video>`
            : `<img src="${game.poster}" class="bg-media fade-in" alt="">`;
            
        bgContainer.innerHTML = mediaHtml;
    }

    // --- ÉCOUTEURS D'ÉVÉNEMENTS (BOUTONS & CLAVIER) ---
    
    // Boutons Flèches écran
    container.querySelector('#prev-btn').addEventListener('click', () => rotateTo(currentIndex - 1));
    container.querySelector('#next-btn').addEventListener('click', () => rotateTo(currentIndex + 1));
    
    // Flèches Clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') rotateTo(currentIndex - 1);
        if (e.key === 'ArrowRight') rotateTo(currentIndex + 1);
        if (e.key === 'Enter') ModalManager.open(gamesData[currentIndex]);
    });

    // Lancement initial
    rotateTo(0);
    document.addEventListener('modal-closed', () => {
        const stage = container.querySelector('.carousel-stage');
        if(stage) stage.classList.remove('focus-mode');
    });
}