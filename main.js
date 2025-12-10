/* =============================================
   VOLATILITY OF EVERYDAY LIFE
   Main JavaScript
============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollReveal();
    initNavHighlight();
    initParallax();
    initVolatilityEffect();
});

/* Custom Cursor */
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .exploration-card, .keyword');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* Scroll Reveal Animation */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .concept-text, .concept-keywords, ' +
        '.exploration-card, .quote-container, .timeline-item, ' +
        '.outcome-statement, .outcome-details'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/* Navigation Highlight */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
}

/* Parallax Effects */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        if (scrollY < heroHeight) {
            const opacity = 1 - (scrollY / heroHeight) * 1.5;
            const translateY = scrollY * 0.3;
            
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(${translateY}px)`;
        }
    });
}

/* Volatility Effect - Subtle text trembling */
function initVolatilityEffect() {
    const titleLines = document.querySelectorAll('.title-line[data-text]');
    
    titleLines.forEach(line => {
        line.addEventListener('mouseenter', () => {
            line.style.animation = 'volatility 0.1s ease infinite';
        });
        
        line.addEventListener('mouseleave', () => {
            line.style.animation = '';
        });
    });
    
    // Add volatility keyframe dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes volatility {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-1px, 1px); }
            50% { transform: translate(1px, -1px); }
            75% { transform: translate(-1px, -1px); }
        }
    `;
    document.head.appendChild(style);
}

/* Smooth Scroll for Navigation */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* Add stagger animation to exploration cards */
const cards = document.querySelectorAll('.exploration-card');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

/* Timeline markers animation on scroll */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.querySelector('.timeline-marker').style.background = 'var(--color-accent)';
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => timelineObserver.observe(item));

/* Keywords floating animation */
const keywords = document.querySelectorAll('.keyword');
keywords.forEach((keyword, index) => {
    keyword.style.animationDelay = `${index * 0.2}s`;
});

/* Video Play/Pause Controls */
const demoVideo = document.getElementById('demoVideo');
const playPauseBtn = document.getElementById('playPauseBtn');

if (demoVideo && playPauseBtn) {
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    
    function toggleVideo() {
        if (demoVideo.paused) {
            demoVideo.play();
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
        } else {
            demoVideo.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline';
        }
    }
    
    playPauseBtn.addEventListener('click', toggleVideo);
    demoVideo.addEventListener('click', toggleVideo);
}

/* Plan Video Play/Pause Controls */
const planVideo = document.getElementById('planVideo');
const planPlayPauseBtn = document.getElementById('planPlayPauseBtn');

if (planVideo && planPlayPauseBtn) {
    const pauseIcon = planPlayPauseBtn.querySelector('.pause-icon');
    const playIcon = planPlayPauseBtn.querySelector('.play-icon');
    
    function togglePlanVideo() {
        if (planVideo.paused) {
            planVideo.play();
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
        } else {
            planVideo.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline';
        }
    }
    
    planPlayPauseBtn.addEventListener('click', togglePlanVideo);
    planVideo.addEventListener('click', togglePlanVideo);
}

