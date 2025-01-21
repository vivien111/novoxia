document.addEventListener('DOMContentLoaded', function() {
    const apiToken = localStorage.getItem('token');
    const utilisateurId = localStorage.getItem('utilisateurId');

    if (!apiToken || !utilisateurId) {
        window.location.href = '/login.html'; // Rediriger vers la page de connexion si nécessaire
    } else {
        fetchUtilisateurData(utilisateurId, apiToken);
    }

    function fetchUtilisateurData(utilisateurId, apiToken) {
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
            const response = await fetch(`https://novoxia-back-end.onrender.com/historique/${accountNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des transactions');
            }

            const transactions = await response.json();
            const transactionsList = document.getElementById('transactions-liste');
            transactionsList.innerHTML = ''; // Vider la liste avant d'ajouter de nouvelles transactions

            // Grouper les transactions par date
            const transactionsGroupedByDate = transactions.reduce((group, transaction) => {
                if (transaction.to_user_id === accountNumber) { // Filtrer uniquement les transactions entrantes
                    const date = formatDate(transaction.created_at);
                    if (!group[date]) {
                        group[date] = [];
                    }
                    group[date].push(transaction);
                }
                return group;
            }, {});

            // Générer le HTML pour chaque groupe de transactions
            Object.keys(transactionsGroupedByDate).forEach(date => {
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('boder-bottom-activity');

                const dateHeader = document.createElement('h2');
                dateHeader.classList.add('activity-date');
                dateHeader.textContent = date;
                dateDiv.appendChild(dateHeader);

                transactionsGroupedByDate[date].forEach(transaction => {
                    const transactionDiv = document.createElement('div');
                    transactionDiv.classList.add('all-details-wrap', 'mt-16', 'Preapproved-redirect');

                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('all-details-name');
                    detailsDiv.innerHTML = `
                        <h3>${transaction.expediteur}</h3>
                        <p>${transaction.description || 'Pago recibido'} - Completado </p>
                    `;

                    const amountDiv = document.createElement('div');
                    amountDiv.classList.add('all-content-price');
                    amountDiv.innerHTML = `
                        <p>+ ${transaction.amount} €</p>
                    `;

                    transactionDiv.appendChild(detailsDiv);
                    transactionDiv.appendChild(amountDiv);
                    dateDiv.appendChild(transactionDiv);
                });

                transactionsList.appendChild(dateDiv);
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-US', options);
    }
});
