document.addEventListener('deviceready', function() {
    const polyglot = new Polyglot({
        phrases: {
            "en": {
                "welcome": "Welcome",
                "goodbye": "Goodbye"
            },
            "fr": {
                "welcome": "Bienvenue",
                "goodbye": "Au revoir"
            }
        },
        locale: navigator.language.split('-')[0] // Détecte la langue du téléphone
    });

    document.getElementById('welcome-text').innerText = polyglot.t('welcome');
    document.getElementById('goodbye-text').innerText = polyglot.t('goodbye');
});
