/**
 * Treatment Data Model
 * ---------------------
 * Static domain data for all Ayurvedic treatment types offered by the hospital.
 * Each key matches the treatment name used in HTML onclick="openTreatmentModal('key')".
 * 
 * Adding a new treatment:
 *   1. Add a new entry below with a unique key.
 *   2. Add a corresponding treatment card in index.html.
 */

export const treatmentDetails = {
    'Pain Management': {
        title: 'Ayurvedic Pain Management',
        description: 'Targeted therapies for chronic back pain, neck stiffness, sciatica, osteoarthritis, rheumatoid arthritis, and joint degeneration.',
        therapies: [
            'Abhyanga (Warm Oil Massage)',
            'Kati Vasti (Spinal Oil Therapy)',
            'Elakizhi (Herbal Leaf Poultice)',
            'Janu Vasti (Knee Therapy)'
        ],
        benefits: 'Reduces inflammation, restores cartilage lubrication, relieves spinal pressure, and eliminates dependency on painkiller medications.'
    },

    'Stroke Rehabilitation': {
        title: 'Stroke Rehabilitation Program',
        description: 'Comprehensive Ayurvedic neuro-restorative rehab designed to restore motor control, muscle tone, speech articulation, and self-reliance.',
        therapies: [
            'Navarakizhi (Rice Poultice Therapy)',
            'Pizhichil (Medicated Oil Bath)',
            'Basti (Enema Therapy for Vata)',
            'Targeted Physiotherapy'
        ],
        benefits: 'Stimulates nerve regeneration, prevents muscle atrophy, improves blood circulation to neurological pathways, and improves daily functional independence.'
    },

    'Panchakarma': {
        title: 'Authentic Panchakarma Detox',
        description: 'The ultimate 5-fold Ayurvedic purification process designed to remove deep-seated metabolic toxins (Ama) and revitalize organ cellular vitality.',
        therapies: [
            'Vamana & Virechana (Internal Cleansing)',
            'Shirodhara (Mental Calming Oil Drip)',
            'Nasya (Nasal Detox)',
            'Basti (Herbal Colon Wash)'
        ],
        benefits: 'Enhances immunity, balances Doshas (Vata, Pitta, Kapha), boosts metabolism, improves skin clarity, and promotes longevity.'
    },

    'Neurological Disorders': {
        title: 'Neurological Care & Rehabilitation',
        description: 'Specialized Ayurvedic treatments for Parkinsonism, paralysis, peripheral neuropathy, multiple sclerosis, and facial palsy.',
        therapies: [
            'Shirobasti (Cranial Oil Retention)',
            'Nasya Therapy',
            'Medicated Kashaya Basti',
            'Nerve Stimulating Massages'
        ],
        benefits: 'Soothes aggravated Vata dosha, enhances neuro-muscular coordination, and reduces tremors or numbness.'
    },

    'Musculoskeletal Care': {
        title: 'Musculoskeletal & Joint Care',
        description: 'Holistic care for spinal disc herniation, spondylosis, frozen shoulder, osteoporosis, and sports injuries.',
        therapies: [
            'Greeva Vasti (Neck Care)',
            'Patra Pinda Sweda',
            'Bandhan (Therapeutic Bandaging)',
            'Herbal Mineral Supplements'
        ],
        benefits: 'Strengthens bone density, repairs ligament elasticity, and restores joint flexibility naturally.'
    },

    'Lifestyle Disorders': {
        title: 'Lifestyle & Metabolic Wellness',
        description: 'Customized holistic regimen to reverse stress-induced disorders, type-2 diabetes, obesity, hypertension, thyroid imbalance, and insomnia.',
        therapies: [
            'Udvartana (Herbal Powder Scrub Massage)',
            'Shirodhara',
            'Ayurvedic Dietetics',
            'Yoga & Pranayama Coaching'
        ],
        benefits: 'Promotes weight loss, regulates blood glucose levels, eliminates anxiety, and establishes healthy circadian rhythm.'
    }
};
