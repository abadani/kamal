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
// Booking Modal Functions
// ============================================
window.openBookingModal = function() {
  bookingModal.classList.remove('hidden');
  
  // Animate in
  setTimeout(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('opacity-0', 'scale-95');
    modalContent.classList.add('opacity-100', 'scale-100');
  }, 10);
  
  // Initialize booking form
  initializeBookingForm();
};

window.closeBookingModal = function() {
  // Animate out
  modalBackdrop.classList.add('opacity-0');
  modalContent.classList.remove('opacity-100', 'scale-100');
  modalContent.classList.add('opacity-0', 'scale-95');
  
  setTimeout(() => {
    bookingModal.classList.add('hidden');
    resetBookingForm();
  }, 300);
};

function initializeBookingForm() {
  currentStep = 1;
  selectedServices = [];
  selectedTeamMember = null;
  selectedDate = null;
  selectedTime = null;
  
  renderBookingServices();
  renderBookingTeam();
  updateStepUI();
}

function renderBookingServices() {
  const container = document.getElementById('booking-services');
  container.innerHTML = '';
  
  // Group services by category
  Object.entries(salonConfig.services).forEach(([category, services]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'mb-6';
    categoryDiv.innerHTML = `<h5 class="font-semibold text-lg mb-3 capitalize">${category}</h5>`;
    
    const servicesDiv = document.createElement('div');
    servicesDiv.className = 'space-y-3';
    
    services.forEach(service => {
      const label = document.createElement('label');
      label.className = 'flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-salon-gold transition-colors';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = service.id;
      checkbox.className = 'w-5 h-5 text-salon-gold rounded focus:ring-salon-gold';
      checkbox.addEventListener('change', handleServiceSelection);
      
      label.innerHTML = `
        <div class="flex items-center space-x-3">
          ${checkbox.outerHTML}
          <div>
            <p class="font-medium">${service.name}</p>
            <p class="text-sm text-gray-500">${service.duration} min</p>
          </div>
        </div>
        <span class="text-salon-gold font-bold">$${service.price}</span>
      `;
      
      // Re-attach checkbox reference after innerHTML
      const actualCheckbox = label.querySelector('input[type="checkbox"]');
      actualCheckbox.addEventListener('change', handleServiceSelection);
      
      servicesDiv.appendChild(label);
    });
    
    categoryDiv.appendChild(servicesDiv);
    container.appendChild(categoryDiv);
  });
  
  updateBookingTotal();
}

function handleServiceSelection(e) {
  const serviceId = e.target.value;
  const isChecked = e.target.checked;
  
  if (isChecked) {
    const service = getAllServices().find(s => s.id === serviceId);
    if (service && !selectedServices.find(s => s.id === serviceId)) {
      selectedServices.push(service);
    }
  } else {
    selectedServices = selectedServices.filter(s => s.id !== serviceId);
  }
  
  updateBookingTotal();
}

function getAllServices() {
  return Object.values(salonConfig.services).flat();
}

function updateBookingTotal() {
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const duration = selectedServices.reduce((sum, service) => sum + service.duration, 0);
  
  document.getElementById('booking-total').textContent = `$${total}`;
  document.getElementById('booking-duration').textContent = `Estimated duration: ${duration} minutes`;
}

function renderBookingTeam() {
  const container = document.getElementById('booking-team');
  container.innerHTML = '';
  
  salonConfig.team.forEach(member => {
    const label = document.createElement('label');
    label.className = 'flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-salon-gold transition-colors';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'team-member';
    radio.value = member.id;
    radio.className = 'w-5 h-5 text-salon-gold focus:ring-salon-gold';
    radio.addEventListener('change', () => {
      selectedTeamMember = member;
    });
    
    label.innerHTML = `
      <div class="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img 
          src="${member.image}" 
          alt="${member.name}"
          class="w-full h-full object-cover"
          onerror="this.src='https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80'"
        />
      </div>
      <div>
        <p class="font-semibold">${member.name}</p>
        <p class="text-sm text-gray-500">${member.role}</p>
      </div>
    `;
    
    // Re-attach radio after innerHTML
    const actualRadio = label.querySelector('input[type="radio"]');
    actualRadio.addEventListener('change', () => {
      selectedTeamMember = member;
    });
    
    container.appendChild(label);
  });
}

