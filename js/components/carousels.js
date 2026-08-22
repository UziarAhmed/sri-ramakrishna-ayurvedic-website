/**
 * Carousels Component
 * --------------------
 * Handles left/right scroll navigation for Treatments, Doctors, and Testimonials
 * horizontally scrollable grids with touch swipe, mouse drag, and prev/next buttons.
 */

/**
 * Initializes all carousel scroll behaviors.
 * Call once on DOMContentLoaded.
 */
export function initCarousels() {
    _initScrollCarousel('treatmentsGrid', 'treatmentsPrev', 'treatmentsNext', 300);
    _initScrollCarousel('doctorsGrid', 'doctorsPrev', 'doctorsNext', 300);
    _initScrollCarousel('packagesGrid', 'packagesPrev', 'packagesNext', 300);
    _initScrollCarousel('testimonialsGrid', 'testimonialsPrev', 'testimonialsNext', 350);
}

/**
 * Attaches scroll event listeners and touch/drag swipe to a carousel grid.
 * @param {string} gridId    - ID of the scrollable grid container
 * @param {string} prevId    - ID of the previous/left button
 * @param {string} nextId    - ID of the next/right button
 * @param {number} scrollPx  - Number of pixels to scroll per click
 * @private
 */
function _initScrollCarousel(gridId, prevId, nextId, scrollPx) {
    const grid = document.getElementById(gridId);
    const prev = document.getElementById(prevId);
    const next = document.getElementById(nextId);

    if (!grid) return;

    if (prev) {
        prev.addEventListener('click', () => {
            grid.scrollBy({ left: -scrollPx, behavior: 'smooth' });
        });
    }

    if (next) {
        next.addEventListener('click', () => {
            grid.scrollBy({ left: scrollPx, behavior: 'smooth' });
        });
    }

    // Touch and drag swipe enhancement
    let isDown = false;
    let startX;
    let scrollLeft;

    grid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
    });

    grid.addEventListener('mouseleave', () => {
        isDown = false;
    });

    grid.addEventListener('mouseup', () => {
        isDown = false;
    });

    grid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX) * 1.5;
        grid.scrollLeft = scrollLeft - walk;
    });
}
