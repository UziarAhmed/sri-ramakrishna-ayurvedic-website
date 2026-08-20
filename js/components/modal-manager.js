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
 * Closes whichever modal is currently active on the screen.
 */
export function closeActiveModal() {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach(modal => {
        closeModal(modal.id);
    });
}

/**
 * Initializes backdrop click-to-close behavior and Escape key listener for all modals.
 * Also sets minimum date for booking form.
 * Call once on DOMContentLoaded.
 */
export function initModalBackdrops() {
    // Backdrop click to close
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closeModal(backdrop.id);
            }
        });
    });

    // Escape key to close any active modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeActiveModal();
        }
    });

    // Enforce today as minimum booking date
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
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
        if (doctorSelect) {
            for (let i = 0; i < doctorSelect.options.length; i++) {
                if (doctorSelect.options[i].value.includes(doctorName) || doctorSelect.options[i].text.includes(doctorName)) {
                    doctorSelect.selectedIndex = i;
                    break;
                }
            }
        }
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
        if (iframe) iframe.style.display = 'none';
        if (videoPlayer) {
            videoPlayer.src = embedUrl;
            videoPlayer.style.display = 'block';
            videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
        }
    } else {
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

let currentLightboxIndex = 0;

export function openLightbox(index) {
    currentLightboxIndex = index;
    _updateLightbox();
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.add('active');
}

export function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
    _updateLightbox();
}

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

export function openTreatmentModal(treatmentKey) {
    const data = treatmentDetails[treatmentKey];
    if (!data) return;

    const modalTitle = document.getElementById('treatmentModalTitle');
    const modalBody  = document.getElementById('treatmentModalBody');
    const modal      = document.getElementById('treatmentModal');

    if (!modalTitle || !modalBody || !modal) return;

    modalTitle.textContent = data.title;

    let html = `<p style="font-size:0.95rem;color:var(--text-muted);margin-bottom:1.2rem;line-height:1.6;">${data.description}</p>`;

    html += `<h4 style="color:var(--primary-dark-green);margin-bottom:0.5rem;font-family:var(--font-heading);font-size:1.05rem;">Key Therapies Included:</h4>`;
    html += `<ul style="margin-bottom:1.2rem;padding-left:1.2rem;list-style:disc;color:var(--text-dark);font-size:0.9rem;line-height:1.7;">`;
    data.therapies.forEach(t => {
        html += `<li style="margin-bottom:0.25rem;"><strong>${t}</strong></li>`;
    });
    html += `</ul>`;

    html += `<h4 style="color:var(--primary-dark-green);margin-bottom:0.5rem;font-family:var(--font-heading);font-size:1.05rem;">Expected Benefits:</h4>`;
    html += `<p style="font-size:0.9rem;color:var(--text-dark);background-color:var(--light-green-bg);padding:0.8rem 1rem;border-radius:var(--radius-sm);border:1px solid var(--border-green);line-height:1.5;">${data.benefits}</p>`;

    modalBody.innerHTML = html;
    modal.classList.add('active');
}

export function selectTreatment(treatmentName) {
    openTreatmentModal(treatmentName);
}
