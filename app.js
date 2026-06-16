// Main Application JavaScript for Dasma Salon

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize Cal.com embed
  if (typeof Cal !== 'undefined') {
    Cal("init", {
      origin: "https://cal.com"
    });
  }
  
  // Function to open Cal.com booking overlay
  function openBookingOverlay() {
    if (typeof Cal !== 'undefined' && salonConfig && salonConfig.bookingLink) {
      Cal("link", {
        link: salonConfig.bookingLink,
        theme: "light",
        overlayCalendar: true
      });
    } else {
      console.error('Cal.com not initialized or booking link not configured');
    }
  }
  
  // Populate Services Grid from salonConfig
  function populateServices() {
    const servicesGrid = document.getElementById('services-grid');
    
    if (!salonConfig || !salonConfig.services) {
      console.error('Salon config not loaded');
      return;
    }
    
    servicesGrid.innerHTML = salonConfig.services.map(service => `
      <div class="service-card bg-white rounded-lg p-6 shadow-md border-l-4 border-bronze">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-charcoal">${service.name}</h3>
          <span class="text-bronze font-bold text-lg">${service.price}</span>
        </div>
      </div>
    `).join('');
  }
  
  // Mobile Menu Toggle
  function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Toggle hamburger icon
        const svg = mobileMenuBtn.querySelector('svg');
        if (mobileMenu.classList.contains('active')) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      });
      
      // Close mobile menu when a link is clicked
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          const svg = mobileMenuBtn.querySelector('svg');
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        });
      });
    }
  }
  
  // Setup Booking Buttons
  function setupBookingButtons() {
    const heroBookBtn = document.getElementById('hero-book-btn');
    const bookingSectionBtn = document.getElementById('booking-section-btn');
    
    if (heroBookBtn) {
      heroBookBtn.addEventListener('click', openBookingOverlay);
    }
    
    if (bookingSectionBtn) {
      bookingSectionBtn.addEventListener('click', openBookingOverlay);
    }
  }
  
  // Smooth Scroll for Navigation Links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
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
  }
  
  // Header Scroll Effect
  function setupHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('shadow-xl');
      } else {
        header.classList.remove('shadow-xl');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // Add Fade-in Animation on Scroll
  function setupScrollAnimations() {
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
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }
  
  // Initialize all components
  populateServices();
  setupMobileMenu();
  setupBookingButtons();
  setupSmoothScroll();
  setupHeaderScroll();
  
  // Delay scroll animations to ensure DOM is ready
  setTimeout(setupScrollAnimations, 100);
  
  // Log initialization
  console.log('Dasma Salon website initialized successfully');
  console.log('Salon Name:', salonConfig?.name);
  console.log('Services Count:', salonConfig?.services?.length);
});
