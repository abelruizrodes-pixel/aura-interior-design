document.addEventListener("DOMContentLoaded", () => {

    // ── Hero zoom-out on load ──────────────────────────
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100);

    // ── Navbar scrolled state ─────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

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
        card.style.transitionDelay = `${i * 0.1}s`;
        observer.observe(card);
    });

    // Other reveal elements
    document.querySelectorAll('.philosophy-inner, .manifesto-inner, .contact-inner, .section-header').forEach(el => {
        observer.observe(el);
    });

    // ── Pause marquee on hover ────────────────────────
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
        marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
    }

    // ── Gallery Tabs ───────────────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.gallery-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.tab}`;
            document.getElementById(targetId).classList.add('active');
        });
    });

});

// ── Newsletter form ───────────────────────────────────
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
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
