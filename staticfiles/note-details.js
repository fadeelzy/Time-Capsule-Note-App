// note-details.js — Simplified Django-based version

document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const releaseDateString = countdownElement?.dataset?.releaseDate;
    if (countdownElement && releaseDateString) {
        const releaseDate = new Date(releaseDateString.replace(' ', 'T'));
        startCountdown(countdownElement, releaseDate);
    }
    lucide.createIcons();
});

function startCountdown(countdownElement, releaseDate) {
    function updateCountdown() {
        const now = new Date();
        const diff = releaseDate - now;

        if (diff <= 0) {
            // When unlocked, reload page to show content
            location.reload();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m`;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // refresh every minute
}
