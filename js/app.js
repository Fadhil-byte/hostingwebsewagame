document.addEventListener('DOMContentLoaded', function() {
    // ========== Navbar Scroll Effect ==========
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleNavbarScroll = function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.classList.remove('shadow-lg');
                navbar.style.padding = '0.75rem 0';
            }
        };
        window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll();
    }

    // ========== Feature Cards Animation ==========
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 150) + 'ms';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });

    // ========== Step Circles Animation ==========
    const stepCircles = document.querySelectorAll('.step-circle');
    stepCircles.forEach((circle, index) => {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0.8)';
        circle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(circle);
    });

    // ========== Smooth Scroll for anchor links ==========
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Stat Cards Animation ==========
    const statCards = document.querySelectorAll('.stats-users, .stats-products, .stats-active, .stats-revenue');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 150) + 'ms';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(card);
    });

    // ========== Product Cards Animation ==========
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 100) + 'ms';

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });

    // ========== Delete from cart confirmation ==========
    const deleteButtons = document.querySelectorAll('.btn-delete-cart');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!confirm('Hapus produk ini dari keranjang?')) {
                e.preventDefault();
            }
        });
    });

    // ========== Checkout confirmation ==========
    const checkoutBtn = document.querySelector('.btn-checkout-confirm');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            if (!confirm('Konfirmasi peminjaman?')) {
                e.preventDefault();
            }
        });
    }

    // ========== Alert auto-dismiss ==========
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeBtn = alert.querySelector('.btn-close');
            if (closeBtn) closeBtn.click();
        }, 5000);
    });

    // ========== Page content fade in ==========
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.style.opacity = '0';
        pageContent.style.transform = 'translateY(15px)';
        pageContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        requestAnimationFrame(() => {
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
        });
    }
});
