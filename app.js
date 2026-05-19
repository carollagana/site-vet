document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Also ensure menu toggle lines are visible against light background
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.style.backgroundColor = 'var(--clr-teal-deep)');
        } else {
            document.body.style.overflow = '';
            // Reset menu toggle lines color based on scroll position
            if (window.scrollY <= 50) {
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.style.backgroundColor = '');
            }
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
            
            if (window.scrollY <= 50) {
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.style.backgroundColor = '');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion FAQ functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Reveal elements on scroll (simple fade-in effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Skip hero section
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(section);
        }
    });

    // Testimonial Carousel Auto-Scroll (Continuous Marquee)
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        // Clone cards to create a seamless loop
        const cards = Array.from(carousel.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            carousel.appendChild(clone);
        });

        let scrollPos = 0;
        const scrollSpeed = 0.8; // pixels per frame

        const scrollLoop = () => {
            scrollPos += scrollSpeed;
            // If we scrolled past the first set of cards, jump back
            if (scrollPos >= carousel.scrollWidth / 2) {
                scrollPos = 0;
            }
            carousel.scrollLeft = scrollPos;
            requestAnimationFrame(scrollLoop);
        };

        // Initialize
        requestAnimationFrame(scrollLoop);
    }
});
