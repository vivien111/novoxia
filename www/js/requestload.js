document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupérer les valeurs des champs de formulaire par le nom
    const form = event.target;
    const paymentMethod = form.elements.namedItem('paymentMethod').value; // Récupérer le type de paiement

    // Vérifier que les valeurs ne sont pas des objets
    if ( typeof paymentMethod !== 'object') {
        
        // Stocker les valeurs dans localStorage en tant que chaînes de caractères

        // Rediriger vers la page appropriée en fonction de la sélection de paiement
        if (paymentMethod === 'Paypal') {
            window.location.href = 'transfer-bank2.html'; // Remplacez par l'URL de la page de crédit
        } else if (paymentMethod === 'Bank') {
            window.location.href = 'e-wallet2.html';
        }
    } else {
        alert('Veuillez entrer des valeurs valides.');
    }
});
