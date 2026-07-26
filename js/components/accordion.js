/**
 * FAQ Accordion Component
 * ------------------------
 * Implements a single-open-at-a-time accordion behavior for FAQ items.
 * Clicking an already-open item will close it; clicking a closed one
 * closes all others and opens the clicked one.
 */

/**
 * Initializes the FAQ accordion click behavior.
 * Call once on DOMContentLoaded.
 */
export function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item     = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items first
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Re-open the clicked item only if it was previously closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
