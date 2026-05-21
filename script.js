document.addEventListener("DOMContentLoaded", () => {

    // ── Hero zoom-out on load ──────────────────────────
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) hero.classList.add('loaded');
    }, 100);

    // ── Navbar scrolled state ─────────────────────────
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ── Scroll reveal ─────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Stagger card reveals
    document.querySelectorAll('.card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.12}s`;
        observer.observe(card);
    });

    // Other reveal elements
    document.querySelectorAll('.reveal:not(.card)').forEach(el => {
        observer.observe(el);
    });

    // ── Pause marquee on hover ────────────────────────
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }

    // ── Custom Interactive Cursor with Lerp ───────────
    const cursor = document.querySelector('.custom-cursor');
    // We only initialize JS cursor tracking if the device supports hover
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (cursor && supportsHover) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isInside = false;

        // Position hidden initially
        cursor.style.opacity = '0';

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isInside) {
                cursor.style.opacity = '1';
                isInside = true;
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            isInside = false;
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            isInside = true;
        });

        // Lerp loop for smooth movement
        const tick = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            // 0.15 interpolation factor creates a luxurious, slightly delayed glide
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        };
        tick();

        // Click state
        window.addEventListener('mousedown', () => cursor.classList.add('clicked'));
        window.addEventListener('mouseup', () => cursor.classList.remove('clicked'));

        // Hover triggers
        const hoverTargets = 'a, button, .card, .tab-btn, input, textarea, select, .gallery-item';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverTargets)) {
                cursor.classList.add('hovered');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (!e.target.closest(hoverTargets)) {
                cursor.classList.remove('hovered');
            }
        });
    }

    // ── Gallery Tabs with Staggered Entrance ──────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.gallery-pane');

    const animatePane = (pane) => {
        const items = pane.querySelectorAll('.gallery-item');
        items.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(24px)';
            item.style.transition = 'none';
        });

        // Force reflow
        pane.offsetHeight;

        items.forEach((item, index) => {
            // Apply high-end ease transition
            item.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        });
    };

    // Stagger initial active pane
    const initialActivePane = document.querySelector('.gallery-pane.active');
    if (initialActivePane) {
        // Run slightly delayed to avoid fighting load frame rates
        setTimeout(() => animatePane(initialActivePane), 300);
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.tab}`;
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
                animatePane(targetPane);
            }
        });
    });

    // ── Subtle Hero Parallax Scroll ────────────────────
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                // Disable transform transition inline style to prevent lag/stiffness
                heroImage.style.transition = 'none';
                heroImage.style.transform = `translate3d(0, ${scrollY * 0.48}px, 0) scale(1.02)`;
            }
        }, { passive: true });
    }

});

// ── Newsletter form submit feedback ──────────────────
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = 'Gracias ✦';
    btn.style.background = 'var(--gold)';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 3000);
}
