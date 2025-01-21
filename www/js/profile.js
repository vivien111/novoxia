document.addEventListener('DOMContentLoaded', async function() {
    // Récupérer l'ID de l'utilisateur depuis localStorage
    const utilisateurId = localStorage.getItem('utilisateurId');

    if (!utilisateurId) {
        console.error('ID utilisateur non trouvé dans localStorage.');
        return;
    }

    // Construire l'URL pour récupérer les informations de l'utilisateur
    const url = `https://finaon.onrender.com/profile/${utilisateurId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Afficher les informations de l'utilisateur
            console.log('Informations de l\'utilisateur:', data.utilisateur);

            // Exemple d'affichage dans le DOM
            const userInfoElement = document.getElementById('userInfo');
            userInfoElement.innerHTML = `
                <li>Informations de l'utilisateur</li>
                <li>Email: ${data.utilisateur.email}</li>
                <li>Pays: ${data.utilisateur.pays}</li>
                <li>Téléphone: ${data.utilisateur.telephone}</li>
                <li>Adresse: ${data.utilisateur.adresse}, ${data.utilisateur.ville}, ${data.utilisateur.code_postal}</li>
                <li>Numéro de compte: ${data.utilisateur.account_number}</li>
            `;
        } else {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', data.message || 'Erreur inconnue.');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});
