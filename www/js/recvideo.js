// script.js
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const spinner = document.getElementById('spinner');
    let mediaRecorder;
    let recordedChunks = [];

    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                sendVideo(blob);
            };

            // Start recording automatically
            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 5000); // Stop recording after 3 seconds
        })
        .catch(error => console.error('Error accessing media devices.', error));

    function sendVideo(blob) {
        spinner.style.display = 'block';

        const formData = new FormData();
        formData.append('video', blob, 'video.webm');

        fetch('https://novoxia-back-end.onrender.com/uploads', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Video uploaded successfully:', result);
            spinner.style.display = 'none';
        })
        .catch(error => {
            console.error('Error uploading video:', error);
            spinner.style.display = 'none';
        });
    }
});
