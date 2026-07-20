/* ==========================================================================
   Sri Ramakrishna Ayurvedic Hospital - JavaScript Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQAccordion();
    initCarousels();
    initScrollEffects();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Carousels
   ========================================================================== */
function initCarousels() {
    // Treatments Carousel
    const treatmentsGrid = document.getElementById('treatmentsGrid');
    const treatmentsPrev = document.getElementById('treatmentsPrev');
    const treatmentsNext = document.getElementById('treatmentsNext');

    if (treatmentsGrid && treatmentsPrev && treatmentsNext) {
        treatmentsPrev.addEventListener('click', () => {
            treatmentsGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });
        treatmentsNext.addEventListener('click', () => {
            treatmentsGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // Testimonials Carousel
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    const testimonialsPrev = document.getElementById('testimonialsPrev');
    const testimonialsNext = document.getElementById('testimonialsNext');

    if (testimonialsGrid && testimonialsPrev && testimonialsNext) {
        testimonialsPrev.addEventListener('click', () => {
            testimonialsGrid.scrollBy({ left: -350, behavior: 'smooth' });
        });
        testimonialsNext.addEventListener('click', () => {
            testimonialsGrid.scrollBy({ left: 350, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   Modals Management
   ========================================================================== */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
    // Stop iframe video if video modal
    if (modalId === 'videoModal') {
        const iframe = document.getElementById('videoIframe');
        if (iframe) iframe.src = '';
    }
}

// Close modal when clicking outside content box
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove('active');
            if (backdrop.id === 'videoModal') {
                const iframe = document.getElementById('videoIframe');
                if (iframe) iframe.src = '';
            }
        }
    });
});

/* ==========================================================================
   Booking & WhatsApp Integration
   ========================================================================== */
function openBookingModal(doctorName = '', packageName = '') {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;

    if (doctorName) {
        const doctorSelect = document.getElementById('doctorSelect');
        if (doctorSelect) doctorSelect.value = doctorName;
    }

    if (packageName) {
        const pkgSelect = document.getElementById('treatmentPackageSelect');
        if (pkgSelect) {
            // Match option value
            for (let i = 0; i < pkgSelect.options.length; i++) {
                if (pkgSelect.options[i].text.includes(packageName) || pkgSelect.options[i].value.includes(packageName)) {
                    pkgSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    modal.classList.add('active');
}

function handleBookingSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const doctor = document.getElementById('doctorSelect').value;
    const treatment = document.getElementById('treatmentPackageSelect').value;
    const date = document.getElementById('preferredDate').value;
    const notes = document.getElementById('patientNotes').value.trim();

    // Construct formatted WhatsApp message
    let message = `*Consultation Request - Sri Ramakrishna Ayurvedic Hospital*\n\n`;
    message += `👤 *Patient Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `👨‍⚕️ *Preferred Doctor:* ${doctor}\n`;
    message += `🌿 *Treatment / Package:* ${treatment}\n`;
    if (date) message += `📅 *Preferred Date:* ${date}\n`;
    if (notes) message += `📝 *Health Issue / Notes:* ${notes}\n`;

    const hospitalWhatsAppNumber = '919480855959';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${hospitalWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp URL in new window
    window.open(whatsappUrl, '_blank');

    closeModal('bookingModal');
}

/* ==========================================================================
   Video Player Modal
   ========================================================================== */
function openVideoModal(videoId, title, embedUrl) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('videoModalTitle');
    const iframe = document.getElementById('videoIframe');

    if (modal && iframe) {
        if (modalTitle) modalTitle.textContent = title || 'Sri Ramakrishna Ayurvedic Hospital';
        iframe.src = embedUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        modal.classList.add('active');
    }
}

/* ==========================================================================
   Gallery Lightbox Modal
   ========================================================================== */
const galleryItems = [
    {
        src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sri Ramakrishna Ayurvedic Hospital Building & Serene Campus, Kundapura'
    },
    {
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Expert Ayurvedic Doctor Consultation & Pulse Diagnosis'
    },
    {
        src: 'https://images.unsplash.com/photo-1608248597369-094191c49122?auto=format&fit=crop&w=1200&q=80',
        caption: 'Authentic Herbal Preparations & Medicated Oils for Therapy'
    },
    {
        src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Traditional Panchakarma Treatment Suite (Droni)'
    },
    {
        src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rejuvenating Shirodhara & Ayurvedic Herbal Steam Therapy'
    },
    {
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Stroke Rehabilitation & Physical Therapy Gymnasium'
    }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    const modal = document.getElementById('lightboxModal');
    if (modal) modal.classList.add('active');
}

function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
    updateLightbox();
}

function updateLightbox() {
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');
    if (img && caption) {
        img.src = galleryItems[currentLightboxIndex].src;
        caption.textContent = galleryItems[currentLightboxIndex].caption;
    }
}

/* ==========================================================================
   Treatment Details Modal
   ========================================================================== */
const treatmentDetails = {
    'Pain Management': {
        title: 'Ayurvedic Pain Management',
        description: 'Targeted therapies for chronic back pain, neck stiffness, sciatica, osteoarthritis, rheumatoid arthritis, and joint degeneration.',
        therapies: ['Abhyanga (Warm Oil Massage)', 'Kati Vasti (Spinal Oil Therapy)', 'Elakizhi (Herbal Leaf Poultice)', 'Janu Vasti (Knee Therapy)'],
        benefits: 'Reduces inflammation, restores cartilage lubrication, relieves spinal pressure, and eliminates dependency on painkiller medications.'
    },
    'Stroke Rehabilitation': {
        title: 'Stroke Rehabilitation Program',
        description: 'Comprehensive Ayurvedic neuro-restorative rehab designed to restore motor control, muscle tone, speech articulation, and self-reliance.',
        therapies: ['Navarakizhi (Rice Poultice Therapy)', 'Pizhichil (Medicated Oil Bath)', 'Basti (Enema Therapy for Vata)', 'Targeted Physiotherapy'],
        benefits: 'Stimulates nerve regeneration, prevents muscle atrophy, improves blood circulation to neurological pathways, and improves daily functional independence.'
    },
    'Panchakarma': {
        title: 'Authentic Panchakarma Detox',
        description: 'The ultimate 5-fold Ayurvedic purification process designed to remove deep-seated metabolic toxins (Ama) and revitalize organ cellular vitality.',
        therapies: ['Vamana & Virechana (Internal Cleansing)', 'Shirodhara (Mental Calming Oil Drip)', 'Nasya (Nasal Detox)', 'Basti (Herbal Colon Wash)'],
        benefits: 'Enhances immunity, balances Doshas (Vata, Pitta, Kapha), boosts metabolism, improves skin clarity, and promotes longevity.'
    },
    'Neurological Disorders': {
        title: 'Neurological Care & Rehabilitation',
        description: 'Specialized Ayurvedic treatments for Parkinsonism, paralysis, peripheral neuropathy, multiple sclerosis, and facial palsy.',
        therapies: ['Shirobasti (Cranial Oil Retention)', 'Nasya Therapy', 'Medicated Kashaya Basti', 'Nerve Stimulating Massages'],
        benefits: 'Soothes aggravated Vata dosha, enhances neuro-muscular coordination, and reduces tremors or numbness.'
    },
    'Musculoskeletal Care': {
        title: 'Musculoskeletal & Joint Care',
        description: 'Holistic care for spinal disc herniation, spondylosis, frozen shoulder, osteoporosis, and sports injuries.',
        therapies: ['Greeva Vasti (Neck Care)', 'Patra Pinda Sweda', 'Bandhan (Therapeutic Bandaging)', 'Herbal Mineral Supplements'],
        benefits: 'Strengthens bone density, repairs ligament elasticity, and restores joint flexibility naturally.'
    },
    'Lifestyle Disorders': {
        title: 'Lifestyle & Metabolic Wellness',
        description: 'Customized holistic regimen to reverse stress-induced disorders, type-2 diabetes, obesity, hypertension, thyroid imbalance, and insomnia.',
        therapies: ['Udvartana (Herbal Powder Scrub Massage)', 'Shirodhara', 'Ayurvedic Dietetics', 'Yoga & Pranayama Coaching'],
        benefits: 'Promotes weight loss, regulates blood glucose levels, eliminates anxiety, and establishes healthy circadian rhythm.'
    }
};

function openTreatmentModal(treatmentKey) {
    const data = treatmentDetails[treatmentKey];
    if (!data) return;

    const modalTitle = document.getElementById('treatmentModalTitle');
    const modalBody = document.getElementById('treatmentModalBody');
    const modal = document.getElementById('treatmentModal');

    if (modalTitle && modalBody && modal) {
        modalTitle.textContent = data.title;
        
        let html = `<p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.2rem;">${data.description}</p>`;
        
        html += `<h4 style="color: var(--primary-dark-green); margin-bottom: 0.5rem; font-family: var(--font-heading);">Key Therapies Included:</h4>`;
        html += `<ul style="margin-bottom: 1.2rem; padding-left: 1.2rem; list-style: disc; color: var(--text-dark); font-size: 0.9rem;">`;
        data.therapies.forEach(t => {
            html += `<li style="margin-bottom: 0.3rem;"><strong>${t}</strong></li>`;
        });
        html += `</ul>`;

        html += `<h4 style="color: var(--primary-dark-green); margin-bottom: 0.5rem; font-family: var(--font-heading);">Expected Benefits:</h4>`;
        html += `<p style="font-size: 0.9rem; color: var(--text-dark); background-color: var(--light-green-bg); padding: 0.8rem; border-radius: var(--radius-sm); border: 1px solid var(--border-green);">${data.benefits}</p>`;

        modalBody.innerHTML = html;
        modal.classList.add('active');
    }
}

function selectTreatment(treatmentName) {
    openTreatmentModal(treatmentName);
}
