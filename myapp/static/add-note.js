document.addEventListener('DOMContentLoaded', function() {
    const releaseDateInput = document.getElementById('releaseDate');
    const releaseTimeInput = document.getElementById('releaseTime');
    const releasePreview = document.getElementById('releasePreview');

    const today = new Date().toISOString().split('T')[0];
    releaseDateInput.min = today;

    const now = new Date();
    now.setHours(now.getHours() + 1);
    releaseTimeInput.value = now.toTimeString().slice(0, 5);

    function updatePreview() {
        const date = releaseDateInput.value;
        const time = releaseTimeInput.value;

        if (date && time) {
            const releaseDateTime = new Date(`${date}T${time}`);
            const now = new Date();

            if (releaseDateTime <= now) {
                releasePreview.textContent = 'Please select a future date and time';
                releasePreview.style.color = 'var(--destructive)';
                return;
            }

            releasePreview.style.color = 'var(--muted-foreground)';
            releasePreview.textContent = `Your note will be revealed on ${releaseDateTime.toLocaleString()}`;
        } else {
            releasePreview.textContent = 'Select a date and time to see when your note will be revealed';
            releasePreview.style.color = 'var(--muted-foreground)';
        }
    }

    releaseDateInput.addEventListener('change', updatePreview);
    releaseTimeInput.addEventListener('change', updatePreview);

    updatePreview();
});
