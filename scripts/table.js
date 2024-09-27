document.addEventListener("DOMContentLoaded", function () {

    // Fonction pour démarrer la partie et afficher le tableau de scores
    document.getElementById('startGameBtn').addEventListener('click', function () {
        const numPlayers = document.getElementById('numPlayers').value;
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
                if (figure === "T" || figure === "TT") {
                    row += `<td class="total-cell" data-figure="${figure}" data-player="${i}" style="color: #555;">0</td>`;
                } 
                else if (["P", "DP", "BRE", "MINI", "MAXI", "-11"].includes(figure)) {
                    row += `<td><input type="number" inputmode="numeric" class="manual-input" data-figure="${figure}" data-player="${i}"></td>`;
                } 
                else {
                    row += `<td class="score-cell" data-figure="${figure}" data-player="${i}"></td>`;
                }
            }
            row += '</tr>';
            scoreTable.innerHTML += row;
        });

        // Gestion des clics sur les cases des lignes 1 à 6 et celles avec des valeurs fixes
        const scoreCells = document.querySelectorAll('.score-cell');
        let holdTimeout;

        scoreCells.forEach(cell => {
            cell.addEventListener('click', function () {
                const figure = this.getAttribute('data-figure');
                const playerIndex = this.getAttribute('data-player');
                let currentScore = parseInt(this.textContent.trim(), 10) || 0;

                if (isNaN(currentScore)) {
                    currentScore = 0;
                }

                // Gestion des scores fixes
                const fixedScores = {
                    "DP.": 35,
                    "FULL": 25,
                    "CARRE": 40,
                    "CARRE.": 80,
                    "PS": 20,
                    "GS": 40,
                    "YAMS": 100
                };

                if (fixedScores[figure]) {
                    this.textContent = fixedScores[figure];
                } 
                // Calcul des scores 1 à 6
                else if (figure >= "1" && figure <= "6") {
                    let figureValue = parseInt(figure, 10);
                    currentScore += figureValue;

                    if (currentScore > figureValue * 5) {
                        this.textContent = figureValue;
                    } else {
                        this.textContent = currentScore;
                    }

                    // Met à jour la ligne T (Total) pour chaque joueur
                    updateTotals(playerIndex);
                }
            });

            // Gestion de l'effacement après 1s de maintien
            cell.addEventListener('mousedown', function () {
                const figure = this.getAttribute('data-figure');
                if (figure !== "T" && figure !== "TT") {
                    holdTimeout = setTimeout(() => {
                        this.textContent = ''; // Efface le contenu de la case après 1s de maintien
                        updateTotals(this.getAttribute('data-player')); // Mets à jour le total après effacement
                    }, 1000); // 1 seconde
                }
            });

            // Ajout des événements pour mobile (touchstart et touchend)
            cell.addEventListener('touchstart', function () {
                const figure = this.getAttribute('data-figure');
                if (figure !== "T" && figure !== "TT") {
                    holdTimeout = setTimeout(() => {
                        this.textContent = ''; // Efface le contenu de la case après 1s de maintien
                        updateTotals(this.getAttribute('data-player'));
                    }, 1000); // 1 seconde
                }
            });

            cell.addEventListener('mouseup', function () {
                clearTimeout(holdTimeout); // Annule l'effacement si le clic est relâché avant 1 seconde
            });

            cell.addEventListener('touchend', function () {
                clearTimeout(holdTimeout); // Annule l'effacement sur mobile
            });

            cell.addEventListener('mouseleave', function () {
                clearTimeout(holdTimeout); // Annule aussi l'effacement si la souris quitte la case
            });
        });

        // Fonction pour mettre à jour le total des cases 1 à 6 pour un joueur
        function updateTotals(playerIndex) {
            const cells = document.querySelectorAll(`td[data-player="${playerIndex}"][data-figure]`);
            let total = 0;
            let allFilled = true; // Vérifie si toutes les cases de 1 à 6 sont remplies

            cells.forEach(cell => {
                const figure = cell.getAttribute('data-figure');
                if (figure >= "1" && figure <= "6") { // Vérifie uniquement les cases 1 à 6
                    const value = cell.textContent.trim();
                    if (value === "") {
                        allFilled = false; // Si une cellule est vide, on garde le total en gris
                    } else {
                        total += parseInt(value, 10);
                    }
                }
            });

            // Mets à jour la cellule du total
            const totalCell = document.querySelector(`td[data-player="${playerIndex}"].total-cell`);
            totalCell.textContent = total; // Affiche le total des cases 1 à 6

            // Change la couleur de la cellule si toutes les cases sont remplies
            if (allFilled) {
                totalCell.style.color = "white";
            } else {
                totalCell.style.color = "#555"; // Reste gris tant que tout n'est pas rempli
            }
        }
    });
});