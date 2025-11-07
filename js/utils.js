/**
 * Globe XM - Utilities Module
 * Helper functions for copy-to-clipboard, formatters, etc.
 */

// Copy to clipboard function
function copyToClipboard(text, button) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text, button);
        });
    } else {
        fallbackCopy(text, button);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textarea);
}

// Show copy feedback
function showCopyFeedback(button) {
    if (button) {
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }
}

// Initialize copy buttons
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy') || this.textContent;
            copyToClipboard(textToCopy, this);
        });
    });
});

// Format phone number
function formatPhone(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
    if (match) {
        return '+' + match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return phone;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            ${type === 'success' 
                ? '<path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                : '<path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
            }
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Export functions for use in other modules
window.GlobeXM = {
    copyToClipboard,
    formatPhone,
    showToast
};
