// Theme Toggle - Simple instant switch
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Set default theme to light
body.setAttribute('data-theme', 'light');
icon.className = 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Removed navbar background on scroll to prevent theme conflicts

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .about-text, .contact-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill Item Progress Animation
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Removed pulse animation - icons are now static
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Removed pulse animation styles

// Mobile Menu Toggle (if needed for future mobile navigation)
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    navContainer.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// Check if mobile menu is needed
function checkMobileMenu() {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            createMobileMenu();
        }
    } else {
        const mobileBtn = document.querySelector('.mobile-menu-toggle');
        if (mobileBtn) {
            mobileBtn.remove();
        }
    }
}

window.addEventListener('resize', checkMobileMenu);
document.addEventListener('DOMContentLoaded', checkMobileMenu);

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .mobile-menu-toggle {
        display: none;
        cursor: pointer;
        font-size: 24px;
        color: var(--text-primary);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--bg-primary);
            flex-direction: column;
            justify-content: start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Form Validation (for future contact form)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Equal card heights — fix .project-content height so button never moves
function equaliseCardHeights() {
    const contents = document.querySelectorAll('.project-content');
    contents.forEach(c => c.style.height = '');
    const max = Math.max(...Array.from(contents).map(c => c.offsetHeight));
    contents.forEach(c => c.style.height = max + 'px');
}

document.addEventListener('DOMContentLoaded', equaliseCardHeights);
window.addEventListener('resize', equaliseCardHeights);

// Read More / Collapse toggle for project cards
function toggleReadMore(btn) {
    const content = btn.closest('.project-content');
    const collapsible = content.nextElementSibling;
    const isOpen = collapsible.classList.contains('expanded');
    collapsible.classList.toggle('expanded', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.innerHTML = (!isOpen ? 'Minder info' : 'Meer info') + ' <span class="arrow">&#9660;</span>';
}

// Console Welcome Message
console.log('%c Welcome to Yunus Ciddioglu Portfolio! ', 'background: #3b82f6; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with HTML, CSS, and JavaScript ', 'background: #1e40af; color: white; font-size: 12px; padding: 8px; border-radius: 5px;');

// Video Modal Functions
function openVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    modal.style.display = 'block';
    video.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.pause();
    video.currentTime = 0;
    modal.style.display = 'none';
}

// Initialize video thumbnail and click handler
document.addEventListener('DOMContentLoaded', () => {
    const thumbnail = document.querySelector('.video-thumbnail');
    const videoContainer = document.querySelector('.video-container');
    
    if (thumbnail) {
        thumbnail.currentTime = 1; // Show frame at 1 second
        thumbnail.pause();
    }
    
    if (videoContainer) {
        videoContainer.addEventListener('click', openVideoModal);
    }
});

// Close modal when clicking outside the video
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target == modal) {
        closeVideoModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});
