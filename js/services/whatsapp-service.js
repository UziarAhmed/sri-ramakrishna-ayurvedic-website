/**
 * WhatsApp Service
 * -----------------
 * Handles the business logic for building and sending WhatsApp consultation
 * messages. Keeps message formatting and URL construction separate from
 * UI event handlers.
 *
 * Usage:
 *   import { sendConsultationRequest } from '../services/whatsapp-service.js';
 *   sendConsultationRequest({ name, phone, doctor, treatment, date, notes });
 */

import { WHATSAPP_NUMBER, HOSPITAL_NAME } from '../config/constants.js';

/**
 * Builds a formatted WhatsApp consultation message and opens it in a new tab.
 * @param {Object} formData
 * @param {string} formData.name       - Patient full name
 * @param {string} formData.phone      - Patient phone number
 * @param {string} formData.doctor     - Preferred doctor name
 * @param {string} formData.treatment  - Treatment or package name
 * @param {string} [formData.date]     - Optional preferred appointment date
 * @param {string} [formData.notes]    - Optional health notes
 */
export function sendConsultationRequest({ name, phone, doctor, treatment, date, notes }) {
    let message = `*Consultation Request - ${HOSPITAL_NAME}*\n\n`;
    message += `👤 *Patient Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `👨‍⚕️ *Preferred Doctor:* ${doctor}\n`;
    message += `🌿 *Treatment / Package:* ${treatment}\n`;
    if (date)  message += `📅 *Preferred Date:* ${date}\n`;
    if (notes) message += `📝 *Health Issue / Notes:* ${notes}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

/**
 * Opens a direct WhatsApp chat (no pre-filled message).
 * Used by the floating WhatsApp button.
 */
export function openWhatsAppChat() {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
}
