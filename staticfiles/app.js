// App.js - Main application logic and utilities

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Authentication check
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        navigateTo('login.html');
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        navigateTo('landing.html');
    }, 1000);
}

// Toast notification system
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

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Calculate time remaining
function getTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference < 0) {
        return 'Unlocked';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

// Check if note is unlocked
function isNoteUnlocked(releaseDate) {
    return new Date() >= new Date(releaseDate);
}

// Notes storage functions
function getNotes() {
    const notes = localStorage.getItem('timeCapsuleNotes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('timeCapsuleNotes', JSON.stringify(notes));
}

function getNoteById(id) {
    const notes = getNotes();
    return notes.find(note => note.id === id);
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate date is in the future
function isFutureDate(dateString) {
    return new Date(dateString) > new Date();
}

// Initialize page
function initializePage() {
    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });

    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// DOM ready function
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

// Initialize when DOM is ready
domReady(initializePage);

// Export functions for use in other files (if needed)
window.appUtils = {
    navigateTo,
    checkAuth,
    logout,
    showToast,
    generateId,
    formatDate,
    getTimeRemaining,
    isNoteUnlocked,
    getNotes,
    saveNotes,
    getNoteById,
    getUrlParameter,
    isValidEmail,
    isFutureDate
};