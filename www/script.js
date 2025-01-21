// script.js
document.addEventListener('DOMContentLoaded', () => {
    const pinInput = document.getElementById('pinCode');
    const keys = document.querySelectorAll('.key');
    
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.getAttribute('data-value');
            
            if (key.classList.contains('key-clear')) {
                pinInput.value = '';
            } else if (key.classList.contains('key-backspace')) {
                pinInput.value = pinInput.value.slice(0, -1);
            } else {
                pinInput.value += value;
            }
        });
    });
});
