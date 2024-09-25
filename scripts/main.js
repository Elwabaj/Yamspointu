// Déclarer showSection dans l'espace global pour que d'autres fichiers puissent l'appeler
window.showSection = function showSection(sectionToShow, sectionToHide) {
    document.getElementById(sectionToShow).style.display = 'block';
    document.getElementById(sectionToHide).style.display = 'none';
};

// Navigation : boutons de retour
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('backBtnPlayer').addEventListener('click', function () {
        showSection('mainMenu', 'playerSelection');
    });

    document.getElementById('backBtnRules').addEventListener('click', function () {
        showSection('mainMenu', 'rulesSection');
    });

    document.getElementById('backBtnScore').addEventListener('click', function () {
        showSection('mainMenu', 'scoreTableSection');
    });
});