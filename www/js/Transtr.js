document.addEventListener('DOMContentLoaded', function() {
    const amount = localStorage.getItem('transferAmount') || '0,00';
    const to_user_id = localStorage.getItem('transferTo_user_id');

    if (!amount || !to_user_id) {
        window.location.href = '/dashboard.html';
    } else {
        const transferDetails = document.getElementById('transferDetails');
        transferDetails.innerHTML = `
            <h1>Tus ${amount} € están en camino</h1>
            <p class="mt-16">Llegada estimada: 2 días hábiles</p>
            <p class="mt-12">Estás transfiriendo dinero a: ${to_user_id}</p>
        `;

        document.getElementById('cancelTransfer').addEventListener('click', function() {
            localStorage.removeItem('transferAmount');
            localStorage.removeItem('transferBeneficiaire');
            localStorage.removeItem('transferExpediteur');
            localStorage.removeItem('transferTo_user_id');
            localStorage.removeItem('transferFrom_user_id');
            localStorage.removeItem('transferBic');

            window.location.href = 'dashboard.html';
        });
    }
});
