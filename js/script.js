// ========================================
// TESTIMONIAL SLIDER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // ========================================
    // GAME FILTERING
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter games with animation
            gameCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                const match = category === 'all' || cardCategory.includes(category);
                
                if (match) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * index);
                } else {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open current item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // FORM SUBMISSIONS
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    const membershipForm = document.querySelector('.membership-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('#name').value;
            alert(`✅ Thank you ${name}! Your message has been sent successfully. We'll get back to you within 24 hours!`);
            contactForm.reset();
        });
    }

    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = membershipForm.querySelector('#fullname').value;
            alert(`🎮 Welcome to the club, ${name}! Your membership application has been submitted. Come to our next meeting to get started!`);
            membershipForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert(`📬 Thank you! You've been subscribed to our newsletter. Check your email (${email}) for the welcome message!`);
            newsletterForm.reset();
        });
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a tab link or has data-filter attribute
            if (this.hasAttribute('data-category') || this.closest('.category-filter')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // ACTIVE NAVIGATION
    // ========================================
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // ========================================
    // ANIMATIONS ON SCROLL
    // ========================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.feature-card, .game-card, .event-card, .member-card, .info-item'
        );
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100 * index);
                }
            }
        });
    };
    
    // Set initial styles
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .game-card, .event-card, .member-card, .info-item'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Trigger animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    document.addEventListener('DOMContentLoaded', animateOnScroll);
    
    // Initial trigger
    setTimeout(animateOnScroll, 300);
});