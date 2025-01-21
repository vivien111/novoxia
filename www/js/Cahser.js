document.addEventListener('DOMContentLoaded', function() {
    const apiToken = localStorage.getItem('token');
    const utilisateurId = localStorage.getItem('utilisateurId');
    
    if (!apiToken || !utilisateurId) {
        window.location.href = '/sign-in.html'; // Rediriger vers la page de connexion si nécessaire
    } else {
        fetch(`https://novoxia-back-end.onrender.com/profile/${utilisateurId}`, { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La réponse du serveur n\'est pas OK');
            }
            return response.json();
        })
        .then(({ utilisateur, solde }) => {
            // Concaténation du nom et du prénom
            const nomComplet = `${utilisateur.nom || 'Nom non spécifié'} ${utilisateur.prenom || 'Prénom non spécifié'}`;

            // Mise à jour des éléments du DOM s'ils existent
            updateElementContent('nom_prenom', nomComplet);
            updateElementContent('nomprenom', nomComplet);
            updateElementValue('nomprenome', nomComplet);
            updateElementContent('email', utilisateur.email || 'Non spécifié');
            updateElementValue('iban', utilisateur.iban || 'Non spécifié');
            updateElementValue('bic', utilisateur.bic || 'Non spécifié');
            updateElementValue('userId', utilisateur.id || 'Non spécifié');

            // Mise à jour du solde et formatage
            const soldeElement = document.getElementById('solde');
            if (soldeElement) {
                soldeElement.textContent = `${solde || 0}`;
                formatSolde(soldeElement);
            }

            // Vérification et affichage du statut pour le débogage
            const statut = parseInt(utilisateur.statut, 10);
            console.log("Statut de l'utilisateur:", statut);

            // Redirection en fonction du statut de l'utilisateur
            const currentLocation = window.location.pathname;
            switch (statut) {
                case 1:
                    if (currentLocation !== '/verification.html') {
                        window.location.href = '/verification.html';
                    }
                    break;
                case 2:
                    if (currentLocation !== '/waitverification.html') {
                        window.location.href = '/waitverification.html';
                    }
                    break;
                case 3:
                    if (currentLocation !== '/dashboard.html') {
                        window.location.href = '/dashboard.html';
                    }
                    break;
                default:
                    console.error("Statut inconnu:", statut);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations:', error);
            window.location.href = '/sign-in.html';
        });
    }

    // Gestion de la déconnexion
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = '/sign-in.html';
        });
    }
});

function updateElementContent(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    }
}

function updateElementValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

function formatSolde(soldeElement) {
    if (soldeElement) {
        let montantEnCentimes = parseInt(soldeElement.textContent, 10);
        let montantEnK;
        if (montantEnCentimes >= 1000) {
            montantEnK = montantEnCentimes / 1000;
            soldeElement.textContent = "€ " + montantEnK + " k";
        } else {
            soldeElement.textContent = "€ " + montantEnCentimes;
        }
    } else {
        console.error("L'élément avec l'ID 'solde' n'a pas été trouvé.");
    }
}
