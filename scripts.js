// ================================
// DOCUMENT READY & INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAOS();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    initializeMobileMenu();
    initializeHoverEffects();
    hideLoadingScreen();
    initializeBackToTop();
});

// ================================
// AOS INITIALIZATION
// ================================

function initializeAOS() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            delay: 100,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
            disable: 'mobile'
        });
    }
}

// ================================
// LOADING SCREEN
// ================================

function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    
    setTimeout(() => {
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

// ================================
// NAVIGATION FUNCTIONALITY
// ================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    }, 16));

    // Active link highlighting
    window.addEventListener('scroll', throttle(() => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 16));

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logo image error handling and hover effects
    const logoImage = document.querySelector('.logo-image');
    const logoFallback = document.querySelector('.logo-fallback');
    
    if (logoImage) {
        // Handle image load error
        logoImage.addEventListener('error', () => {
            logoImage.style.display = 'none';
            if (logoFallback) {
                logoFallback.style.display = 'flex';
            }
        });
        
        // Handle successful image load
        logoImage.addEventListener('load', () => {
            logoImage.style.display = 'block';
            if (logoFallback) {
                logoFallback.style.display = 'none';
            }
        });
        
        // Hover effects for logo image
        logoImage.addEventListener('mouseenter', () => {
            logoImage.style.transform = 'scale(1.1)';
            logoImage.style.filter = 'brightness(1.1)';
        });
        
        logoImage.addEventListener('mouseleave', () => {
            logoImage.style.transform = 'scale(1)';
            logoImage.style.filter = 'brightness(1)';
        });
    }

    // Logo fallback hover effects
    if (logoFallback) {
        logoFallback.addEventListener('mouseenter', () => {
            logoFallback.style.transform = 'scale(1.05)';
        });
        
        logoFallback.addEventListener('mouseleave', () => {
            logoFallback.style.transform = 'scale(1)';
        });
    }
}

// ================================
// MOBILE MENU
// ================================

function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenu) return;
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        let mobileNavMenu = document.querySelector('.mobile-nav-menu');
        if (!mobileNavMenu) {
            mobileNavMenu = document.createElement('div');
            mobileNavMenu.className = 'mobile-nav-menu';
            mobileNavMenu.innerHTML = `
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            `;
            document.querySelector('.nav-container').appendChild(mobileNavMenu);
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    backdrop-filter: blur(20px);
                    display: none;
                    flex-direction: column;
                    padding: 1.5rem 2rem;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    border-radius: 0 0 20px 20px;
                    z-index: 1000;
                    border-top: 1px solid var(--border-light);
                }
                .mobile-nav-menu.active {
                    display: flex;
                    animation: slideDown 0.3s ease;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .mobile-nav-menu a {
                    padding: 1rem 0;
                    text-decoration: none;
                    color: var(--text-dark);
                    border-bottom: 1px solid var(--border-light);
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                .mobile-nav-menu a:last-child {
                    border-bottom: none;
                }
                .mobile-nav-menu a:hover {
                    color: var(--primary-purple);
                    padding-left: 1rem;
                }
            `;
            document.head.appendChild(style);

            // Add click handlers for mobile nav links
            const mobileNavLinks = mobileNavMenu.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Close mobile menu
                    mobileNavMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    
                    // Reset hamburger animation
                    const hamburgers = mobileMenu.querySelectorAll('.hamburger');
                    hamburgers.forEach(bar => {
                        bar.style.transform = '';
                        bar.style.opacity = '';
                    });
                    
                    // Navigate to section
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        mobileNavMenu.classList.toggle('active');
        
        // Animate hamburger
        const hamburgers = mobileMenu.querySelectorAll('.hamburger');
        hamburgers.forEach((bar, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    });
}

// ================================
// SCROLL ANIMATIONS
// ================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animations
                if (entry.target.classList.contains('mission-point')) {
                    animateMissionPoints(entry.target);
                }
                
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
                
                if (entry.target.classList.contains('step-card')) {
                    animateStepCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .mission-point, .service-card, .step-card');
    animatedElements.forEach(el => observer.observe(el));
}

function animateMissionPoints(element) {
    const points = document.querySelectorAll('.mission-point');
    const index = Array.from(points).indexOf(element);
    
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }, index * 200);
}

function animateServiceCard(element) {
    const cards = document.querySelectorAll('.service-card');
    const index = Array.from(cards).indexOf(element);
    
    setTimeout(() => {
        element.style.transform = 'scale(1) translateY(0)';
        element.style.opacity = '1';
    }, index * 150);
}

function animateStepCard(element) {
    const cards = document.querySelectorAll('.step-card');
    const index = Array.from(cards).indexOf(element);
    
    setTimeout(() => {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.opacity = '1';
    }, index * 200);
}

// ================================
// CONTACT FORM
// ================================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for reaching out! We\'ll get back to you within 24 hours. 💜', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    });
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });

        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--primary-purple)';
            input.style.boxShadow = '0 0 0 3px rgba(107, 70, 193, 0.1)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeInError 0.3s ease;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#error-animations')) {
        const style = document.createElement('style');
        style.id = 'error-animations';
        style.textContent = `
            @keyframes fadeInError {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ================================
// NOTIFICATIONS
// ================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-icon {
                font-size: 1.2rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

// ================================
// HOVER EFFECTS
// ================================

function initializeHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn, .cta-btn-large, .submit-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                button.style.transform = '';
            }
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Step card hover effects
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.step-number');
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const number = card.querySelector('.step-number');
            if (number) {
                number.style.transform = '';
            }
        });
    });

    // Mission point hover effects
    const missionPoints = document.querySelectorAll('.mission-point');
    missionPoints.forEach(point => {
        point.addEventListener('mouseenter', () => {
            const icon = point.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        point.addEventListener('mouseleave', () => {
            const icon = point.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = 'var(--primary-pink)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
}

// ================================
// BACK TO TOP BUTTON
// ================================

function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(107, 70, 193, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
        backToTopBtn.style.boxShadow = '0 8px 25px rgba(107, 70, 193, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = '';
        backToTopBtn.style.boxShadow = '0 4px 15px rgba(107, 70, 193, 0.3)';
    });
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// RESIZE HANDLER
// ================================

window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    if (window.innerWidth > 768 && mobileNavMenu) {
        mobileNavMenu.classList.remove('active');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            // Reset hamburger animation
            const hamburgers = mobileMenu.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }
    }
}, 250));

// ================================
// ERROR HANDLING
// ================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileNavMenu = document.querySelector('.mobile-nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            
            // Reset hamburger animation
            const hamburgers = mobileMenu.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        }

        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
    }
});

// Focus management for better accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-purple)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
manageFocus();

// ================================
// FINAL INITIALIZATION
// ================================

// Ensure all animations are ready
window.addEventListener('load', () => {
    // Re-trigger AOS refresh after everything is loaded
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    console.log('🚀 Feme website fully loaded and initialized!');
    
    // Show welcome message
    setTimeout(() => {
        if (sessionStorage.getItem('feme-welcomed') !== 'true') {
            showNotification('Welcome to Feme! Your mental health journey starts here. 💜', 'info');
            sessionStorage.setItem('feme-welcomed', 'true');
        }
    }, 2000);
});

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Optimize animations for better performance
function optimizeAnimations() {
    // Reduce animations on low-end devices
    if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        
        if (document.hidden) {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
}

// Initialize performance optimizations
optimizeAnimations();