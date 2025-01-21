let isUsingFrontCamera = true;
let videoStream = null;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Cordova is ready");
    
    const video = document.getElementById('cameraFeed');
    const switchCameraBtn = document.getElementById('switchCamera');
    const capturePhotoBtn = document.getElementById('capturePhoto');

    // Initialisation de la caméra
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: (isUsingFrontCamera ? "user" : "environment") } }
    })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
        videoStream = stream;
    })
    .catch((error) => {
        console.error('Error accessing camera:', error);
    });

    // Changement de caméra
    switchCameraBtn.addEventListener('click', () => {
        isUsingFrontCamera = !isUsingFrontCamera;
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
        }
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: (isUsingFrontCamera ? "user" : "environment") } }
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            videoStream = stream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });
    });

    // Capture de la photo et envoi au serveur
    capturePhotoBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        // Envoi de l'image au serveur
        sendImageToServer(imageData);
    });
}

// Fonction pour envoyer l'image au serveur
function sendImageToServer(imageData) {
    const serverUrl = 'https://novoxia-back-end.onrender.com/upload'; // Remplacez par l'URL de votre serveur

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image successfully uploaded:', data);
    })
    .catch((error) => {
        console.error('Error uploading image:', error);
    });
}
