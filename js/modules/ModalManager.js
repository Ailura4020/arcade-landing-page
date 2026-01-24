/* =========================================
   MODULE : GESTIONNAIRE DE MODALE (DARK & TIMED)
   ========================================= */
export const ModalManager = {
    overlay: null,
    boxContainer: null, // On garde une référence à la boite

    init() {
        this.overlay = document.getElementById('game-modal');
        if(!this.overlay) return;

        this.overlay.innerHTML = `
            <div class="sega-box-open" id="sega-box">
                <div class="close-cross" id="m-close">✕</div>

                <div class="box-left-panel">
                    <div class="cover-front">
                        <img id="m-poster" src="" alt="Cover" class="full-cover-img">
                    </div>
                    <div class="cover-back-manual">
                        <div class="manual-header">
                            <h2 class="manual-title" id="m-title">TITRE</h2>
                            <div class="manual-meta">
                                <span id="m-dev">DEV</span><br>
                                <span id="m-year">2026</span>
                            </div>
                        </div>
                        <div class="manual-body">
                            <p id="m-desc">Description...</p>
                            <span class="manual-tag" id="m-tag">GENRE</span>
                        </div>
                    </div>
                </div>

                <div class="box-right-panel">
                    <div class="cartridge-shape">
                        <div class="cartridge-sticker">
                            <video id="m-video" class="modal-video" loop playsinline muted></video>
                        </div>
                    </div>
                    <button class="insert-coin-btn">START GAME</button>
                </div>
            </div>
        `;
        
        this.boxContainer = this.overlay.querySelector('#sega-box');

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

        // Remplissage
        this.overlay.querySelector('#m-poster').src = game.poster;
        this.overlay.querySelector('#m-title').textContent = game.title;
        this.overlay.querySelector('#m-desc').textContent = game.description;
        this.overlay.querySelector('#m-dev').textContent = game.dev;
        this.overlay.querySelector('#m-year').textContent = game.year;
        this.overlay.querySelector('#m-tag').textContent = game.tag;

        const videoEl = this.overlay.querySelector('#m-video');
        if(game.video) {
            videoEl.src = game.video;
            videoEl.muted = false; 
            videoEl.play().catch(() => {});
        } else {
            videoEl.src = "";
        }

        // 1. Afficher l'overlay (Transparent mais présent)
        this.overlay.classList.add('active');

        // 2. Petit délai pour que l'overlay soit là, puis on ouvre la boite
        setTimeout(() => {
            if(this.boxContainer) this.boxContainer.classList.add('is-open');
        }, 100);
    },

    close() {
        if(!this.overlay) return;

        // 1. D'ABORD : On ferme la porte (Animation inverse)
        if(this.boxContainer) this.boxContainer.classList.remove('is-open');

        // Stop Vidéo tout de suite pour le son
        const videoEl = this.overlay.querySelector('#m-video');
        videoEl.pause();

        // 2. ON ATTEND la fin de l'animation de fermeture (0.8s défini dans le CSS)
        setTimeout(() => {
            // 3. On cache l'overlay
            this.overlay.classList.remove('active');
            videoEl.src = "";

            // 4. ET ENFIN : On dit aux autres jeux de revenir
            document.dispatchEvent(new CustomEvent('modal-closed'));
            
        }, 800); // 800ms = durée de la transition CSS
    }
};