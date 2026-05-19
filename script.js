document.addEventListener("DOMContentLoaded", () => {
    // Add loaded class to hero for subtle zoom animation
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(245, 242, 236, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(245, 242, 236, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations (fade in sections)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .philosophy .container').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });
});
