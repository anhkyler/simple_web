/* ============================================================
   AURA NAILS - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ======================== ACTIVE NAV HIGHLIGHTING ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = '#' + entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -60% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ======================== MOBILE NAV AUTO-CLOSE ========================
    const navbarCollapse = document.getElementById('navbarContent');
    const clickableNavItems = document.querySelectorAll('#navbarContent .nav-link, #navbarContent .btn');

    clickableNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    // ======================== CONTACT FORM VALIDATION ========================
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = form.querySelectorAll('[required]');
            let valid = true;

            fields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    valid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Email format check
            const email = form.querySelector('[name="email"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && email.value && !emailPattern.test(email.value)) {
                email.classList.add('is-invalid');
                valid = false;
            }

            if (valid) {
                const firstName = form.querySelector('[name="firstName"]').value.trim();
                const lastName = form.querySelector('[name="lastName"]').value.trim();
                const userEmail = email.value.trim();
                const message = form.querySelector('[name="message"]').value.trim();

                const subject = encodeURIComponent('Contact from ' + firstName + ' ' + lastName);
                const body = encodeURIComponent(
                    'Name: ' + firstName + ' ' + lastName + '\n' +
                    'Email: ' + userEmail + '\n\n' +
                    'Message:\n' + message
                );

                window.location.href = 'mailto:auranailslounge.sc@gmail.com?subject=' + subject + '&body=' + body;

                feedback.style.display = 'block';
                feedback.className = 'mt-3 alert alert-success';
                feedback.textContent = 'Thank you for your message! Your email client should open shortly.';
                form.reset();

                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 5000);
            }
        });

        // Remove invalid styling on input
        form.querySelectorAll('.contact-input').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
        });
    }

    // ======================== SCROLL REVEAL ANIMATION ========================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));

});
