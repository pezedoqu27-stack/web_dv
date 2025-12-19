// ===== Cursor Follower with Trail =====
const cursor = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX - 12 + 'px';
    cursor.style.top = cursorY - 12 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        cursor.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = '0.6';
    });
});

// ===== Navbar Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 50);

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ===== Mobile Menu =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Portfolio Filter with Animation =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach((item, index) => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.95)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Scroll Animations with Stagger =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Staggered children animation
            const children = entry.target.querySelectorAll('.skill-item, .service-card, .portfolio-item');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
                child.classList.add('animate-in');
            });

            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                setTimeout(() => {
                    entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                        bar.style.width = bar.style.getPropertyValue('--progress');
                    });
                }, 300);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.section-header, .about-content, .portfolio-grid, .services-grid, .contact-content, .skills').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .navbar { transition: transform 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease; }
`;
document.head.appendChild(style);

// ===== Parallax Effect on Shapes =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.geometric-shape');
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== Floating Shapes Animation Enhancement =====
const floatCircles = document.querySelectorAll('.float-circle');
floatCircles.forEach((circle, index) => {
    circle.style.animationDuration = `${15 + index * 5}s`;
});

// ===== Form Handling with Animation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        // Success animation
        btn.innerHTML = '<span>Отправлено ✨</span>';
        btn.style.background = 'linear-gradient(135deg, #5A8B6A, #3D5C4A)';
        btn.style.transform = 'scale(1.05)';

        // Confetti effect
        createConfetti();

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.transform = '';
            contactForm.reset();
        }, 3500);
    });
}

// ===== Confetti Effect =====
function createConfetti() {
    const colors = ['#F5E6E8', '#E8C4C8', '#8B5A4A', '#D4C4BC', '#5C3D33'];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 2 + 2}s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
`;
document.head.appendChild(confettiStyle);

// ===== Text Reveal Animation =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.querySelectorAll('.title-line').forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = i === 0 ? 'translateX(-60px)' : 'translateX(60px)';
        setTimeout(() => {
            line.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 400 + (i * 250));
    });
}

// Hero elements staggered animation
document.querySelectorAll('.hero-greeting, .hero-subtitle, .hero-description, .hero-cta').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 800 + (i * 150));
});

// ===== Active Nav Link & Paper Background Effect =====
const sections = document.querySelectorAll('section[id]');
const body = document.body;
const paperColors = [
    'var(--paper-1)', // Hero
    'var(--paper-2)', // About
    'var(--paper-3)', // Portfolio
    'var(--paper-2)', // Services
    'var(--paper-4)'  // Contact
];

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200; // Offset for better triggering

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Update Active Nav Link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });

            // Update Paper Background Color
            if (paperColors[index]) {
                body.style.backgroundColor = paperColors[index];
            }
        }
    });
});

// ===== Magnetic Button Effect =====
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

console.log('✨ Дарья Волегова Portfolio загружен');
