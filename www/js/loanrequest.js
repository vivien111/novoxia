document.addEventListener('DOMContentLoaded', function() {
    const apiToken = localStorage.getItem('token');
    const utilisateurId = localStorage.getItem('utilisateurId');
    
    if (!apiToken || !utilisateurId) {
        window.location.href = '/login.html'; // Rediriger vers la page de connexion si nécessaire
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
            
            // Attribution de la valeur aux éléments
            assignValue('nom_prenom', nomComplet);
            assignValue('from_user_id', utilisateur.account_number || 'Non spécifié');
            assignTextContent('solde', `${solde || 0}`);
            formatSolde(document.getElementById('solde'));
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations:', error);
            // Traitez l'erreur ou redirigez l'utilisateur vers la page de connexion
        });
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('utilisateurId');
        window.location.href = '/login.html';
    });
});

function assignTextContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = content;
    }
}

function assignValue(elementId, value) {
    const element = document.getElementById(elementId);
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
            soldeElement.textContent =  "€ " + montantEnK + " k";
        } else {
            soldeElement.textContent = "€ " + montantEnCentimes + (montantEnCentimes !== 1000 ? "" : " k");
        }
    } else {
        console.error("L'élément avec l'ID 'solde' n'a pas été trouvé.");
    }
}
