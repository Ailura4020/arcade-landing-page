/* =========================================
   MODULE : GESTIONNAIRE DE MODALE (FINAL V1)
   ========================================= */
export const ModalManager = {
    overlay: null,

    init() {
        this.overlay = document.getElementById('game-modal');
        if(!this.overlay) return;

        this.overlay.innerHTML = `
            <div class="sega-box-open" id="sega-box">
                <div class="close-cross" id="m-close">✕</div>

                <div class="box-left-panel">
                    <div class="cover-back-manual">
                        <div class="manual-paper-effect">
                            
                            <div class="manual-header">
                                <div class="header-top">
                                    <span class="doc-id">DOC_ID: <span id="m-year">2026</span></span>
                                    <span class="doc-class">CLASSIFIED</span>
                                </div>
                                <h2 class="manual-title" id="m-title">TITRE DU JEU</h2>
                            </div>

                            <div class="manual-body">
                                <div class="manual-section">
                                    <h3 class="section-label">MISSION BRIEFING</h3>
                                    <p id="m-desc" class="briefing-text">Description...</p>
                                </div>

                                <div class="manual-grid">
                                    <div class="grid-item">
                                        <span class="label">DEVELOPER</span>
                                        <span class="value" id="m-dev">STUDIO</span>
                                    </div>
                                    <div class="grid-item">
                                        <span class="label">CATEGORY</span>
                                        <span class="value" id="m-tag">GENRE</span>
                                    </div>
                                    <div class="grid-item">
                                        <span class="label">PLAYERS</span>
                                        <span class="value">1-2</span>
                                    </div>
                                    <div class="grid-item">
                                        <span class="label">RATING</span>
                                        <span class="value">★★★★★</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="manual-footer">
                               PIXEL_FORGE ENTERTAINMENT SYSTEM
                            </div>

                        </div>
                    </div>
                </div>

                <div class="box-right-panel">
                    <div class="cartridge-shape">
                        <div class="cartridge-sticker">
                            <img id="m-sticker-img" class="sticker-img" src="" alt="">
                            <video id="m-video" class="modal-video" loop playsinline muted></video>
                        </div>
                    </div>
                    <button class="insert-coin-btn">START GAME</button>
                </div>
            </div>
        `;
        
        // Events
        this.overlay.querySelector('#m-close').addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open(game) {
        if(!this.overlay) return;

        // Remplissage TEXTE
        this.overlay.querySelector('#m-title').textContent = game.title;
        this.overlay.querySelector('#m-desc').textContent = game.description;
        this.overlay.querySelector('#m-dev').textContent = game.dev;
        this.overlay.querySelector('#m-year').textContent = game.year || 'Unknown';
        this.overlay.querySelector('#m-tag').textContent = game.tag;

        // GESTION VIDÉO vs IMAGE
        const videoEl = this.overlay.querySelector('#m-video');
        const imgEl = this.overlay.querySelector('#m-sticker-img');

        if(game.video) {
            // Cas 1 : Il y a une vidéo
            imgEl.style.display = 'none';   // On cache l'image
            videoEl.style.display = 'block'; // On affiche la vidéo
            videoEl.src = game.video;
            videoEl.muted = false;
            videoEl.play().catch(() => {});
        } else {
            // Cas 2 : Pas de vidéo -> On affiche le "Sticker" (Image)
            videoEl.style.display = 'none';
            videoEl.src = "";
            
            imgEl.src = game.poster;      // On met le poster comme étiquette
            imgEl.style.display = 'block';
        }

        this.overlay.classList.add('active');
        this.overlay.querySelector('#m-tag').textContent = game.tag;

// --- GESTION DES LIENS SOCIAUX ---
const socialContainer = this.overlay.querySelector('.manual-footer');
// On vide le footer (on enlève le texte "PIXEL_FORGE SYSTEM..." par défaut)
socialContainer.innerHTML = ''; 

if (game.links) {
    // Si on a des liens, on crée des boutons
    Object.entries(game.links).forEach(([key, url]) => {
        const linkBtn = document.createElement('a');
        linkBtn.href = url;
        linkBtn.target = "_blank"; // Ouvrir dans un nouvel onglet
        linkBtn.className = `social-link-btn ${key}`; // ex: social-link-btn github
        linkBtn.textContent = key.toUpperCase(); // GITHUB, WEB...
        socialContainer.appendChild(linkBtn);
    });
} else {
    // Si pas de lien, on remet le texte par défaut
    socialContainer.textContent = "PIXEL_FORGE ENTERTAINMENT SYSTEM";
}
    },

    close() {
        if(!this.overlay) return;
        this.overlay.classList.remove('active');
        
        const videoEl = this.overlay.querySelector('#m-video');
        videoEl.pause();

        setTimeout(() => {
            videoEl.src = "";
            document.dispatchEvent(new CustomEvent('modal-closed'));
        }, 500); 
    }
};