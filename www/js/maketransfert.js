document.getElementById('transferForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    // Récupérer les valeurs des champs de formulaire par le nom
    const form = event.target;
    const amount = form.elements.namedItem('amount').value;
    const bic = form.elements.namedItem('bic').value;
    const beneficiaire = form.elements.namedItem('beneficiaire').value;
    const expediteur = form.elements.namedItem('expediteur').value;
    const to_user_id = form.elements.namedItem('to_user_id').value;
    const from_user_id = form.elements.namedItem('from_user_id').value;
    const paymentMethod = form.elements.namedItem('paymentMethod').value; // Récupérer le type de paiement

    // Vérifier que les valeurs ne sont pas des objets
    if (typeof amount !== 'object' && typeof beneficiaire !== 'object' &&
        typeof expediteur !== 'object' && typeof to_user_id !== 'object' &&
        typeof paymentMethod !== 'object') {
        
        // Stocker les valeurs dans localStorage en tant que chaînes de caractères
        localStorage.setItem('transferAmount', amount);
        localStorage.setItem('transferBeneficiaire', beneficiaire);
        localStorage.setItem('transferExpediteur', expediteur);
        localStorage.setItem('transferTo_user_id', to_user_id);
        localStorage.setItem('transferFrom_user_id', from_user_id);
        localStorage.setItem('transferBic', bic);

        // Rediriger vers la page appropriée en fonction de la sélection de paiement
        if (paymentMethod === 'credit') {
            window.location.href = 'page-credit.html'; // Remplacez par l'URL de la page de crédit
        } else if (paymentMethod === 'balance') {
            window.location.href = 'details-transfert.html';
        }
    } else {
        alert('Veuillez entrer des valeurs valides.');
    }
});
