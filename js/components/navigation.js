/**
 * Navigation Component
 * ----------------------
 * Handles transparent-to-solid sticky header on scroll, mobile hamburger menu toggle,
 * and closing the mobile nav when a link is clicked.
 */

/**
 * Initializes all navigation behaviors.
 * Call once on DOMContentLoaded.
 */
export function initNavigation() {
    _initMobileMenuToggle();
    _initScrollHeader();
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
 * Manages transparent header at top of page and solid header when scrolled past hero.
 * @private
 */
function _initScrollHeader() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
}
