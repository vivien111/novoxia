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

    const transferDetails = document.getElementById('transferDetails');
    transferDetails.innerHTML = `
    <div class="transfer-bank-success-content">
								<div class="transfer-content-details">
									<p>From</p>
									<div class="content-details mt-8">
										<div class="first-content">
											<div class="transfer-logo">
												<img src="assets/images/Novoxia.png" style="height: 50px" alt="logo">
											</div>
										</div>
										<div class="first-content">
											<h2>${expediteur}</h2>
											<p>${from_user_id}</p>
										</div>
									</div>
								</div>
								<div class="transfer-content-details mt-16 ">
									<p>To</p>
									<div class="content-details mt-8 pb-0 border-0">
										<div class="first-content">
											<div class="transfer-logo">
												<img src="assets/svg/home-icon.svg" alt="logo">
											</div>
										</div>
										<div class="first-content">
											<h2>${beneficiaire}</h2>
											<p>${to_user_id}</p>
										</div>
									</div>
								</div>
								<div class="sendmoney-content mt-24 ">
									<div class="sendmomey-details border-0">
										<span>Número de referencia</span>
										<span>${idNumero}</span>
									</div>
									<div class="sendmomey-details border-0">
										<span>Monto de la transferencia</span>
										<span>${amount} €</span>
									</div>
									<div class="sendmomey-details">
										<span>Tarifa</span>
										<span class="color-red">0.00</span>
									</div>
									<div class="sendmomey-details pb-0">
										<span>Conseguirás:</span>
										<span>${amount} €</span>
									</div>
								</div>
								<div class="estimated-time mt-24">
									<h2>Llegada Estimada: 2 días hábiles</h2>
									<p class="mt-12">Las transferencias realizadas después de las 7:00 PM ET o durante los fines de semana o días festivos tardan más. Todas las transferencias están sujetas a revisión y podrían retrasarse o detenerse si identificamos un problema</p>
								</div>
							</div>`;

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

        const apiUrl = `https://novoxia-back-end.onrender.com/loantransferts/${from_user_id}`;

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
                text: '¡Transferencia completada exitosamente!'
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
