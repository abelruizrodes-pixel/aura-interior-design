document.addEventListener("DOMContentLoaded", () => {

    // Hero zoom-out on load
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100);

    // Navbar: scrolled state
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Intersection Observer — reveal cards and philosophy on scroll
    const revealEls = document.querySelectorAll('.card, .philosophy-inner, .philosophy-stats, .section-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(36px)';
        el.style.transition = `opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.1}s, transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1) ${i * 0.1}s`;
        observer.observe(el);
    });

    // When revealed class is added, animate in
    const styleTag = document.createElement('style');
    styleTag.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleTag);

});
