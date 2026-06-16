// Salon Configuration Data
// This file contains all business data for easy customization

const salonConfig = {
  name: 'Dasma Salon',
  tagline: 'Premium Grooming & Relaxation',
  address: 'Dasma Block 6 . Behind Co-op',
  phone: '+96599887766',
  services: [
    { name: 'Haircut', price: 'KWD 5' },
    { name: 'Beard', price: 'KWD 3' },
    { name: 'Sunfra', price: 'KWD 4' },
    { name: 'Head Wash', price: 'KWD 2' },
    { name: 'Head Massage', price: 'KWD 3' },
    { name: 'Hair Cream Treatments', price: 'KWD 6' },
    { name: 'Hair Coloring', price: 'KWD 8' }
  ],
  bookingLink: 'daniel-offer-zk2fzx/30min'
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = salonConfig;
}
