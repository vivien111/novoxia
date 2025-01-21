document.addEventListener('DOMContentLoaded', function() {
    const amount = localStorage.getItem('transferAmount');
    const beneficiaire = localStorage.getItem('transferBeneficiaire');
    const expediteur = localStorage.getItem('transferExpediteur');
    const to_user_id = localStorage.getItem('transferTo_user_id');
    const from_user_id = localStorage.getItem('transferFrom_user_id');
    const bic = localStorage.getItem('transferBic');

    // Fonction pour générer un ID numéro aléatoire
    function generateRandomId() {
        const randomNumber = Math.floor(Math.random() * 90000000000000) + 10000000000000;
        return randomNumber.toString();
    }

    // Générer l'ID numéro aléatoire
    const idNumero = generateRandomId();
    if (!amount || !to_user_id) {
        window.location.href = '/dashboard.html';
    } else {
    const transferDetails = document.getElementById('transferDetails');
    transferDetails.innerHTML = `
    <div class="bill-amount">
        <div class="bill-amount-content">
            <span>NÚMERO DE REF.</span>
            <span>${idNumero}</span>
        </div>
    </div>
    <div class="bill-amount mt-16">
        <div class="bill-amount-content">
            <span>Nombre y apellido</span>
            <span>${beneficiaire}</span>
        </div>
    </div>
    <div class="bill-amount mt-16">
        <div class="bill-amount-content">
            <span>IBAN del beneficiario</span>
            <span>${to_user_id}</span>
        </div>
    </div>
    <div class="bill-amount mt-16">
        <div class="bill-amount-content">
            <span>BIC/SWIFT</span>
            <span>${bic}</span>
        </div>
    </div>
    <div class="bill-amount mt-16">
        <div class="bill-amount-content">
            <span>Cantidad</span>
            <span class="color-red">${amount} €</span>
        </div>
    </div>`;
}
    document.getElementById('confirmTransfer').addEventListener('click', async function() {
        const transferData = {
            amount: parseFloat(amount), // Convertir en nombre
            beneficiaire: beneficiaire,
            expediteur: expediteur,
            to_user_id: to_user_id
        };

        for (let key in transferData) {
            if (!transferData[key]) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: `${key} est manquant.`
                });
                return;
            }
        }

        console.log('Données envoyées:', transferData);

        const apiUrl = `https://novoxia-back-end.onrender.com/transferts/${from_user_id}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transferData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors du transfert. Veuillez vérifier les données.');
            }

            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Transfert effectué avec succès !'
            });
            console.log(data);

            localStorage.removeItem('transferBeneficiaire');
            localStorage.removeItem('transferExpediteur');
            localStorage.removeItem('transferFrom_user_id');
            localStorage.removeItem('transferBic');

            window.location.href = 'confirmation-depot.html';
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Erreur lors du transfert : ${error.message}`
            });
            console.error(error);
        }
    });

    document.getElementById('cancelTransfer').addEventListener('click', function() {
        localStorage.removeItem('transferAmount');
        localStorage.removeItem('transferBeneficiaire');
        localStorage.removeItem('transferExpediteur');
        localStorage.removeItem('transferTo_user_id');
        localStorage.removeItem('transferFrom_user_id');
        localStorage.removeItem('transferBic');

        window.location.href = 'dashboard.html';
    });
});
