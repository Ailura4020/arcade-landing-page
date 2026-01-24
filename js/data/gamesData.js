/* =========================================
   DATA : DATABASE DES JEUX
   ========================================= */
export const gamesData = [
    {
        id: "neon-ronin",
        title: "Neon Ronin",
        subtitle: "Overdrive",
        dev: "Katana_Soft",
        desc: "Slash through the synthwave.",
        fullDesc: "2084. Neo-Tokyo a sombré sous le joug des méga-corporations. Vous êtes le dernier Ronin du clan Digital Lotus. Armé de votre katana plasmique, tranchez votre chemin à travers la Tour Arasaka.",
        tech: "Unity 6 • C#",
        // Médias
        video: "assets/videos/demo.mp4", 
        poster: "assets/images/poster1.jpg", // Assure-toi d'avoir une image ici
        // Liens
        tag: "ACTION",
        linkGithub: "https://github.com/demo/neon",
        linkDownload: "https://itch.io/demo/neon",
        // Specs Techniques (Pour la Modal)
        specs: {
            os: "Windows 98/XP",
            cpu: "Pentium III 500MHz",
            ram: "128MB",
            gpu: "Voodoo 3 3000"
        }
    },
    {
        id: "void-scavenger",
        title: "Void Scavenger",
        subtitle: "Zero-G",
        dev: "DeepSpace_Dev",
        desc: "Survival horror in zero-g.",
        fullDesc: "Le signal de détresse provenait du cargo USG Ishimura. L'oxygène baisse. Les couloirs changent de forme. Et dans l'ombre des conduits, quelque chose respire.",
        tech: "Unreal Engine 5",
        video: "assets/videos/demo2.mp4",
        poster: "assets/images/poster2.jpg",
        tag: "HORROR",
        linkGithub: "https://github.com",
        linkDownload: null,
        specs: {
            os: "Windows 10",
            cpu: "Intel i5",
            ram: "8GB",
            gpu: "GTX 1060"
        }
    },
    {
        id: "hyper-drift",
        title: "Hyper Drift",
        subtitle: "GT Edition",
        dev: "Turbo_Team",
        desc: "90s Arcade Racing Vibes.",
        fullDesc: "Oubliez les freins. Plongez dans l'esthétique Vaporwave ultime avec des courses illégales sur les autoroutes infinies du Cyber-Net.",
        tech: "Godot 4 • GDScript",
        video: "assets/videos/demo3.mp4",
        poster: "assets/images/poster3.jpeg",
        tag: "RACING",
        linkGithub: "https://github.com",
        linkDownload: "https://steam.com",
        specs: {
            os: "Windows XP",
            cpu: "Potato",
            ram: "512MB",
            gpu: "Nvidia Riva TNT2"
        }
    },
    {
        id: "aether",
        title: "Aether",
        subtitle: "Chronicles",
        dev: "FantasyForge",
        desc: "16-bit JRPG masterpiece.",
        fullDesc: "Le monde d'Aether se meurt. Un voyage émotionnel, des combats au tour par tour stratégiques et une direction artistique 16-bits à couper le souffle.",
        tech: "RPG Maker MZ",
        video: "assets/videos/demo4.mp4",
        poster: "assets/images/poster4.jpeg",
        tag: "RPG",
        linkGithub: null, 
        linkDownload: "https://itch.io",
        specs: {
            os: "Any",
            cpu: "Low Spec",
            ram: "2GB",
            gpu: "Integrated"
        }
    },
    {
        id: "glitch",
        title: "Glitch",
        subtitle: "Protocol",
        dev: "Logic_Bytes",
        desc: "Hack the game to win.",
        fullDesc: "VOUS N'ÊTES PAS LE JOUEUR. VOUS ÊTES L'ANOMALIE. Ce jeu refuse d'être fini. Réécrivez le code en temps réel pour progresser.",
        tech: "Custom C++",
        video: "", 
        poster: "assets/images/poster5.webp", 
        tag: "PUZZLE",
        linkGithub: "https://github.com",
        linkDownload: "https://itch.io",
        specs: {
            os: "Linux / Win",
            cpu: "Dual Core",
            ram: "4GB",
            gpu: "Basic"
        }
    }
];