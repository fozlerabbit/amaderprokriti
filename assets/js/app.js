// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});

// ============================================
// Smooth Scrolling
// ============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.pageYOffset;
  const navHeight = document.getElementById('navbar').offsetHeight;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - navHeight - 50;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Form Validation
// ============================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    formMessage.className = 'form__message';
    formMessage.style.display = 'none';
    
    if (name === '' || email === '' || message === '') {
      showMessage('Please fill in all fields.', 'error');
      return;
    }
    
    if (!validateEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form__message ${type}`;
  formMessage.style.display = 'block';
  
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// ============================================
// Initialize Active Link on Page Load
// ============================================
window.addEventListener('load', () => {
  updateActiveLink();
});
