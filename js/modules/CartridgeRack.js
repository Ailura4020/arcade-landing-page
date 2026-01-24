/* =========================================
   MODULE : GAME RACK (DATA EDITION)
   ========================================= */
import { ModalManager } from './ModalManager.js';

export function initCartridgeRack(gamesData) {
    const container = document.getElementById('cartridge-shelf');
    if (!container) return;

    // Création de l'overlay
    let overlay = document.querySelector('.shelf-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'shelf-overlay';
        document.body.appendChild(overlay);
    }

    container.innerHTML = ''; 

    gamesData.forEach(game => {
        const boxContainer = document.createElement('div');
        boxContainer.className = 'game-box-container';

        // On définit une année par défaut si elle n'est pas dans tes données
        const gameYear = game.year || "2026"; 

        boxContainer.innerHTML = `
            <div class="game-box">
                
                <div class="box-structure">
                    <div class="face-spine">
                        <span class="spine-title">${game.title}</span>
                    </div>
                    <div class="face-top"></div>
                    <div class="face-bottom"></div>
                    <div class="face-right"></div>
                    <div class="face-back-exterior"></div>
                    
                    <div class="face-interior">
                        <div class="cartridge-slot">
                            <div class="inner-cartridge">
                                <div class="cart-label">${game.title}</div>
                            </div>
                        </div>
                        <div class="game-details-panel">
                            <h4>READY TO PLAY</h4>
                            <div class="actions">
                                <button class="btn-info">DETAILS</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-door">
                    <div class="door-front">
                        <div class="front-media">
                            <div class="plastic-sheen"></div>
                            ${game.poster ? `<img src="${game.poster}" class="cover-img" alt="${game.title}">` : '<div class="no-cover">NO IMG</div>'}
                        </div>

                        <div class="front-bottom">
                            <div class="info-header">
                                <h3 class="mini-title">${game.title}</h3>
                                <div class="meta-row">
                                    <span class="badge-cat">${game.tag}</span>
                                    <span class="badge-year">${gameYear}</span>
                                </div>
                                <span class="mini-dev">By ${game.dev}</span>
                            </div>
                            
                            <button class="btn-start">START</button>
                        </div>
                    </div>
                    
                    <div class="door-back-inner">
                        <div class="manual-slot"><span>MANUAL</span></div>
                    </div>
                </div>

            </div>
        `;

        // --- EVENTS ---
        const box = boxContainer.querySelector('.game-box');
        const btnStart = boxContainer.querySelector('.btn-start');
        const btnInfo = boxContainer.querySelector('.btn-info');

        // CLIC START
        btnStart.addEventListener('click', (e) => {
            e.stopPropagation(); 
            activateBox(boxContainer, box);
        });

        // CLIC DETAILS
        if(btnInfo) {
            btnInfo.addEventListener('click', (e) => {
                e.stopPropagation();
                ModalManager.open(game);
            });
        }

        container.appendChild(boxContainer);
    });

    function activateBox(targetContainer, targetBox) {
        if (targetContainer.classList.contains('is-active')) return;
        overlay.classList.add('visible');
        targetContainer.classList.add('is-active');
        setTimeout(() => { targetBox.classList.add('is-open'); }, 600);

        overlay.onclick = () => {
            targetBox.classList.remove('is-open');
            setTimeout(() => {
                targetContainer.classList.remove('is-active');
                overlay.classList.remove('visible');
            }, 400);
        };
    }
}