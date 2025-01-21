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
            // Attribution de la valeur à l'élément 'nom_prenom' s'il existe
            const nomPrenomElement = document.getElementById('nom_prenom');
            if (nomPrenomElement) {
                nomPrenomElement.value = nomComplet;
            }
            const nomPrenomElement2 = document.getElementById('nomprenom');
            if (nomPrenomElement2) {
                nomPrenomElement2.textContent = nomComplet;
            }
            const nomPrenomElement3 = document.getElementById('nomprenome');
            if (nomPrenomElement3) {
                nomPrenomElement3.value = nomComplet;
            }
            // Attribution de la valeur à l'élément 'email' s'il existe
            const emailElement = document.getElementById('email');
            if (emailElement) {
                emailElement.value = utilisateur.email || 'Non spécifié';
            }
            const adresseElement = document.getElementById('adresse');
            if (adresseElement) {
                adresseElement.value = utilisateur.adresse || 'Non spécifié';
            }
            const BirthElement = document.getElementById('Birth');
            if (BirthElement) {
                BirthElement.value = utilisateur.date_de_naissance || 'Non spécifié';
            }
            const genderElement = document.getElementById('gender');
            if (genderElement) {
                genderElement.value = utilisateur.account_number || 'Non spécifié';
            }
            const IbanElement = document.getElementById('iban');
            if (IbanElement) {
                IbanElement.textContent = utilisateur.iban || 'Non spécifié';
            }
            const BicElement = document.getElementById('bic');
            if (BicElement) {
                BicElement.textContent = utilisateur.bic || 'Non spécifié';
            }
            // Attribution de la valeur à l'élément 'userId' s'il existe
            const userIdElement = document.getElementById('userId');
            if (userIdElement) {
                userIdElement.value = utilisateur.id || 'Non spécifié';
            }
            // Attribution de la valeur à l'élément 'solde' s'il existe
            const soldeElement = document.getElementById('solde');
            if (soldeElement) {
                soldeElement.textContent = `${solde || 0}`;
                formatSolde(soldeElement);
            }
            // Continuez avec d'autres éléments si nécessaire
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations:', error);
            // Traitez l'erreur ou redirigez l'utilisateur vers la page de connexion
        });
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = '/sign-in.html';
    });
});

function formatSolde(soldeElement) {
    if (soldeElement) {
        let montantEnCentimes = parseInt(soldeElement.textContent);
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
