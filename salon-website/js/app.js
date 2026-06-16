// Main Application JavaScript
import salonConfig from './salonConfig.js';

// ============================================
// State Management
// ============================================
let currentStep = 1;
let selectedServices = [];
let selectedTeamMember = null;
let selectedDate = null;
let selectedTime = null;

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const servicesGrid = document.getElementById('services-grid');
const teamGrid = document.getElementById('team-grid');
const galleryGrid = document.getElementById('gallery-grid');
const testimonialsGrid = document.getElementById('testimonials-grid');
const operatingHoursContainer = document.getElementById('operating-hours');
const bookingModal = document.getElementById('booking-modal');
const modalContent = bookingModal.querySelector('.modal-content');
const modalBackdrop = bookingModal.querySelector('.modal-backdrop');

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Populate all sections from config
  populateSalonInfo();
  populateServices('hair');
  populateTeam();
  populateGallery();
  populateTestimonials();
  populateOperatingHours();
  
  // Set up event listeners
  setupEventListeners();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

// ============================================
// Populate UI from Config
// ============================================
function populateSalonInfo() {
  // Logo and name
  document.getElementById('logo-placeholder').textContent = salonConfig.logoPlaceholder;
  document.getElementById('nav-salon-name').textContent = salonConfig.name.split('.')[0];
  document.getElementById('footer-logo').textContent = salonConfig.logoPlaceholder;
  document.getElementById('hero-tagline').textContent = salonConfig.tagline;
  
  // Contact info
  document.getElementById('contact-address').textContent = salonConfig.address;
  document.getElementById('contact-phone').textContent = salonConfig.phone;
  document.getElementById('contact-email').textContent = salonConfig.email;
}

function populateServices(category) {
  const services = salonConfig.services[category] || [];
  servicesGrid.innerHTML = '';
  
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card bg-salon-cream rounded-xl p-6 border border-gray-200 cursor-pointer hover:border-salon-gold';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-display text-xl font-semibold">${service.name}</h3>
        <span class="text-salon-gold font-bold text-lg">$${service.price}</span>
      </div>
      <p class="text-gray-600 mb-4">${service.description}</p>
      <div class="flex items-center text-sm text-gray-500">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        ${service.duration} minutes
      </div>
    `;
    servicesGrid.appendChild(card);
  });
  
  // Update active tab
  document.querySelectorAll('.service-tab-btn').forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('bg-salon-gold', 'text-white');
      btn.classList.remove('bg-salon-cream', 'text-salon-charcoal');
    } else {
      btn.classList.remove('bg-salon-gold', 'text-white');
      btn.classList.add('bg-salon-cream', 'text-salon-charcoal');
    }
  });
}

function populateTeam() {
  teamGrid.innerHTML = '';
  
  salonConfig.team.forEach(member => {
    const card = document.createElement('div');
    card.className = 'text-center group';
    card.innerHTML = `
      <div class="relative w-full aspect-[3:4] rounded-xl overflow-hidden mb-4 bg-gray-200">
        <img 
          src="${member.image}" 
          alt="${member.name}"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onerror="this.src='https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 class="font-display text-lg font-bold">${member.name}</h3>
      <p class="text-salon-gold font-medium text-sm mb-2">${member.role}</p>
      <p class="text-gray-600 text-sm">${member.specialty}</p>
    `;
    teamGrid.appendChild(card);
  });
}

function populateGallery() {
  galleryGrid.innerHTML = '';
  
  salonConfig.gallery.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item rounded-xl overflow-hidden shadow-lg aspect-square';
    div.innerHTML = `
      <img 
        src="${item.src}" 
        alt="${item.alt}"
        class="w-full h-full object-cover"
        onerror="this.src='https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80'"
      />
    `;
    galleryGrid.appendChild(div);
  });
}

function populateTestimonials() {
  testimonialsGrid.innerHTML = '';
  
  salonConfig.testimonials.forEach(testimonial => {
    const card = document.createElement('div');
    card.className = 'testimonial-card bg-salon-cream rounded-xl p-6 border border-gray-200';
    
    let stars = '';
    for (let i = 0; i < testimonial.rating; i++) {
      stars += '★';
    }
    
    card.innerHTML = `
      <div class="star-rating text-xl mb-3">${stars}</div>
      <p class="text-gray-700 mb-4 italic">"${testimonial.text}"</p>
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold">${testimonial.name}</p>
          <p class="text-sm text-gray-500">${testimonial.service}</p>
        </div>
      </div>
    `;
    testimonialsGrid.appendChild(card);
  });
}

function populateOperatingHours() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  operatingHoursContainer.innerHTML = '';
  
  days.forEach((day, index) => {
    const hours = salonConfig.operatingHours[day];
    const openTime = formatTime(hours.open);
    const closeTime = formatTime(hours.close);
    
    const div = document.createElement('div');
    div.className = 'flex justify-between';
    div.innerHTML = `
      <span>${dayNames[index]}</span>
      <span>${openTime} - ${closeTime}</span>
    `;
    operatingHoursContainer.appendChild(div);
  });
}

function formatTime(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  return `${displayHour}:00 ${ampm}`;
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Service tabs
  document.querySelectorAll('.service-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.dataset.category;
      populateServices(category);
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleScroll);
  
  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
}

function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-md');
  } else {
    navbar.classList.remove('shadow-md');
  }
}

// ============================================
// Booking Modal Functions (Cal.com Iframe)
// ============================================
window.openBookingModal = function() {
  bookingModal.classList.remove('hidden');

  // Set iframe src from data-src attribute to trigger load
  const iframe = document.getElementById('cal-iframe');
  const dataSrc = iframe.getAttribute('data-src');
  if (dataSrc && iframe.src !== dataSrc) {
    iframe.src = dataSrc;
  }

  // Animate in
  setTimeout(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('opacity-0', 'scale-95');
    modalContent.classList.add('opacity-100', 'scale-100');
  }, 10);
};

window.closeBookingModal = function() {
  // Animate out
  modalBackdrop.classList.add('opacity-0');
  modalContent.classList.remove('opacity-100', 'scale-100');
  modalContent.classList.add('opacity-0', 'scale-95');

  setTimeout(() => {
    bookingModal.classList.add('hidden');
    // Reset iframe for fresh load next time
    resetIframe();
  }, 300);
};

// Handle iframe load event - called from HTML
window.onIframeLoad = function() {
  const iframe = document.getElementById('cal-iframe');
  const loader = document.getElementById('iframe-loader');

  console.log('Iframe loaded successfully');

  // Fade out loader and fade in iframe
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }

  if (iframe) {
    iframe.style.opacity = '1';
  }
};

// Reset iframe when modal closes
function resetIframe() {
  const iframe = document.getElementById('cal-iframe');
  const loader = document.getElementById('iframe-loader');

  if (iframe) {
    // Clear src to stop the iframe
    iframe.src = '';
    // Reset opacity
    iframe.style.opacity = '0';
  }

  if (loader) {
    loader.style.display = 'flex';
    loader.style.opacity = '1';
  }
}

// Make toggleMobileMenu globally accessible
window.toggleMobileMenu = toggleMobileMenu;
