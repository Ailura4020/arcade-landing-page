/* =========================================
   DATA : Liste des Jeux (Lore + Specs + Media)
   ========================================= */
const gamesData = [
    {
        title: "Neon Ronin: Overdrive",
        dev: "Katana_Soft",
        desc: "2084. Neo-Tokyo a sombré sous le joug des méga-corporations. Vous êtes le dernier Ronin du clan Digital Lotus. Armé de votre katana plasmique et de vos réflexes augmentés, tranchez votre chemin à travers les étages de la Tour Arasaka. Chaque coup compte, chaque erreur est fatale.",
        // Le Lore complet
        fullDesc: "2084. Neo-Tokyo a sombré sous le joug des méga-corporations. Vous êtes le dernier Ronin du clan Digital Lotus. Armé de votre katana plasmique et de vos réflexes augmentés, tranchez votre chemin à travers les étages de la Tour Arasaka. Chaque coup compte, chaque erreur est fatale.",
        tech: "Unity 6 • C#",
        video: "assets/videos/demo.mp4", 
        poster: "assets/images/neon-cover.jpg",
        tag: "ACTION",
        linkGithub: "https://github.com/demo/neon",
        linkDownload: "https://itch.io/demo/neon",
        // NOUVEAU : Les Specs Techniques
        specs: {
            os: "Windows 98/XP",
            cpu: "Pentium III 500MHz",
            ram: "128MB",
            gpu: "Voodoo 3 3000"
        },
        // NOUVEAU : Galerie d'images (Placeholders)
        screens: ["assets/images/s1.jpg", "assets/images/s2.jpg"]
    },
    {
        title: "Void Scavenger",
        dev: "DeepSpace_Dev",
        desc: "Survival horror in zero-g.",
        fullDesc: "Le signal de détresse provenait du cargo USG Ishimura, perdu depuis 20 ans. Vous êtes monté à bord pour récupérer la cargaison, mais vous avez trouvé... autre chose. L'oxygène baisse. Les couloirs changent de forme. Et dans l'ombre des conduits, quelque chose respire.",
        tech: "Unreal Engine 5",
        video: "assets/videos/demo2.mp4",
        poster: "",
        tag: "HORROR",
        linkGithub: "https://github.com",
        linkDownload: null,
        specs: {
            os: "Windows 10",
            cpu: "Intel i5",
            ram: "8GB",
            gpu: "GTX 1060"
        },
        screens: []
    },
    {
        title: "Hyper Drift GT",
        dev: "Turbo_Team",
        desc: "90s Arcade Racing Vibes.",
        fullDesc: "Oubliez les freins. Ici, tout se joue dans la courbe. Plongez dans l'esthétique Vaporwave ultime avec des courses illégales sur les autoroutes infinies du Cyber-Net. Personnalisez votre bolide rétro, montez le volume de la Synthwave, et devenez le Roi de la Glisse.",
        tech: "Godot 4 • GDScript",
        video: "assets/videos/demo3.mp4",
        poster: "",
        tag: "RACING",
        linkGithub: "https://github.com",
        linkDownload: "https://steam.com",
        specs: {
            os: "Windows XP",
            cpu: "Potato",
            ram: "512MB",
            gpu: "Nvidia Riva TNT2"
        },
        screens: []
    },
    {
        title: "Aether Chronicles",
        dev: "FantasyForge",
        desc: "16-bit JRPG masterpiece.",
        fullDesc: "Le monde d'Aether se meurt. Incarnez une jeune mécanicienne découvrant une technologie ancienne capable de sauver ce qui reste de l'humanité. Un voyage émotionnel, des combats au tour par tour stratégiques et une direction artistique 16-bits à couper le souffle.",
        tech: "RPG Maker MZ",
        video: "assets/videos/demo4.mp4",
        poster: "",
        tag: "RPG",
        linkGithub: null, 
        linkDownload: "https://itch.io",
        specs: {
            os: "Any",
            cpu: "Low Spec",
            ram: "2GB",
            gpu: "Integrated"
        },
        screens: []
    },
    {
        title: "Glitch Protocol",
        dev: "Logic_Bytes",
        desc: "Hack the game to win.",
        fullDesc: "VOUS N'ÊTES PAS LE JOUEUR. VOUS ÊTES L'ANOMALIE. Ce jeu refuse d'être fini. Pour progresser, vous devrez ouvrir la console de commande, réécrire le code en temps réel et exploiter les bugs du moteur physique. Brisez le quatrième mur.",
        tech: "Custom C++ Engine",
        video: "", 
        poster: "", 
        tag: "PUZZLE",
        linkGithub: "https://github.com",
        linkDownload: "https://itch.io",
        specs: {
            os: "Linux / Win",
            cpu: "Dual Core",
            ram: "4GB",
            gpu: "Basic"
        },
        screens: []
    }
];

