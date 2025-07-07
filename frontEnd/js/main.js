const downloadBtn = document.querySelector('.js-download-btn');
const clickSound = document.getElementById('click-sound');

downloadBtn.addEventListener('click', (event) => {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => { /* console.error("Error playing sound:", e) */ });
});

document.addEventListener('contextmenu', event => event.preventDefault());