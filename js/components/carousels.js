/**
 * Carousels Component
 * --------------------
 * Handles left/right scroll navigation for the Treatments and Testimonials
 * horizontally scrollable grids using their dedicated prev/next buttons.
 */

/**
 * Initializes all carousel scroll behaviors.
 * Call once on DOMContentLoaded.
 */
export function initCarousels() {
    _initScrollCarousel('treatmentsGrid', 'treatmentsPrev', 'treatmentsNext', 300);
    _initScrollCarousel('testimonialsGrid', 'testimonialsPrev', 'testimonialsNext', 350);
}

/**
 * Attaches scroll event listeners to a carousel grid's prev/next buttons.
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

    if (!grid || !prev || !next) return;

    prev.addEventListener('click', () => {
        grid.scrollBy({ left: -scrollPx, behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
        grid.scrollBy({ left: scrollPx, behavior: 'smooth' });
    });
}
