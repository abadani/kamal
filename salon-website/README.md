# Luxe & Co. Salon Website

A modern, high-converting responsive website for a premium salon with an integrated booking system.

## 🚀 Features

- **Responsive Design**: 100% mobile-first optimized
- **Single Page Application**: Smooth scroll navigation between sections
- **Configurable Content**: All business data separated in `salonConfig.js` for easy rebranding
- **Integrated Booking System**: 5-step appointment booking with LocalStorage persistence
- **Modern UI/UX**: Elegant animations, hover effects, and transitions

## 📁 Project Structure

```
salon-website/
├── index.html              # Main HTML file with all sections
├── js/
│   ├── salonConfig.js      # Centralized business configuration
│   └── app.js              # Application logic and UI components
├── css/                    # (Optional custom styles - using Tailwind CDN)
└── images/                 # Image assets directory
```

## 🎨 Sections Included

1. **Hero Section**: High-impact design with clear CTA
2. **About & Identity**: Salon philosophy and features
3. **Service Menu**: Categorized grid (Hair, Nails, Skin Care) with prices
4. **Team Section**: Staff profiles with roles and specialties
5. **Gallery Portfolio**: Responsive image grid
6. **Testimonials**: Customer reviews with ratings
7. **Contact Section**: Address, phone, email, and operating hours
8. **Booking Modal**: Interactive 5-step appointment system

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Via CDN for rapid styling
- **Vanilla JavaScript**: Clean, modular ES6+ code
- **Google Fonts**: Playfair Display + Inter

## 📱 Booking System Features

1. **Step 1 - Select Service**: Multi-select checkboxes with dynamic total calculation
2. **Step 2 - Select Stylist**: Team member cards with images (or "any available")
3. **Step 3 - Date & Time**: Smart calendar with operating hours validation
4. **Step 4 - Client Info**: Name, email, phone, and special notes
5. **Step 5 - Confirmation**: Booking summary with confirmation number

### Data Persistence
- Bookings stored in browser LocalStorage
- Console logs structured JSON payload on submission
- Unique booking ID generation

## 🔧 Customization

To rebrand the salon, simply edit `js/salonConfig.js`:

```javascript
export const salonConfig = {
  name: "Your Salon Name",
  tagline: "Your Tagline",
  address: "Your Address",
  phone: "Your Phone",
  // ... edit team, services, testimonials, etc.
};
```

## 🌐 Usage

1. Open `index.html` in a modern web browser
2. No build process required - uses Tailwind CDN
3. For production, consider:
   - Downloading Tailwind CSS locally
   - Optimizing images
   - Adding actual backend integration

## 📝 Notes

- Images use Unsplash placeholders with fallbacks
- Operating hours prevent booking outside business hours
- Date picker prevents past dates and allows booking up to 2 months ahead
- Mobile menu included for responsive navigation

## 🎯 Performance

- Minimal dependencies
- Lazy-loading ready
- Optimized animations with CSS transitions
- Semantic HTML for accessibility

---

**Ready for review!** Open `index.html` in your browser to see the complete salon website.
