/**
 * Modal Manager Component
 * ------------------------
 * Manages all modal dialogs on the page:
 *   - Booking / WhatsApp consultation form modal
 *   - Video player modal (local MP4 + YouTube iframe support)
 *   - Gallery lightbox with prev/next navigation
 *   - Treatment information detail modal
 *
 * Public functions are exported AND registered as window globals
 * so that HTML onclick="..." attributes continue to work without changes.
 */

import { galleryItems }     from '../data/gallery-data.js';
import { treatmentDetails } from '../data/treatments-data.js';
import { sendConsultationRequest } from '../services/whatsapp-service.js';

/* ──────────────────────────────────────────────────────────────────────────
   Generic Modal Open / Close
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Opens a modal by adding the 'active' class to its backdrop element.
 * @param {string} modalId - The ID of the .modal-backdrop element
 */
export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

/**
 * Closes any modal by removing the 'active' class.
 * Also stops video/iframe playback when closing the video modal.
 * @param {string} modalId - The ID of the .modal-backdrop element
 */
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');

    if (modalId === 'videoModal') {
        _stopVideoPlayback();
    }
}

/**
 * Initializes backdrop click-to-close behavior for all modals on the page.
 * Call once on DOMContentLoaded.
 */
export function initModalBackdrops() {
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
                if (backdrop.id === 'videoModal') {
                    _stopVideoPlayback();
                }
            }
        });
    });
}

/**
 * Stops all video playback (iframe + HTML5 video element) in the video modal.
 * @private
 */
function _stopVideoPlayback() {
    const iframe = document.getElementById('videoIframe');
    if (iframe) {
        iframe.src = '';
        iframe.style.display = 'none';
    }
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.src = '';
        videoPlayer.style.display = 'none';
    }
}

/* ──────────────────────────────────────────────────────────────────────────
   Booking Modal
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Opens the WhatsApp booking modal. Optionally pre-selects a doctor
 * or treatment package in the form dropdowns.
 * @param {string} [doctorName]   - Doctor to pre-select in the dropdown
 * @param {string} [packageName]  - Package to pre-select in the dropdown
 */
export function openBookingModal(doctorName = '', packageName = '') {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    if (doctorName) {
        const doctorSelect = document.getElementById('doctorSelect');
        if (doctorSelect) doctorSelect.value = doctorName;
    }

    if (packageName) {
        const pkgSelect = document.getElementById('treatmentPackageSelect');
        if (pkgSelect) {
            for (let i = 0; i < pkgSelect.options.length; i++) {
                const option = pkgSelect.options[i];
                if (option.text.includes(packageName) || option.value.includes(packageName)) {
                    pkgSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    modal.classList.add('active');
}

/**
 * Handles booking form submission. Collects form values and delegates
 * message formatting + WhatsApp URL construction to the whatsapp-service.
 * @param {Event} event - The form submit event
 */
export function handleBookingSubmit(event) {
    event.preventDefault();

    sendConsultationRequest({
        name:      document.getElementById('patientName').value.trim(),
        phone:     document.getElementById('patientPhone').value.trim(),
        doctor:    document.getElementById('doctorSelect').value,
        treatment: document.getElementById('treatmentPackageSelect').value,
        date:      document.getElementById('preferredDate').value,
        notes:     document.getElementById('patientNotes').value.trim()
    });

    closeModal('bookingModal');
}

/* ──────────────────────────────────────────────────────────────────────────
   Video Player Modal
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Opens the video modal and plays either a local MP4 file or a YouTube embed.
 * @param {string} videoId   - Unused, kept for backward compatibility
 * @param {string} title     - Title displayed in the modal header
 * @param {string} embedUrl  - Local .mp4 path or YouTube embed URL
 */
export function openVideoModal(videoId, title, embedUrl) {
    const modal       = document.getElementById('videoModal');
    const modalTitle  = document.getElementById('videoModalTitle');
    const iframe      = document.getElementById('videoIframe');
    const videoPlayer = document.getElementById('videoPlayer');

    if (!modal) return;

    if (modalTitle) {
        modalTitle.textContent = title || 'Sri Ramakrishna Ayurvedic Hospital';
    }

    const isLocalMp4 = embedUrl && (embedUrl.endsWith('.mp4') || embedUrl.includes('assets/videos/'));

    if (isLocalMp4) {
        // Play local MP4 with HTML5 video element
        if (iframe) iframe.style.display = 'none';
        if (videoPlayer) {
            videoPlayer.src = embedUrl;
            videoPlayer.style.display = 'block';
            videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
        }
    } else {
        // Embed YouTube or external iframe
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.style.display = 'none';
        }
        if (iframe) {
            iframe.src = embedUrl || '';
            iframe.style.display = 'block';
        }
    }

    modal.classList.add('active');
}

/* ──────────────────────────────────────────────────────────────────────────
   Gallery Lightbox
   ────────────────────────────────────────────────────────────────────────── */

/** Tracks the currently visible gallery image index */
let currentLightboxIndex = 0;

/**
 * Opens the gallery lightbox at the given index.
 * @param {number} index - Index into the galleryItems array
 */
export function openLightbox(index) {
    currentLightboxIndex = index;
    _updateLightbox();
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.add('active');
}

/**
 * Navigates the lightbox by ±1 direction (wraps around).
 * @param {number} direction - +1 for next, -1 for previous
 */
export function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
    _updateLightbox();
}

/**
 * Updates the lightbox image src and caption text from the current index.
 * @private
 */
function _updateLightbox() {
    const img     = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (img && caption) {
        const item  = galleryItems[currentLightboxIndex];
        img.src     = item.src;
        caption.textContent = item.caption;
    }
}

/* ──────────────────────────────────────────────────────────────────────────
   Treatment Info Modal
   ────────────────────────────────────────────────────────────────────────── */

/**
 * Opens the treatment detail modal and populates it with structured content.
 * @param {string} treatmentKey - Key in the treatmentDetails data object
 */
export function openTreatmentModal(treatmentKey) {
    const data = treatmentDetails[treatmentKey];
    if (!data) return;

    const modalTitle = document.getElementById('treatmentModalTitle');
    const modalBody  = document.getElementById('treatmentModalBody');
    const modal      = document.getElementById('treatmentModal');

    if (!modalTitle || !modalBody || !modal) return;

    modalTitle.textContent = data.title;

    let html = `<p style="font-size:0.95rem;color:var(--text-muted);margin-bottom:1.2rem;">${data.description}</p>`;

    html += `<h4 style="color:var(--primary-dark-green);margin-bottom:0.5rem;font-family:var(--font-heading);">Key Therapies Included:</h4>`;
    html += `<ul style="margin-bottom:1.2rem;padding-left:1.2rem;list-style:disc;color:var(--text-dark);font-size:0.9rem;">`;
    data.therapies.forEach(t => {
        html += `<li style="margin-bottom:0.3rem;"><strong>${t}</strong></li>`;
    });
    html += `</ul>`;

    html += `<h4 style="color:var(--primary-dark-green);margin-bottom:0.5rem;font-family:var(--font-heading);">Expected Benefits:</h4>`;
    html += `<p style="font-size:0.9rem;color:var(--text-dark);background-color:var(--light-green-bg);padding:0.8rem;border-radius:var(--radius-sm);border:1px solid var(--border-green);">${data.benefits}</p>`;

    modalBody.innerHTML = html;
    modal.classList.add('active');
}

/**
 * Alias for openTreatmentModal — called from nav dropdown onclick handlers.
 * @param {string} treatmentName
 */
export function selectTreatment(treatmentName) {
    openTreatmentModal(treatmentName);
}
