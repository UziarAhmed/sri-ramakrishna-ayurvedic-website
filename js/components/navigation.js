/**
 * Navigation Component
 * ----------------------
 * Handles sticky header behavior, mobile hamburger menu toggle,
 * and closing the mobile nav when a link is clicked.
 */

/**
 * Initializes all navigation behaviors.
 * Call once on DOMContentLoaded.
 */
export function initNavigation() {
    _initMobileMenuToggle();
    _initScrollShadow();
}

/**
 * Toggles the mobile nav drawer on hamburger button click.
 * Also swaps the icon between fa-bars and fa-times.
 * @private
 */
function _initMobileMenuToggle() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu      = document.getElementById('navMenu');
    const navLinks     = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            const isOpen = navMenu.classList.contains('active');
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-times', isOpen);
        }
    });

    // Close drawer when any nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/**
 * Adds a deeper box shadow to the sticky header when the user scrolls
 * past 50px to visually separate it from page content.
 * @private
 */
function _initScrollShadow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 8px 20px rgba(0,0,0,0.1)'
            : 'var(--shadow-sm)';
    });
}
