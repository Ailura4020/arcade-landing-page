export const CommunityManager = {
    init() {
        const container = document.getElementById('community-feed');
        if (!container) return;

        // On simule un chargement réseau
        fetch('./data/community.json')
            .then(response => response.json())
            .then(data => {
                this.renderLeaderboard(data, container);
            })
            .catch(error => console.error('Erreur chargement community:', error));
    },

    renderLeaderboard(data, container) {
        container.innerHTML = ''; // Nettoyer
        
        data.forEach(entry => {
            // Création d'une ligne "High Score"
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            
            row.innerHTML = `
                <div class="rank-col">${entry.rank}</div>
                <div class="player-col">
                    <span class="player-name">${entry.username}</span>
                    <span class="player-role">${entry.role}</span>
                </div>
                <div class="msg-col">"${entry.message}"</div>
                <div class="score-col">
                    <span class="score-val">${entry.score}</span>
                    <span class="platform-badge">${entry.platform}</span>
                </div>
            `;
            
            container.appendChild(row);
        });
    }
};