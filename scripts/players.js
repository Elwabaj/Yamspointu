document.addEventListener("DOMContentLoaded", function () {
    const numPlayersSelect = document.getElementById('numPlayers');
    const playerNamesContainer = document.getElementById('playerNames');

    function updatePlayerInputs() {
        const numPlayers = numPlayersSelect.value;
        playerNamesContainer.innerHTML = ''; // Réinitialiser les champs de nom
        for (let i = 1; i <= numPlayers; i++) {
            playerNamesContainer.innerHTML += `
                <div>
                    <label for="player${i}">Nom du Joueur ${i} :</label>
                    <input type="text" id="player${i}" name="player${i}" placeholder="Joueur ${i}">
                </div>
            `;
        }
    }

    numPlayersSelect.addEventListener('change', updatePlayerInputs);
    updatePlayerInputs(); // Initialiser avec les champs de base au démarrage
});