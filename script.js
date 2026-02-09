/**
 * John Ogletree Portfolio - Main Logic
 * Single-file, no-build configuration
 */

// --- 1. Newsletter Functions ---
function subscribeNewsletter() {
    const firstName = document.getElementById('newsletter-firstname')?.value.trim();
    const lastName = document.getElementById('newsletter-lastname')?.value.trim();
    const email = document.getElementById('newsletter-email')?.value.trim();
    const consent = document.getElementById('newsletter-consent')?.checked;
    const topics = Array.from(document.querySelectorAll('.topic-checkbox:checked')).map(cb => cb.value);
    
    const messageDiv = document.getElementById('newsletter-message');
    
    if (!messageDiv) return;
    
    // Validation
    if (!firstName || !lastName || !email) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (topics.length === 0) {
        showMessage('Please select at least one topic of interest.', 'error');
        return;
    }
    
    if (!consent) {
        showMessage('Please agree to receive newsletters.', 'error');
        return;
    }
    
    showMessage('Subscribing...', 'info');
    
    setTimeout(() => {
        showMessage('🎉 Success! Thank you for subscribing.', 'success');
        // Form Clear
        document.getElementById('newsletter-firstname').value = '';
        document.getElementById('newsletter-lastname').value = '';
        document.getElementById('newsletter-email').value = '';
        document.querySelectorAll('.topic-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('newsletter-consent').checked = false;
    }, 1500);
}

function showMessage(text, type) {
    const messageDiv = document.getElementById('newsletter-message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.fontSize = '0.9rem';
    
    // UI Feedback styling
    if (type === 'error') {
        messageDiv.style.backgroundColor = 'rgba(255, 87, 87, 0.1)';
        messageDiv.style.border = '1px solid #ff5757';
        messageDiv.style.color = '#ff5757';
    } else if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(78, 201, 176, 0.1)';
        messageDiv.style.border = '1px solid #4ec9b0';
        messageDiv.style.color = '#4ec9b0';
    } else {
        messageDiv.style.backgroundColor = 'rgba(0, 122, 204, 0.1)';
        messageDiv.style.border = '1px solid var(--accent-blue)';
        messageDiv.style.color = 'var(--accent-blue)';
    }
}

// --- 2. FAQ Accordion Function ---
window.toggleFAQ = function(faqNumber) {
    const faqItem = document.querySelector(`.faq-question[onclick="toggleFAQ(${faqNumber})"]`)?.parentElement;
    const answer = document.getElementById(`faq-answer-${faqNumber}`);
    
    if (!faqItem || !answer) return;

    // Toggle active state
    faqItem.classList.toggle('active');
    answer.classList.toggle('active');
    
    // Mutual exclusivity: Close other FAQs
    if (faqItem.classList.contains('active')) {
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const otherAnswer = item.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.classList.remove('active');
            }
        });
    }
};

// --- 3. UI Helpers ---
window.toggleSidebar = function() {
    const navBar = document.getElementById('main-nav');
    const mainWorkspace = document.getElementById('main-workspace');
    
    navBar.classList.toggle('collapsed');
    navBar.classList.toggle('expanded');
    mainWorkspace.classList.toggle('expanded');
};

// --- 4. Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    // Initialize first FAQ as open by default
    if (typeof toggleFAQ === 'function') toggleFAQ(1);
});