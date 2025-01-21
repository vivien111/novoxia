document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    // Récupérer les valeurs des champs
    const identifier = document.getElementById('mobile_code').value;
    const motDePasse = document.getElementById('motDePasse').value;

    // Créer l'objet de données à envoyer au serveur
    const data = {
        identifier: identifier,
        motDePasse: motDePasse
    };

    try {
        const response = await fetch('https://novoxia-back-end.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Conexión exitosa',
                text: '¡Has iniciado sesión correctamente!',
            }).then(() => {
                // Vibrer une fois le Swal fermé, si la fonctionnalité est disponible
                if (navigator.vibrate) {
                    navigator.vibrate([400, 200, 200]);
                }
        
                // Stocker les informations dans le localStorage et rediriger
                localStorage.setItem('estDejaConnecte', 'true');
                localStorage.setItem('token', result.token);
                localStorage.setItem('utilisateurId', result.utilisateurId);
                window.location.href = '/data-frame.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: result.message || 'Error desconocido al conectar.',
            });
        
            // Vibrer pour signaler une erreur, si la fonctionnalité est disponible
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            }
        }        
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Ha ocurrido un error. Por favor inténtalo de nuevo.',
        });
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    } finally {
        // Hide spinner after request is complete
        spinner.style.display = 'none';
    }
});
