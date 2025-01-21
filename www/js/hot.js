document.addEventListener('DOMContentLoaded', function() {
    const apiToken = localStorage.getItem('token');
    const utilisateurId = localStorage.getItem('utilisateurId');

    if (!apiToken || !utilisateurId) {
        window.location.href = '/login.html'; // Rediriger vers la page de connexion si nécessaire
    } else {
        fetchUtilisateurData(utilisateurId, apiToken);
    }
    
    function fetchUtilisateurData(utilisateurId, apiToken) {
        fetch(`https://finaon.onrender.com/profile/${utilisateurId}`, { 
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
            const accountNumber = data.utilisateur.account_number;
            if (accountNumber) {
                fetchTransactions(accountNumber);
            } else {
                console.error('Numéro de compte non trouvé.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
        });
    }

    async function fetchTransactions(accountNumber) {
        try {
            const response = await fetch(`https://backend-zs1h.onrender.com/historique/RT1716407054745856`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des transactions');
            }
            const transactions = await response.json();

            const transactionsList = document.getElementById('transactions-list');
            transactionsList.innerHTML = ''; // Clear the list before adding new transactions

            transactions.forEach(transaction => {
                const div = document.createElement('div');
                div.classList.add('home-activity-bottom-wrap');

                const thumbDiv = document.createElement('div');
                thumbDiv.classList.add('mt-16');
                thumbDiv.innerHTML = `<img src="assets/img/transfer-svgrepo-com${transaction.from_user_id === accountNumber ? '-red' : ''}.svg" alt="img">`;

                const mediaBodyDiv = document.createElement('div');
                mediaBodyDiv.classList.add('home-first');
                mediaBodyDiv.innerHTML = `
                    <h3>${transaction.from_user_id === accountNumber ? transaction.beneficiaire : transaction.expediteur}</h3>
                    <p><span>${transaction.from_user_id}</span> ${transaction.from_user_id === accountNumber ? '-' : '+'}${transaction.amount} €</p>
                `;

                const button = document.createElement('button');
                button.setAttribute('data-bs-toggle', 'modal');
                button.setAttribute('data-bs-target', '#detailsModal');
                button.textContent = transaction.status;
                button.addEventListener('click', () => {
                    document.getElementById('modal-body-content').innerHTML = `
                        <label>Nom et Prenom du Beneficiaire</label>
                        <div class="single-input-wrap style-2">
                            <input type="text" class="form-control" placeholder="62016597" value="${transaction.beneficiaire}" readonly>
                        </div>
                        <label>IBAN du Beneficiaire</label>
                        <div class="single-input-wrap style-2">
                            <input type="text" class="form-control" placeholder="62016597" value="${transaction.to_user_id}" readonly>
                        </div>
                        <label>Description</label>
                        <div class="single-input-wrap style-2">
                            <input type="text" class="form-control" placeholder="62016597" value="${transaction.description || 'Aucune description'}" readonly>
                        </div>
                        <label>Date du Transfert</label>
                        <div class="single-input-wrap style-2">
                            <input type="text" class="form-control" placeholder="62016597" value="${transaction.date ? formatDateToLetters(transaction.date) : 'Aucune description'}" readonly>
                        </div>
                        <label>Montant</label>
                        <div class="single-input-wrap style-2">
                            <input type="text" class="form-control" placeholder="200 XOF" value="${transaction.amount} €" readonly>
                        </div>
                        <a type="button" class="btn btn-base w-100" data-bs-dismiss="modal">Annuler</a>
                    `;
                });

                div.appendChild(thumbDiv);
                div.appendChild(mediaBodyDiv);
                div.appendChild(button);

                transactionsList.appendChild(div);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des transactions:', error);
        }
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('utilisateurId');
        window.location.href = '/login.html';
    });

    function formatDateToLetters(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }
});
