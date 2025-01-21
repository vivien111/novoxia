document.getElementById('loanRequestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission normale du formulaire

    // Crée un objet FormData pour accéder aux données du formulaire
    const formData = new FormData(event.target);

    // Récupère les valeurs des champs en utilisant leurs noms
    const fromUserId = formData.get('from_user_id');
    const amount = formData.get('amount');

    // Crée l'en-tête HTTP
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Crée le corps de la requête
    const raw = JSON.stringify({
        name: name,
        from_user_id: fromUserId,
        amount: parseInt(amount, 10)
    });

    // Configure les options de la requête
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    // Envoie la requête
    fetch("https://novoxia-back-end.onrender.com/loanrequest", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur dans la réponse du serveur');
            }
            return response.json(); // Parse la réponse en JSON
        })
        .then((result) => {
            console.log(result);
            if (result.success) {
                // Redirige vers la page de succès
                window.location.href = '/success.html';
            } else {
                // Gère l'erreur, affiche un message, etc.
                console.error('Erreur: ', result.message || 'La requête a échoué');
            }
        })
        .catch((error) => console.error('Erreur:', error));
});
