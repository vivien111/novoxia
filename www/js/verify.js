async function checkBalanceAndNotify(actionType) {
    const userId = localStorage.getItem('utilisateurId');

    try {
        const response = await fetch(`https://novoxia-back-end.onrender.com/profile/${userId}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération du solde');
        }
        const data = await response.json();
        
        const balance = parseFloat(data.utilisateur.solde);

        if (isNaN(balance)) {
            throw new Error('Le solde récupéré n\'est pas valide');
        }

        if (balance === 0 && actionType === 'credit') {
            showToast("Tu saldo es cero. Deposite fondos en su cuenta antes de solicitar crédito.", 'red');
        } else {
            if (balance === 0 && actionType === 'transfer') {
                showToast("Tu saldo es negativo. Recarga tu cuenta antes de realizar una transferencia.", 'red');
            } else {
                redirectToPage(actionType); // Rediriger vers une page spécifique selon l'action
            }
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du solde : ', error);
        showToast('Erreur lors de la récupération du solde.', 'red');
    }
}

function redirectToPage(actionType) {
    if (actionType === 'credit') {
        // Rediriger vers la page de demande de crédit
        window.location.href = 'page_credit.html';
    } else if (actionType === 'transfer') {
        // Rediriger vers la page de transfert
        window.location.href = 'send-money.html';
    }
}

function showToast(message, backgroundColor) {
    Toastify({
        text: message,
        duration: 3000,
        backgroundColor: backgroundColor,
        gravity: 'top'
    }).showToast(() => {
        setTimeout(() => {
            showToast("Autre message à afficher", 'blue');
        }, 1000);
    });
}