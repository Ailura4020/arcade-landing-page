# 🕹️ PIXEL FORGE // Arcade Landing Page

> **System Booting... Arcade Mode: READY 🚀**

## 📜 Aperçu du Projet
**Pixel Forge** est une landing page immersive conçue avec une esthétique rétro-gaming et cyberpunk. Ce projet a été développé de A à Z (*from scratch*) pour démontrer la puissance du **JavaScript Vanilla** et des animations **CSS3** avancées, sans dépendre de frameworks.

Il met en scène un moteur fictif dédié aux créateurs de mondes virtuels, proposant une expérience utilisateur (UX) marquante inspirée des bornes d'arcade des années 90.

## ✨ Fonctionnalités Principales
- **Carrousel 3D Interactif :** Sélection de "cartouches" de jeux générée dynamiquement à partir de données JSON via l'API Fetch.
- **Design Immersif (UI/UX) :** Effets d'écran cathodique (CRT scanlines), typographies pixel, animations de glitch et survols néons.
- **Composants Modulaires :** Gestionnaire de fenêtres modales personnalisé (`ModalManager`) et "Hall of Fame" (Tableau des scores).
- **Architecture Data-Driven :** Séparation entre l'affichage visuel et les données (`games.json`, `community.json`).

## 🛠️ Stack Technique
- **HTML5** (Structure sémantique)
- **CSS3** (Architecture modulaire, Flexbox/Grid, Transformations 3D)
- **Vanilla JS** (ES6 Modules, Fetch API)

## 🚀 Démarrage Local
Ce projet nécessite un serveur local (à cause du `fetch` JSON).
```bash
# Avec Node.js
npx serve

# Ou utilisez l'extension "Live Server" sur VS Code