/* =========================================
   LOGIC : Arcade Core
   ========================================= */
const listContainer = document.getElementById('games-list-root');
const previewTitle = document.getElementById('preview-title');
const previewTech = document.getElementById('preview-tech');
const previewDesc = document.getElementById('preview-desc');
const previewAuthor = document.getElementById('preview-author');
const btnDetails = document.getElementById('btn-details');

let activeGameIndex = 0; 

// 1. CHARGEMENT LISTE
function loadGames() {
    if (!listContainer) return; 
    listContainer.innerHTML = '';
    
    gamesData.forEach((game, index) => {
        const li = document.createElement('li');
        li.className = 'game-item';
        li.innerHTML = `<span class="arrow">></span> ${game.title}`;
        
        li.addEventListener('mouseover', () => updatePreview(index));
        li.addEventListener('click', () => updatePreview(index));

        listContainer.appendChild(li);
    });

    if (gamesData.length > 0) updatePreview(0);
}

// 2. UPDATE PREVIEW
function updatePreview(index) {
    const game = gamesData[index];
    activeGameIndex = index;

    document.querySelectorAll('.game-item').forEach(item => item.classList.remove('active'));
    if(listContainer.children[index]) listContainer.children[index].classList.add('active');

    previewTitle.innerText = game.title;
    previewTech.innerText = game.tech;
    previewDesc.innerText = game.desc;
    previewAuthor.innerText = `By ${game.dev}`;
    
    // Video / Poster Logic
    const videoElement = document.getElementById('preview-video');
    const noSignalElement = document.getElementById('no-video-msg');
    
    videoElement.src = "";
    videoElement.poster = "";

    if(game.video && game.video.trim() !== "") {
        noSignalElement.style.display = 'none';
        videoElement.style.display = 'block';
        if(game.poster) videoElement.poster = game.poster;
        videoElement.src = game.video;
        videoElement.load();
        var p = videoElement.play();
        if (p !== undefined) p.catch(_ => {});
    } else {
        videoElement.style.display = 'none';
        noSignalElement.style.display = 'flex';
    }

    if(btnDetails) btnDetails.onclick = () => openModal(activeGameIndex);
}

// 3. OPEN MODAL (VERSION PRO)
const modal = document.getElementById('game-modal');

function openModal(index) {
    if(!modal) return;
    const game = gamesData[index];
    
    // Infos de base
    document.getElementById('modal-title').innerText = game.title;
    document.getElementById('modal-tag').innerText = game.tag;
    document.getElementById('modal-desc').innerText = game.fullDesc;
    
    // Injection des Specs Techniques (Nouveau)
    const specsContainer = document.getElementById('modal-specs-list');
    if(specsContainer && game.specs) {
        specsContainer.innerHTML = `
            <li><span>OS:</span> ${game.specs.os}</li>
            <li><span>CPU:</span> ${game.specs.cpu}</li>
            <li><span>RAM:</span> ${game.specs.ram}</li>
            <li><span>GPU:</span> ${game.specs.gpu}</li>
        `;
    }

    // Gestion Boutons
    const btnDownload = document.getElementById('btn-download');
    const btnGithub = document.getElementById('btn-github');

    game.linkDownload ? (btnDownload.style.display = 'inline-block', btnDownload.href = game.linkDownload) : btnDownload.style.display = 'none';
    game.linkGithub ? (btnGithub.style.display = 'inline-block', btnGithub.href = game.linkGithub) : btnGithub.style.display = 'none';

    modal.style.display = 'flex';
}

function closeModal() { if(modal) modal.style.display = 'none'; }
window.onclick = function(e) { if (e.target == modal) closeModal(); }

// 4. MENU MOBILE
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
}

document.addEventListener('DOMContentLoaded', loadGames);