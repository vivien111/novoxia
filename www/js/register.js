document.addEventListener('DOMContentLoaded', function () {
    const fieldsets = document.querySelectorAll('#msform fieldset');
    let currentFieldsetIndex = 0;

    if (!fieldsets.length) {
        console.error('Aucun fieldset trouvé dans le formulaire');
        return;
    }

    // Fonction pour afficher le fieldset basé sur l'index
    function showFieldset(index) {
        fieldsets.forEach((fieldset, i) => {
            fieldset.style.display = i === index ? 'block' : 'none';
        });
    }

    // Fonction pour collecter et stocker les données du formulaire dans localStorage
    function collectFormData() {
        const data = {};
        document.querySelectorAll('#msform input').forEach(input => {
            if (input.id) {
                data[input.id] = input.value;
            }
        });
        console.log('Données du formulaire collectées :', data); // Affiche les données collectées dans la console
        return data;
    }

    // Fonction pour soumettre les données du formulaire à l'API
    function submitForm(data) {
        console.log('Envoi des données à l\'API :', data); // Affiche les données envoyées à l'API

        fetch('https://novoxia-back-end.onrender.com/inscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse de l\'API :', data); // Affiche la réponse de l'API
        })
        .catch((error) => {
            console.error('Erreur :', error); // Affiche les erreurs dans la console
        });
    }

    // Gestionnaires d'événements pour les boutons de navigation
    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', function () {
            if (button.id === 'final-next') {
                // Collecter les données et les envoyer au serveur lorsqu'on clique sur le dernier bouton Next
                const formData = collectFormData();
                submitForm(formData);
            } else {
                // Gérer la navigation entre les fieldsets
                collectFormData(); // Collecte les données avant de changer de fieldset
                if (currentFieldsetIndex < fieldsets.length - 1) {
                    currentFieldsetIndex++;
                    showFieldset(currentFieldsetIndex);
                }
            }
        });
    });

    document.querySelectorAll('.previous').forEach(button => {
        button.addEventListener('click', function () {
            if (currentFieldsetIndex > 0) {
                currentFieldsetIndex--;
                showFieldset(currentFieldsetIndex);
            }
        });
    });

    // Initialise en affichant le premier fieldset
    showFieldset(currentFieldsetIndex);
});
