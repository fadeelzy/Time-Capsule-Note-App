// app.js — Main app utilities (Django-compatible)


function navigateTo(urlName) {
    // Accept either full URL or relative Django URL
    if (urlName.startsWith('http') || urlName.startsWith('/')) {
        window.location.href = urlName;
    } else {
        window.location.href = `/${urlName}`;
    }
}

// ============================
// 🔹 Toast notification system
// ============================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ============================
// 🔹 Logout handler (server-side)
// ============================
function logout() {
    fetch('/logout/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCSRFToken(),
        },
    })
        .then(response => {
            if (response.ok) {
                showToast('Logged out successfully', 'success');
                setTimeout(() => {
                    navigateTo('/login/');
                }, 1000);
            } else {
                showToast('Logout failed. Try again.', 'error');
            }
        })
        .catch(() => {
            showToast('An error occurred during logout.', 'error');
        });
}

// ============================
// 🔹 Utility Functions
// ============================

// CSRF Token helper (for Django POST requests)
function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const trimmed = cookie.trim();
        if (trimmed.startsWith(name + '=')) {
            return trimmed.substring(name.length + 1);
        }
    }
    return '';
}

// Date formatting
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Countdown calculation (for locked notes)
function getTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff < 0) return 'Unlocked';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
}

// Initialize Lucide icons
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize all when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeIcons();

    // Optional: Automatically attach logout handler to button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// ============================
// 🔹 Export for global use
// ============================
window.appUtils = {
    navigateTo,
    showToast,
    logout,
    formatDate,
    getTimeRemaining,
    getCSRFToken,
};
