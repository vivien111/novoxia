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
        .then(data => {
            const nomComplet = `${data.utilisateur.nom || ''} ${data.utilisateur.prenom || ''}`;
            const expediteurElement = document.getElementById('expediteur');
            if (expediteurElement) {
                expediteurElement.value = nomComplet.trim() || 'Non spécifié';
            }
            
            const emailElement = document.getElementById('email');
            if (emailElement) {
                emailElement.textContent = data.utilisateur.email || 'Non spécifié';
            }
            
            const soldElement = document.getElementById('sold');
            if (soldElement) {
                soldElement.textContent = convertToKilo(data.utilisateur.solde) || 'Non spécifié';
            }
            const creditElement = document.getElementById('credit');
            if (creditElement) {
                creditElement.textContent = convertToKilo(data.utilisateur.credit) || 'Non spécifié';
            }
            
            const utilisateurIdElement = document.getElementById('utilisateur_id');
            if (utilisateurIdElement) {
                utilisateurIdElement.value = data.utilisateur.id || 'Non spécifié';
            }
            
            const fromUserIdElement = document.getElementById('from_user_id');
            if (fromUserIdElement) {
                fromUserIdElement.value = data.utilisateur.account_number || 'Non spécifié';
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations:', error);
        });
    }

    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('token');
            localStorage.removeItem('utilisateurId');
            window.location.href = '/sign-in.html';
        });
    }
});

function convertToKilo(amount) {
    if (amount >= 1000) {
        const amountInKilo = amount / 1000;
        return `€ ${amountInKilo.toFixed(1)}k`;
    } else {
        return `€ ${amount}`;
    }
}

  // Fonction pour obtenir l'heure actuelle
  function getCurrentTime() {
    return new Date().getHours();
}

// Fonction pour afficher le message de salutation en fonction de l'heure
function displayGreeting() {
    const currentTime = getCurrentTime();
    let greetingMessage;

    if (currentTime >= 5 && currentTime < 12) { // Matin
        greetingMessage = 'Buenos dias';
    } else if (currentTime >= 12 && currentTime < 18) { // Après-midi
        greetingMessage = 'Buenas tardes';
    } else { // Soir
        greetingMessage = 'Buenas noches';
    }

    // Sélection de l'élément de salutation et ajout du message
    const greetingElement = document.getElementById('greeting');
    greetingElement.innerHTML = ` <span> Ey ${greetingMessage}</span>` + greetingElement.innerHTML;
}

// Appel de la fonction pour afficher la salutation et "Welcome back"
displayGreeting();