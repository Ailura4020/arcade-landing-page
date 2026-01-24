/* =========================================
   MODULE : GESTIONNAIRE DE MODALE (BOÎTE REALISTE)
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
        
        // Events (identiques)
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

        // Remplissage (identique)
        // Note : plus besoin de m-poster
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

        // Apparition avec l'effet "Pop" élastique du CSS
        this.overlay.classList.add('active');
    },

    close() {
        if(!this.overlay) return;

        this.overlay.classList.remove('active');
        const videoEl = this.overlay.querySelector('#m-video');
        videoEl.pause();

        // Délai un peu plus long pour laisser l'animation de sortie se finir
        setTimeout(() => {
            videoEl.src = "";
            document.dispatchEvent(new CustomEvent('modal-closed'));
        }, 500); 
    }
};