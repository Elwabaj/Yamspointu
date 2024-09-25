document.addEventListener("DOMContentLoaded", function () {
    const fixedScores = {
        "DP.": 35,
        "FULL": 25,
        "CARRE": 40,
        "CARRE.": 80,
        "PS": 20,
        "GS": 40,
        "YAMS": 100
    };

    document.getElementById('startGameBtn').addEventListener('click', function () {
        const numPlayers = document.getElementById('numPlayers').value;
        let players = [];
        for (let i = 1; i <= numPlayers; i++) {
            const playerName = document.getElementById(`player${i}`).value || `Joueur ${i}`;
            players.push(playerName);
        }

        showSection('scoreTableSection', 'playerSelection');

        const figures = ["1", "2", "3", "4", "5", "6", "T", "P", "DP", "DP.", "BRE", "FULL", "CARRE", "CARRE.", "PS", "GS", "MINI", "MAXI", "-11", "YAMS", "TT"];
        const scoreTable = document.getElementById('scoreTable');
        scoreTable.innerHTML = ''; // Réinitialiser le tableau

        let headerRow = '<tr><th>Figures</th>';
        players.forEach(player => {
            headerRow += `<th>${player}</th>`;
        });
        headerRow += '</tr>';
        scoreTable.innerHTML += headerRow;

        figures.forEach(figure => {
            let row = `<tr><td>${figure}</td>`;
            for (let i = 0; i < players.length; i++) {
                if (figure === "T" || figure === "TT") {
                    row += `<td class="total-cell" data-figure="${figure}" data-player="${i}" style="color: #555;">0</td>`;
                } else if (["P", "DP", "BRE", "MINI", "MAXI", "-11"].includes(figure)) {
                    row += `<td><input type="number" inputmode="numeric" class="manual-input" data-figure="${figure}" data-player="${i}"></td>`;
                } else {
                    row += `<td class="score-cell" data-figure="${figure}" data-player="${i}"></td>`;
                }
            }
            row += '</tr>';
            scoreTable.innerHTML += row;
        });

        const scoreCells = document.querySelectorAll('.score-cell, .manual-input');
        let holdTimeout;

        scoreCells.forEach(cell => {
            cell.addEventListener('click', function () {
                const figure = this.getAttribute('data-figure');
                const playerIndex = this.getAttribute('data-player');
                let currentScore = this.tagName === "INPUT" ? parseInt(this.value, 10) : parseInt(this.textContent.trim(), 10) || 0;

                if (isNaN(currentScore)) currentScore = 0;

                if (fixedScores[figure]) {
                    this.textContent = fixedScores[figure];
                } else if (!isNaN(currentScore)) {
                    let figureValue = parseInt(figure, 10);
                    currentScore += figureValue;

                    if (currentScore > figureValue * 5) {
                        this.textContent = figureValue;  // Revenir à la valeur de base après 5 fois
                    } else {
                        this.textContent = currentScore;
                    }
                }
            });

            cell.addEventListener('mousedown', function () {
                const figure = this.getAttribute('data-figure');
                if (figure !== "T" && figure !== "TT") {
                    holdTimeout = setTimeout(() => {
                        this.textContent = ''; // Efface le contenu de la case après 1s de maintien
                    }, 1000);
                }
            });

            cell.addEventListener('mouseup', function () {
                clearTimeout(holdTimeout);
            });

            cell.addEventListener('mouseleave', function () {
                clearTimeout(holdTimeout);
            });
        });
    });
});