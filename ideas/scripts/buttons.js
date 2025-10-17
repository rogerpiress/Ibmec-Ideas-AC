// buttons.js — Add interactive feedback to pill buttons and hero actions
(function() {
    // Helper to add loading state to a button
    function setLoading(el, isLoading) {
        if (isLoading) {
            el.style.position = 'relative';
            el.dataset.originalText = el.textContent;
            el.style.paddingRight = '32px';
            // Add subtle loading dots
            el.textContent = 'Carregando...';
            el.classList.add('is-loading');
        } else {
            el.style.paddingRight = '';
            el.textContent = el.dataset.originalText;
            el.classList.remove('is-loading');
        }
    }

    // Add hover effects and click feedback to all pill buttons
    document.querySelectorAll('.pill').forEach(pill => {
        // Ensure focusable
        if (!pill.hasAttribute('tabindex')) {
            pill.setAttribute('tabindex', '0');
        }

        // Smooth transform on hover/focus
        pill.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease';
        
        function activate() {
            pill.style.transform = 'translateY(-2px)';
            pill.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        }
        
        function deactivate() {
            pill.style.transform = '';
            pill.style.boxShadow = '';
        }

        pill.addEventListener('mouseenter', activate);
        pill.addEventListener('mouseleave', deactivate);
        pill.addEventListener('focus', activate);
        pill.addEventListener('blur', deactivate);

        // Click effect
        pill.addEventListener('click', (e) => {
            // Special handling for login button
            if (pill.classList.contains('btn-primary')) {
                e.preventDefault();
                setLoading(pill, true);
                // Simulate API call delay then redirect
                setTimeout(() => {
                    setLoading(pill, false);
                    window.location.href = pill.href;
                }, 800);
            }

            // Click ripple effect for all pills
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.4);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s linear;
            `;
            
            // Position ripple from click point
            const rect = pill.getBoundingClientRect();
            ripple.style.left = e.clientX - rect.left + 'px';
            ripple.style.top = e.clientY - rect.top + 'px';
            
            pill.style.position = 'relative';
            pill.style.overflow = 'hidden';
            pill.appendChild(ripple);
            
            // Clean up ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add keyframe for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .pill.is-loading::after {
            content: '';
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 12px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
            to { transform: translateY(-50%) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();