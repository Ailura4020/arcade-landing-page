/* =========================================
   DATA : La liste des jeux (Le client modifie juste ça)
   ========================================= */
const gamesData = [
    {
        title: "Cyber Brawler",
        dev: "NeonStudio",
        desc: "Un Beat'em up nerveux.",
        // Les nouvelles infos pour la Pop-up :
        fullDesc: "Explorez les bas-fonds de Neo-Tokyo dans ce jeu de combat inspiré des classiques 90s. Jouable jusqu'à 4 joueurs en local.",
        tag: "ACTION",
        color: "linear-gradient(45deg, #ff0055, #5500ff)",
        linkGithub: "https://github.com", // Le client met son lien ici
        linkDownload: "https://itch.io"   // Et son lien de téléchargement là
    },
    {
        title: "Pixel Quest",
        dev: "DevLoic",
        desc: "L'aventure old-school.",
        fullDesc: "Un RPG tour par tour avec plus de 50 heures de jeu. Moteur optimisé pour les sprites 2D haute définition.",
        tag: "RPG",
        color: "linear-gradient(45deg, #00ff99, #00ccff)",
        linkGithub: "https://github.com",
        linkDownload: null // S'il n'y a pas de lien, on met null (le bouton ne s'affichera pas)
    },
    {
        title: "Street Racer Galactic",
        dev: "Ailura",
        desc: "Racing futuriste intense.",
        fullDesc: "Plongez dans des courses anti-gravité à travers des paysages urbains futuristes. Personnalisez vos véhicules et défiez vos amis en ligne.",
        tag: "RACING",
        color: "linear-gradient(45deg, #00ff99, #00ccff)",
        linkGithub: "https://github.com",
        linkDownload: null // S'il n'y a pas de lien, on met null (le bouton ne s'affichera pas)
    },
    // ... tes autres jeux
];

/* =========================================
   LOGIC : Génération automatique des cartes
   ========================================= */
/* ... (Après ton tableau gamesData) ... */

const container = document.getElementById('games-container');
const modal = document.getElementById('game-modal');

// 1. GÉNÉRATION DES CARTES
function loadGames() {
    container.innerHTML = '';
    
    // index est le numéro du jeu dans la liste (0, 1, 2...)
    gamesData.forEach((game, index) => {
        const cardHTML = `
            <article class="game-card">
                <div class="card-visual" style="background: ${game.color}; height: 180px; position: relative;">
                    <span class="badge">${game.tag}</span>
                </div>
                <div class="card-content">
                    <h3>${game.title}</h3>
                    <p class="dev">by <span class="dev-name">${game.dev}</span></p>
                    <p class="desc">${game.desc}</p>
                    <button class="btn-card" onclick="openModal(${index})">Voir la fiche</button>
                </div>
            </article>
        `;
        container.innerHTML += cardHTML;
    });
}

// 2. OUVRIR LA MODALE
function openModal(index) {
    const game = gamesData[index]; // On récupère les infos du jeu cliqué
    
    // On remplit le HTML de la modale avec les infos
    document.getElementById('modal-title').innerText = game.title;
    document.getElementById('modal-tag').innerText = game.tag;
    document.getElementById('modal-desc').innerText = game.fullDesc;
    
    // GESTION DES BOUTONS (On les cache s'il n'y a pas de lien)
    const btnDownload = document.getElementById('btn-download');
    const btnGithub = document.getElementById('btn-github');

    // Téléchargement
    if(game.linkDownload) {
        btnDownload.style.display = 'inline-block';
        btnDownload.href = game.linkDownload;
    } else {
        btnDownload.style.display = 'none'; // Pas de lien = bouton caché
    }

    // Github
    if(game.linkGithub) {
        btnGithub.style.display = 'inline-block';
        btnGithub.href = game.linkGithub;
    } else {
        btnGithub.style.display = 'none';
    }

    // On affiche la boîte
    modal.style.display = 'flex';
}

// 3. FERMER LA MODALE
function closeModal() {
    modal.style.display = 'none';
}

// Fermer si on clique en dehors de la boîte (sur le fond sombre)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Lancement
document.addEventListener('DOMContentLoaded', loadGames);


/* =========================================
   MENU MOBILE
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

// Quand on clique sur le hamburger
hamburger.addEventListener('click', () => {
    // 1. On bascule la classe 'nav-active' pour faire glisser le menu
    navLinks.classList.toggle('nav-active');
    
    // 2. On transforme le hamburger en croix
    hamburger.classList.toggle('toggle');

    // 3. Animation des liens (chacun arrive avec un petit délai)
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            // Le délai dépend de l'index (0.1s, 0.2s, etc.)
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Quand on clique sur un lien, on ferme le menu (UX)
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
        // On reset l'animation
        links.forEach(l => l.style.animation = '');
    });
});