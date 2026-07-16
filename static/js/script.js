(function() {
    const header = document.getElementById('siteHeader');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const scrollTopBtn = document.getElementById('scrollTop');
    const allNavAnchors = navLinks.querySelectorAll('a[href^="#"]');
    const heroTabs = document.querySelectorAll('.hero__tabs button');
    const fadeElements = document.querySelectorAll('.fade-in');


    function openMenu() {
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        burger.classList.add('active');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navOverlay.addEventListener('click', closeMenu);


    allNavAnchors.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    });


    function updateHeaderScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll(); 

    const sections = [];
    allNavAnchors.forEach(link => {
        const id = link.getAttribute('href').replace('#', '');
        const section = document.getElementById(id);
        if (section) sections.push({ link, section, id });
    });

    function updateActiveLink() {
        let currentId = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(({ section, id }) => {
            if (section.offsetTop <= scrollPos) {
                currentId = id;
            }
        });
        allNavAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink, { passive: true });


    function updateScrollTop() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', updateScrollTop, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    heroTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            heroTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabType = tab.getAttribute('data-tab');
            console.log('Switched to tab:', tabType);
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = header.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            burger.focus();
        }
    });

    console.log('🌿 Сайт психолога "Гармонія" готовий до роботи.');

    const carouselTrack = document.getElementById('carouselTrack');
    const slides = carouselTrack ? Array.from(carouselTrack.children) : [];
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (slides.length > 0) {
        let currentIndex = 0;
        let autoplayInterval;


        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel__dot');
            dot.setAttribute('aria-label', `Слайд ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            if (index === currentIndex) return;
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        }

        function nextSlide() {
            const newIndex = (currentIndex + 1) % slides.length;
            goToSlide(newIndex);
        }

        function prevSlide() {
            const newIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(newIndex);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        const carouselContainer = document.getElementById('certCarousel');
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);


        carouselContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });


        let touchStartX = 0;
        let touchEndX = 0;
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }


        updateCarousel();
        startAutoplay();
    }
})();