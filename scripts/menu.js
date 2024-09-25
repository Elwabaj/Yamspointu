document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('newGame').addEventListener('click', function () {
        showSection('playerSelection', 'mainMenu');
    });

    document.getElementById('rules').addEventListener('click', function () {
        showSection('rulesSection', 'mainMenu');
    });

    // Ajoute un événement pour réinitialiser le style de centrage au retour sur la page principale
    document.getElementById('backBtnPlayer').addEventListener('click', function () {
        showSection('mainMenu', 'playerSelection');
        resetMainMenuStyle(); // Réinitialise le style du menu
    });

    document.getElementById('backBtnRules').addEventListener('click', function () {
        showSection('mainMenu', 'rulesSection');
        resetMainMenuStyle(); // Réinitialise le style du menu
    });

    document.getElementById('backBtnScore').addEventListener('click', function () {
        showSection('mainMenu', 'scoreTableSection');
        resetMainMenuStyle(); // Réinitialise le style du menu
    });

    // Fonction pour réinitialiser le style flexbox du menu principal
    function resetMainMenuStyle() {
        const mainMenu = document.getElementById('mainMenu');
        mainMenu.style.display = 'flex';
        mainMenu.style.flexDirection = 'column';
        mainMenu.style.justifyContent = 'center'; // Centre verticalement
        mainMenu.style.alignItems = 'center'; // Centre horizontalement
        mainMenu.style.height = 'calc(100vh - 60px)'; // Ajuste la hauteur pour le centrage
    }
});