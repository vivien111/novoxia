document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device ready event triggered');
    const permissionSwitch = document.getElementById('permission_switch');
    
    if (permissionSwitch) {
        permissionSwitch.addEventListener('change', function() {
            if (this.checked) {
                requestCameraPermission();
            } else {
                alert('La permission de la caméra est désactivée.');
            }
        });
    } else {
        console.warn('Element avec l\'ID "permission_switch" non trouvé.');
    }

    StatusBar.backgroundColorByHexString("#F24822");

    var permissions = cordova.plugins.permissions;

    permissions.requestPermission(permissions.RECORD_AUDIO, function(status) {
        if (status.hasPermission) {
            console.log("Permission microphone accordée");
        } else {
            console.log("Permission microphone refusée");
        }
    }, function(error) {
        console.error("Erreur lors de la demande de permission: ", error);
    });

    permissions.requestPermission(permissions.POST_NOTIFICATIONS, function(status) {
        if (status.hasPermission) {
            console.log("Permission notifications accordée");
        } else {
            console.log("Permission notifications refusée");
        }
    }, function(error) {
        console.error("Erreur lors de la demande de permission: ", error);
    });

    cordova.plugins.notification.local.schedule({
        title: 'Notification Titre',
        text: 'Notification Message',
        foreground: true
    });

    var src = "myrecording.mp3";
    var mediaRec = new Media(src,
        function() {
            console.log("Enregistrement terminé");
        },
        function(err) {
            console.log("Erreur durant l'enregistrement : " + err.code);
        }
    );

    mediaRec.startRecord();

    setTimeout(function() {
        mediaRec.stopRecord();
    }, 10000);

    console.log('Chemin actuel:', window.location.pathname);

    if (window.location.pathname.endsWith('index.html')) {
        var token = localStorage.getItem('token');
        console.log('Token détecté:', token);

        if (token) {
            console.log('Redirection prévue dans 1 seconde...');
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 100);
        } else {
            console.log('Aucun token détecté. Rester sur la page actuelle.');
        }
    } else {
        console.log('Page actuelle non index.html. Aucune redirection nécessaire.');
    }

    updateAPI();
}

function requestCameraPermission() {
    cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.CAMERA, function(status) {
        if (status.hasPermission) {
            alert('Permission de la caméra accordée.');
        } else {
            alert('Permission de la caméra refusée.');
        }
    }, function(error) {
        console.error('Erreur lors de la demande de permission :', error);
        alert('Erreur lors de la demande de permission.');
    });
}

function updateAPI() {
    const apiURL = 'https://novoxia-back-end.onrender.com/data';

    fetch(apiURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse de l\'API:', data);
    })
    .catch(error => {
        console.error('Erreur lors de la requête API:', error);
    });
}
