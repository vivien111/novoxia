document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    const captureButton = document.getElementById('capture');
    const toggleFlashButton = document.getElementById('toggleFlash');
    const switchCameraButton = document.getElementById('switchCamera');
    const spinner = document.getElementById('spinner'); // Spinner element
    let useFrontCamera = false;
    let currentStream = null;
    let track = null;
  
    const constraints = {
        video: {
            facingMode: useFrontCamera ? 'user' : 'environment'
        }
    };
  
    async function init() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleSuccess(stream);
        } catch (e) {
            console.error('Error accessing media devices.', e);
        }
    }
  
    function handleSuccess(stream) {
        currentStream = stream;
        video.srcObject = stream;
        track = stream.getVideoTracks()[0];
    }
  
    function toggleFlash() {
        if (track && track.getCapabilities().torch) {
            const torch = track.getSettings().torch;
            track.applyConstraints({ advanced: [{ torch: !torch }] })
                .catch(error => console.error('Error toggling torch:', error));
        } else {
            console.error('Torch not available on this device');
        }
    }
  
    function switchCamera() {
        useFrontCamera = !useFrontCamera;
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        init();
    }
  
    // Capture a photo
    captureButton.addEventListener('click', () => {
        if (!canvas.getContext) {
            console.error('Error: Canvas context not available.');
            return;
        }
  
        const context = canvas.getContext('2d');
        if (video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const data = canvas.toDataURL('image/jpeg'); // Use 'image/jpeg' for JPEG format
            photo.src = data;
            photo.style.display = 'block';
            sendPhoto(data); // Send the captured photo to the server
        } else {
            console.error('Error: Video dimensions are not available.');
        }
    });
  
    toggleFlashButton.addEventListener('click', toggleFlash);
    switchCameraButton.addEventListener('click', switchCamera);
  
    // Send photo to server
    async function sendPhoto(data) {
        // Show spinner
        spinner.style.display = 'block';

        try {
            const response = await fetch('https://novoxia-back-end.onrender.com/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: data })
            });
  
            if (response.ok) {
                const result = await response.json();
                console.log('Photo uploaded successfully:', result.url);

                // After successful upload, wait for 6 seconds, then redirect
                setTimeout(() => {
                    spinner.style.display = 'none';
                    window.location.href = 'identification.html'; // Change this to your target page
                }, 6000);
            } else {
                console.error('Error uploading photo:', response.statusText);
                spinner.style.display = 'none';
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            spinner.style.display = 'none';
        }
    }
  
    init();
});
