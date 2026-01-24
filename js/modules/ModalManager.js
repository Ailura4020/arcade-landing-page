/* =========================================
   MODULE : MODAL MANAGER
   ========================================= */
export const ModalManager = {
    modal: document.getElementById('game-modal'),
    
    // Initialisation (Events de fermeture)
    init() {
        if (!this.modal) return;
        
        // Fermeture via la croix
        const closeBtn = this.modal.querySelector('.close-btn');
        if(closeBtn) closeBtn.onclick = () => this.close();

        // Fermeture via clic extérieur
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Fermeture via touche ECHAP
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    },

    open(game) {
        if (!this.modal) return;
        
        // 1. Remplissage des Textes
        this.setText('modal-title', game.title);
        this.setText('modal-tag', game.tag);
        this.setText('modal-desc', game.fullDesc);

        // 2. Specs Techniques
        const specsList = document.getElementById('modal-specs-list');
        if(specsList && game.specs) {
            specsList.innerHTML = `
                <li><span>OS:</span> ${game.specs.os}</li>
                <li><span>CPU:</span> ${game.specs.cpu}</li>
                <li><span>RAM:</span> ${game.specs.ram}</li>
                <li><span>GPU:</span> ${game.specs.gpu}</li>
            `;
        }

        // 3. Boutons Actions
        this.setupButton('btn-download', game.linkDownload);
        this.setupButton('btn-github', game.linkGithub);

        // 4. Affichage
        this.modal.style.display = 'flex';
    },

    close() {
        if (this.modal) this.modal.style.display = 'none';
    },

    // Utilitaires privés
    setText(id, text) {
        const el = document.getElementById(id);
        if(el) el.innerText = text || '';
    },
    setupButton(id, link) {
        const btn = document.getElementById(id);
        if(btn) {
            if(link) {
                btn.style.display = 'inline-block';
                btn.href = link;
            } else {
                btn.style.display = 'none';
            }
        }
    }
};

// Auto-init au chargement du module
ModalManager.init();