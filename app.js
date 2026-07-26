/**
 * app.js — Backward-Compatibility Global Bindings
 * --------------------------------------------------
 * This file serves ONE purpose: expose module functions as window globals
 * so that all existing HTML inline event handlers (onclick="...") continue
 * to work without any changes to index.html.
 *
 * ✅ Do NOT add business logic here.
 * ✅ Do NOT add event listeners here.
 * ✅ All real logic lives in js/components/ and js/services/.
 *
 * Script loading order in index.html:
 *   <script src="app.js" type="module"></script>
 *
 * This script imports js/main.js (which initializes DOMContentLoaded hooks)
 * and then registers global bindings for onclick="..." HTML attributes.
 */

// ── Initialize all modules via main entry point ──────────────────────────
import './js/main.js';

// ── Import public functions that need window-global exposure ─────────────
import {
    closeModal,
    openBookingModal,
    handleBookingSubmit,
    openVideoModal,
    openLightbox,
    navigateLightbox,
    openTreatmentModal,
    selectTreatment
} from './js/components/modal-manager.js';

// ── Register as window globals for HTML onclick="..." compatibility ───────
window.closeModal          = closeModal;
window.openBookingModal    = openBookingModal;
window.handleBookingSubmit = handleBookingSubmit;
window.openVideoModal      = openVideoModal;
window.openLightbox        = openLightbox;
window.navigateLightbox    = navigateLightbox;
window.openTreatmentModal  = openTreatmentModal;
window.selectTreatment     = selectTreatment;
