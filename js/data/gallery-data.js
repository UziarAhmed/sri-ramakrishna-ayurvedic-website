/**
 * Gallery Data Model
 * -------------------
 * Static list of hospital facility photos shown in the gallery section.
 * Each item's index corresponds to its position in the HTML gallery grid.
 * 
 * Adding a new image:
 *   1. Place the image file in assets/images/
 *   2. Add an entry here with src and caption.
 *   3. Add a corresponding .gallery-item element in index.html.
 */

export const galleryItems = [
    {
        src: 'assets/images/hospital-building-hero.jpeg',
        caption: 'Sri Ramakrishna Ayurvedic Hospital Building & Serene Campus, Kundapura'
    },
    {
        src: 'assets/images/opd-consultation.jpeg',
        caption: 'OPD Doctor Consultation Room'
    },
    {
        src: 'assets/images/therapy-room-droni.jpeg',
        caption: 'Traditional Ayurvedic Therapy Suite & Wooden Droni'
    },
    {
        src: 'assets/images/physiotherapy-room.jpeg',
        caption: 'Physiotherapy & Physical Rehabilitation Center'
    },
    {
        src: 'assets/images/pharmacy.jpeg',
        caption: 'Hospital Pharmacy - Authentic Ayurvedic Medicines & Oils'
    },
    {
        src: 'assets/images/rehab-staircase.jpeg',
        caption: 'Specialized Staircase Training Unit for Stroke & Mobility Rehab'
    }
];
