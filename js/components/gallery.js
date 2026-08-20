/**
 * Gallery 3D Coverflow Carousel
 * ---------------------------------
 * Manages the hospital gallery section with a premium 3D coverflow effect.
 * Center card is large & elevated. Side cards recede in perspective.
 * Supports: keyboard arrows, mouse drag, touch swipe, dot indicators.
 */

export function initGalleryCarousel() {
    const track   = document.getElementById('galleryCarouselTrack');
    const dotsEl  = document.getElementById('galleryDots');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    const total  = slides.length;
    let current  = 0;
    let isAnimating = false;

    // ── Class positions ──────────────────────────────────────────────────────
    const POSITIONS = ['is-prev-far', 'is-prev', 'is-active', 'is-next', 'is-next-far'];

    function getPositionClass(slideIndex, activeIndex) {
        const diff = (slideIndex - activeIndex + total) % total;
        if (diff === 0) return 'is-active';
        if (diff === 1) return 'is-next';
        if (diff === 2) return 'is-next-far';
        if (diff === total - 1) return 'is-prev';
        if (diff === total - 2) return 'is-prev-far';
        return 'is-hidden';
    }

    // ── Render ────────────────────────────────────────────────────────────────
    function render() {
        slides.forEach((slide, i) => {
            slide.className = 'gallery-slide';
            const cls = getPositionClass(i, current);
            slide.classList.add(cls);
        });

        // Update dots
        if (dotsEl) {
            const dots = dotsEl.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === current);
            });
        }
    }

    // ── Navigate ─────────────────────────────────────────────────────────────
    function navigate(direction) {
        if (isAnimating) return;
        isAnimating = true;
        current = (current + direction + total) % total;
        render();
        setTimeout(() => { isAnimating = false; }, 560);
    }

    function goTo(index) {
        if (isAnimating || index === current) return;
        const direction = index > current ? 1 : -1;
        isAnimating = true;
        current = index;
        render();
        setTimeout(() => { isAnimating = false; }, 560);
    }

    // ── Build Dots ────────────────────────────────────────────────────────────
    if (dotsEl) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', `Go to gallery image ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsEl.appendChild(dot);
        });
    }

    // ── Arrow buttons ─────────────────────────────────────────────────────────
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    // ── Keyboard ─────────────────────────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
        const gallerySection = document.getElementById('gallery');
        const rect = gallerySection?.getBoundingClientRect();
        const inView = rect && rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // ── Click on side cards to navigate ──────────────────────────────────────
    slides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            if (i === current) return; // active card → open lightbox
            const diff = (i - current + total) % total;
            if (diff === 1 || diff === 2) navigate(1);
            else navigate(-1);
        });
    });

    // ── Touch / Drag Swipe ────────────────────────────────────────────────────
    let startX = 0, isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
        isDragging = false;
    }, { passive: true });

    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
        isDragging = false;
        track.style.cursor = '';
    });

    // ── Auto-play ─────────────────────────────────────────────────────────────
    let autoPlay = setInterval(() => navigate(1), 4500);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => navigate(1), 4500);
    });

    // ── Initial render ────────────────────────────────────────────────────────
    render();
}
