document.addEventListener("DOMContentLoaded", function () {

    // Fonction pour afficher et masquer les sections
    function showSection(sectionToShow, sectionToHide) {
        document.getElementById(sectionToShow).style.display = 'block';
        document.getElementById(sectionToHide).style.display = 'none';
    }

    // Navigation : Menu principal vers Nouvelle Partie, Règles, ou Scores
    document.getElementById('newGame').addEventListener('click', function () {
        showSection('playerSelection', 'mainMenu');
    });

    document.getElementById('rules').addEventListener('click', function () {
        showSection('rulesSection', 'mainMenu');
    });

    document.getElementById('backBtnPlayer').addEventListener('click', function () {
        showSection('mainMenu', 'playerSelection');
    });

    document.getElementById('backBtnRules').addEventListener('click', function () {
        showSection('mainMenu', 'rulesSection');
    });

    document.getElementById('backBtnScore').addEventListener('click', function () {
        showSection('mainMenu', 'scoreTableSection');
    });

    // Mise à jour des champs de nom en fonction du nombre de joueurs
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

    // Gestion des scores fixes pour certaines figures
    const fixedScores = {
        "DP.": 35,
        "FULL": 25,
        "CARRE": 40,
        "CARRE.": 80,
        "PS": 20,
        "GS": 40,
        "YAMS": 100
    };

    // Fonction pour démarrer la partie et afficher le tableau de scores
    document.getElementById('startGameBtn').addEventListener('click', function () {
        const numPlayers = numPlayersSelect.value;
        let players = [];
        for (let i = 1; i <= numPlayers; i++) {
            const playerName = document.getElementById(`player${i}`).value || `Joueur ${i}`;
            players.push(playerName);
        }

        // Afficher la section du tableau de scores
        showSection('scoreTableSection', 'playerSelection');

        // Lignes pour les scores : 1 à 6 + T + autres lignes (P, DP, etc.)
        const figures = [
            "1", "2", "3", "4", "5", "6", "T", 
            "P", "DP", "DP.", "BRE", "FULL", "CARRE", 
            "CARRE.", "PS", "GS", "MINI", "MAXI", "-11", "YAMS", "TT"
        ];

        const scoreTable = document.getElementById('scoreTable');
        scoreTable.innerHTML = ''; // Réinitialiser le tableau

        // Créer la première ligne (en-tête des joueurs)
        let headerRow = '<tr><th>Figures</th>';
        players.forEach(player => {
            headerRow += `<th>${player}</th>`;
        });
        headerRow += '</tr>';
        scoreTable.innerHTML += headerRow;

        // Créer les lignes pour chaque figure
        figures.forEach(figure => {
            let row = `<tr><td>${figure}</td>`;
            for (let i = 0; i < players.length; i++) {
                if (figure === "T") {
                    row += `<td class="total-cell" data-player="${i}" style="color: #555;">0</td>`;
                } else {
                    row += `<td class="score-cell" data-figure="${figure}" data-player="${i}"></td>`;
                }
            }
            row += '</tr>';
            scoreTable.innerHTML += row;
        });

        // Gestion des clics sur les cases des lignes 1 à 6 et celles avec des valeurs fixes
        const scoreCells = document.querySelectorAll('.score-cell');
        scoreCells.forEach(cell => {
            cell.addEventListener('click', function () {
                const figure = this.getAttribute('data-figure');
                const playerIndex = this.getAttribute('data-player');

                // Si la case correspond à une figure avec un score fixe
                if (fixedScores[figure]) {
                    this.textContent = fixedScores[figure];
                } else {
                    let figureValue = parseInt(figure, 10);
                    let currentScore = parseInt(this.textContent.trim(), 10) || 0;

                    // Incrémenter le score (pour les cases 1 à 6)
                    currentScore = currentScore + figureValue;
                    if (currentScore > figureValue * 5) {
                        this.textContent = figureValue; // Revenir à la valeur de base après 5 fois
                    } else {
                        this.textContent = currentScore;
                    }
                }

                // Mettre à jour la ligne T pour chaque joueur
                checkAndUpdateColor(playerIndex);
            });
        });

        // Fonction pour vérifier si toutes les cases des lignes 1 à 6 sont remplies pour un joueur
        function checkAndUpdateColor(playerIndex) {
            const cells = document.querySelectorAll(`td[data-player="${playerIndex}"][data-figure]`);
            let allFilled = true;
            let total = 0;

            // Ne vérifier que les cellules des lignes 1 à 6
            cells.forEach(cell => {
                const figure = cell.getAttribute('data-figure');
                if (figure >= "1" && figure <= "6") { // Vérifie uniquement les cases 1 à 6
                    const value = cell.textContent.trim();
                    if (value === "") {
                        allFilled = false; // Si une cellule est vide
                    } else {
                        total += parseInt(value, 10) || 0;
                    }
                }
            });

            const totalCell = document.querySelector(`td[data-player="${playerIndex}"].total-cell`);
            totalCell.textContent = total; // Total des cases de 1 à 6

            // Si toutes les cases 1 à 6 sont remplies, on passe la couleur en blanc
            if (allFilled) {
                totalCell.style.color = "white";
            } else {
                totalCell.style.color = "#555"; // Sinon, elle reste gris foncé
            }
        }
    });
});