function renderTimeSlots() {
  const container = document.getElementById('time-slots');
  container.innerHTML = '';
  
  if (!selectedDate) {
    container.innerHTML = '<p class="text-gray-500 col-span-full">Please select a date first</p>';
    return;
  }
  
  const date = new Date(selectedDate);
  const dayName = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
  const hours = salonConfig.operatingHours[dayName];
  
  if (!hours) {
    container.innerHTML = '<p class="text-gray-500 col-span-full">We are closed on this day</p>';
    return;
  }
  
  // Calculate available slots based on service duration
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const slotInterval = 30; // 30-minute intervals
  
  for (let hour = hours.open; hour < hours.close; hour++) {
    for (let minute = 0; minute < 60; minute += slotInterval) {
      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = formatTimeSlot(hour, minute);
      
      // Check if there's enough time before closing
      const slotEndMinutes = (hour * 60 + minute + totalDuration);
      const closingMinutes = hours.close * 60;
      
      const isDisabled = slotEndMinutes > closingMinutes;
      
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `time-slot py-3 px-2 border-2 rounded-lg font-medium text-sm transition-all ${
        isDisabled 
          ? 'disabled' 
          : selectedTime === timeValue
            ? 'selected'
            : 'border-gray-200 hover:border-salon-gold'
      }`;
      button.textContent = displayTime;
      button.disabled = isDisabled;
      
      if (!isDisabled) {
        button.addEventListener('click', () => {
          selectedTime = timeValue;
          renderTimeSlots();
        });
      }
      
      container.appendChild(button);
    }
  }
}

