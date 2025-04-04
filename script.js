// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Fade-in animation for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Mobile menu close on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Appointment Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const dateInput = document.getElementById('appointmentDate');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Handle form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            date: dateInput.value,
            timeSlot: document.querySelector('input[name="timeSlot"]:checked').value,
            appointmentType: document.getElementById('appointmentType').value,
            patientName: document.getElementById('patientName').value,
            patientEmail: document.getElementById('patientEmail').value,
            patientPhone: document.getElementById('patientPhone').value,
            patientMessage: document.getElementById('patientMessage').value
        };

        // Here you would typically send this data to your backend server
        // For now, we'll just show a success message
        alert('Appointment request submitted successfully! We will contact you shortly to confirm your appointment.');
        
        // Reset form
        appointmentForm.reset();
    });

    // Disable past time slots for today
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        const timeSlots = document.querySelectorAll('.time-slot input[type="radio"]');
        
        timeSlots.forEach(slot => {
            const slotTime = slot.value.split(':');
            const slotDate = new Date(selectedDate);
            slotDate.setHours(parseInt(slotTime[0]), parseInt(slotTime[1]), 0);
            
            if (selectedDate.toDateString() === today.toDateString() && slotDate < today) {
                slot.disabled = true;
                slot.nextElementSibling.classList.add('disabled');
            } else {
                slot.disabled = false;
                slot.nextElementSibling.classList.remove('disabled');
            }
        });
    });
});

// Mobile Installation Prompt
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

// Show the install prompt when the app is ready to be installed
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.add('visible');
});

// Handle install button click
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        installPrompt.classList.remove('visible');
    }
});

// Handle dismiss button click
dismissBtn.addEventListener('click', () => {
    installPrompt.classList.remove('visible');
    // Store dismissal in localStorage to prevent showing again
    localStorage.setItem('installPromptDismissed', 'true');
});

// Check if user has already dismissed the prompt
if (localStorage.getItem('installPromptDismissed') === 'true') {
    installPrompt.classList.remove('visible');
} 