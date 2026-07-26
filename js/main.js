/**
 * Application Entry Point (ES Module)
 * --------------------------------------
 * This is the main ES Module entry point for the application.
 * It imports and initializes all feature modules on DOMContentLoaded.
 *
 * Module initialization order:
 *   1. Navigation & scroll shadow
 *   2. FAQ accordion
 *   3. Carousels (treatments + testimonials)
 *   4. Modal backdrop click-to-close setup
 *
 * Global window bindings for HTML onclick="..." handlers are in app.js.
 */

import { initNavigation }    from './components/navigation.js';
import { initFAQAccordion }  from './components/accordion.js';
import { initCarousels }     from './components/carousels.js';
import { initModalBackdrops } from './components/modal-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQAccordion();
    initCarousels();
    initModalBackdrops();
});
