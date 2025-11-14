// dashboard.js – handles filter buttons (All / Locked / Unlocked)
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const tabBtns = document.querySelectorAll('.tab-btn');
    const notes = document.querySelectorAll('.note-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            notes.forEach(note => {
                if (filter === 'all') {
                    note.style.display = 'block';
                } else if (filter === 'locked' && note.classList.contains('note-card-locked')) {
                    note.style.display = 'block';
                } else if (filter === 'unlocked' && note.classList.contains('note-card-unlocked')) {
                    note.style.display = 'block';
                } else {
                    note.style.display = 'none';
                }
            });
        });
    });
});