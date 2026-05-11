/* =========================================
   MODULE : GESTIONNAIRE MODALE (FINALE)
   ========================================= */
export const ModalManager = {
    overlay: null,

    init() {
        this.overlay = document.getElementById('game-modal');
        if(!this.overlay) return;

        // Structure HTML (Avec Jaquette Frontale)
        this.overlay.innerHTML = `
            <div class="sega-box-open" id="sega-box">
                <div class="close-cross" id="m-close">✕</div>

                <div class="box-left-panel">
                    
                    <div class="cover-front">
                         <img id="m-cover-front" src="" alt="Cover" class="full-cover-img">
                    </div>

                    <div class="cover-back-manual">
                        <div class="manual-paper-effect">
                            <div class="manual-header">
                                <div class="header-top">
                                    <span class="doc-id">DOC_ID: <span id="m-year">2026</span></span>
                                    <span class="doc-class">CLASSIFIED</span>
                                </div>
                                <h2 class="manual-title" id="m-title">TITRE</h2>
                            </div>

                            <div class="manual-body">
                                <div class="manual-section">
                                    <h3 class="section-label">MISSION BRIEFING</h3>
                                    <p id="m-desc" class="briefing-text">...</p>
                                </div>

                                <div class="manual-grid">
                                    <div class="grid-item">
                                        <span class="label">DEVELOPER</span>
                                        <span class="value" id="m-dev">...</span>
                                    </div>
                                    <div class="grid-item">
                                        <span class="label">CATEGORY</span>
                                        <span class="value" id="m-tag">...</span>
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
                            
                            <div class="manual-footer"></div>
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

        // Remplissage des données
        this.overlay.querySelector('#m-title').textContent = game.title;
        this.overlay.querySelector('#m-desc').textContent = game.description;
        this.overlay.querySelector('#m-dev').textContent = game.dev;
        this.overlay.querySelector('#m-year').textContent = game.year || 'Unknown';
        this.overlay.querySelector('#m-tag').textContent = game.tag;
        
        // La jaquette extérieure (Cruciale pour l'effet "Boite fermée qui arrive")
        this.overlay.querySelector('#m-cover-front').src = game.poster;

        // Liens
        const socialContainer = this.overlay.querySelector('.manual-footer');
        socialContainer.innerHTML = ''; 
        if (game.links) {
            Object.entries(game.links).forEach(([key, url]) => {
                const linkBtn = document.createElement('a');
                linkBtn.href = url; linkBtn.target = "_blank";
                linkBtn.className = `social-link-btn ${key}`;
                linkBtn.textContent = key.toUpperCase();
                socialContainer.appendChild(linkBtn);
            });
        } else {
            socialContainer.textContent = "PIXEL_FORGE ENTERTAINMENT SYSTEM";
        }

        // Média
        const videoEl = this.overlay.querySelector('#m-video');
        const imgEl = this.overlay.querySelector('#m-sticker-img');

        if(game.video) {
            imgEl.style.display = 'none';
            videoEl.style.display = 'block';
            videoEl.src = game.video;
            videoEl.muted = false;
            videoEl.play().catch(() => {});
        } else {
            videoEl.style.display = 'none';
            videoEl.src = "";
            imgEl.src = game.poster;
            imgEl.style.display = 'block';
        }

        // --- SÉQUENCAGE DE L'OUVERTURE ---
        this.overlay.classList.remove('is-closing');
        
        // On force le navigateur à "peindre" la frame actuelle (fermée)
        // avant d'appliquer la classe active qui déclenchera l'ouverture après délai
        requestAnimationFrame(() => {
            this.overlay.classList.add('active');
        });
    },

    close() {
        if(!this.overlay) return;
        
        // Déclenche le CLAC (fermeture)
        this.overlay.classList.add('is-closing');

        // Stop son
        const videoEl = this.overlay.querySelector('#m-video');
        videoEl.pause();

        // Attente de la fin de l'anim (0.6s)
        setTimeout(() => {
            this.overlay.classList.remove('active');
            this.overlay.classList.remove('is-closing');
            videoEl.src = "";
            document.dispatchEvent(new CustomEvent('modal-closed'));
        }, 600); 
    }
};