function formatTimeSlot(hour, minute) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${ampm}`;
}

function updateStepUI() {
  // Hide all steps
  document.querySelectorAll('.step-content').forEach(step => {
    step.classList.add('hidden');
  });
  
  // Show current step
  const currentStepEl = document.getElementById(`step-${currentStep}`);
  if (currentStepEl) {
    currentStepEl.classList.remove('hidden');
  }
  
  // Update progress indicators
  document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
    const stepNum = index + 1;
    if (stepNum <= currentStep) {
      indicator.classList.remove('bg-gray-200', 'text-gray-500');
      indicator.classList.add('bg-salon-gold', 'text-white');
    } else {
      indicator.classList.add('bg-gray-200', 'text-gray-500');
      indicator.classList.remove('bg-salon-gold', 'text-white');
    }
  });
  
  // Update step text colors
  document.querySelectorAll('.step-text').forEach((text, index) => {
    const stepNum = index + 1;
    if (stepNum <= currentStep) {
      text.classList.remove('text-gray-500');
      text.classList.add('text-salon-gold');
    } else {
      text.classList.add('text-gray-500');
      text.classList.remove('text-salon-gold');
    }
  });
  
  // Update navigation buttons
  const prevBtn = document.getElementById('prev-step-btn');
  const nextBtn = document.getElementById('next-step-btn');
  
  if (currentStep === 1) {
    prevBtn.classList.add('hidden');
  } else {
    prevBtn.classList.remove('hidden');
  }
  
  if (currentStep === 4) {
    nextBtn.textContent = 'Confirm Booking';
    updateBookingSummary();
  } else if (currentStep === 5) {
    nextBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
  } else {
    nextBtn.textContent = 'Continue';
    nextBtn.classList.remove('hidden');
  }
}

function updateBookingSummary() {
  const summaryContainer = document.getElementById('booking-summary');
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const duration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  
  const servicesList = selectedServices.map(s => s.name).join(', ') || 'None selected';
  const teamMemberName = selectedTeamMember ? selectedTeamMember.name : 'Any available professional';
  const dateTime = selectedDate && selectedTime 
    ? `${new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${formatTimeSlot(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1]))}`
    : 'Not selected';
  
  summaryContainer.innerHTML = `
    <div class="flex justify-between">
      <span class="text-gray-600">Services:</span>
      <span class="font-medium">${servicesList}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600">Stylist:</span>
      <span class="font-medium">${teamMemberName}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600">Date & Time:</span>
      <span class="font-medium">${dateTime}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600">Duration:</span>
      <span class="font-medium">${duration} minutes</span>
    </div>
    <div class="flex justify-between pt-2 border-t border-gray-300 mt-2">
      <span class="font-semibold">Total:</span>
      <span class="font-bold text-salon-gold text-lg">$${total}</span>
    </div>
  `;
}

window.nextStep = function() {
  // Validation
  if (currentStep === 1 && selectedServices.length === 0) {
    alert('Please select at least one service');
    return;
  }
  
  if (currentStep === 2) {
    // Team member selection is optional (defaults to "any")
  }
  
  if (currentStep === 3) {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
  }
  
  if (currentStep === 4) {
    if (!validateClientInfo()) {
      return;
    }
    submitBooking();
    return;
  }
  
  currentStep++;
  
  // Initialize step-specific content
  if (currentStep === 3) {
    setupDatePicker();
    renderTimeSlots();
  }
  
  updateStepUI();
};

window.previousStep = function() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
};

function setupDatePicker() {
  const dateInput = document.getElementById('booking-date');
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2); // Allow booking up to 2 months in advance
  
  dateInput.min = today.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
  
  dateInput.addEventListener('change', (e) => {
    selectedDate = e.target.value;
    selectedTime = null; // Reset time when date changes
    renderTimeSlots();
  });
}

function validateClientInfo() {
  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const email = document.getElementById('client-email').value.trim();
  
  if (!name || !phone || !email) {
    alert('Please fill in all required fields');
    return false;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  return true;
}

function submitBooking() {
  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const notes = document.getElementById('client-notes').value.trim();
  
  const bookingData = {
    id: generateBookingId(),
    services: selectedServices,
    teamMember: selectedTeamMember,
    date: selectedDate,
    time: selectedTime,
    client: {
      name,
      phone,
      email,
      notes
    },
    total: selectedServices.reduce((sum, s) => sum + s.price, 0),
    duration: selectedServices.reduce((sum, s) => sum + s.duration, 0),
    createdAt: new Date().toISOString()
  };
  
  // Store in localStorage
  const existingBookings = JSON.parse(localStorage.getItem('salonBookings') || '[]');
  existingBookings.push(bookingData);
  localStorage.setItem('salonBookings', JSON.stringify(existingBookings));
  
  // Log to console
  console.log('🎉 New Booking Created!');
  console.log(JSON.stringify(bookingData, null, 2));
  
  // Show confirmation
  showConfirmation(bookingData);
}

function generateBookingId() {
  return 'BK-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function showConfirmation(bookingData) {
  currentStep = 5;
  updateStepUI();
  
  const detailsContainer = document.getElementById('confirmation-details');
  const timeDisplay = formatTimeSlot(parseInt(bookingData.time.split(':')[0]), parseInt(bookingData.time.split(':')[1]));
  const dateDisplay = new Date(bookingData.date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  detailsContainer.innerHTML = `
    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-600">Confirmation #:</span>
        <span class="font-mono font-medium">${bookingData.id}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Date:</span>
        <span class="font-medium">${dateDisplay}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Time:</span>
        <span class="font-medium">${timeDisplay}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Services:</span>
        <span class="font-medium">${bookingData.services.map(s => s.name).join(', ')}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Stylist:</span>
        <span class="font-medium">${bookingData.teamMember ? bookingData.teamMember.name : 'Any available professional'}</span>
      </div>
      <div class="flex justify-between pt-3 border-t border-gray-300">
        <span class="font-semibold">Total:</span>
        <span class="font-bold text-salon-gold text-lg">$${bookingData.total}</span>
      </div>
    </div>
  `;
}

function resetBookingForm() {
  currentStep = 1;
  selectedServices = [];
  selectedTeamMember = null;
  selectedDate = null;
  selectedTime = null;
  
  document.getElementById('booking-form').reset();
}

// Make functions globally accessible
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.toggleMobileMenu = toggleMobileMenu;
