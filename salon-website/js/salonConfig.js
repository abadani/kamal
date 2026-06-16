// Salon Configuration - Centralized Business Data
// Edit this file to re-brand the entire website

export const salonConfig = {
  // Basic Information
  name: "Luxe & Co. Salon",
  tagline: "Where Beauty Meets Elegance",
  logoPlaceholder: "L&Co",
  
  // Contact Information
  address: "123 Fashion Avenue, Beverly Hills, CA 90210",
  phone: "(555) 123-4567",
  email: "hello@luxecosalon.com",
  
  // Operating Hours (24-hour format)
  operatingHours: {
    monday: { open: 9, close: 18 },
    tuesday: { open: 9, close: 18 },
    wednesday: { open: 9, close: 18 },
    thursday: { open: 9, close: 20 },
    friday: { open: 9, close: 20 },
    saturday: { open: 8, close: 17 },
    sunday: { open: 10, close: 16 }
  },
  
  // Team Members
  team: [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Master Stylist",
      specialty: "Color & Balayage",
      image: "images/team/sarah.jpg",
      bio: "15 years of experience in premium hair coloring"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Senior Stylist",
      specialty: "Precision Cuts",
      image: "images/team/marcus.jpg",
      bio: "Award-winning stylist specializing in modern cuts"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Nail Artist",
      specialty: "Luxury Manicures",
      image: "images/team/emma.jpg",
      bio: "Certified nail technician with artistic flair"
    },
    {
      id: 4,
      name: "Olivia Park",
      role: "Esthetician",
      specialty: "Skin Care",
      image: "images/team/olivia.jpg",
      bio: "Licensed esthetician focused on radiant skin"
    }
  ],
  
  // Services by Category
  services: {
    hair: [
      {
        id: "h1",
        name: "Signature Cut & Style",
        description: "Precision cut with blowout and styling",
        price: 85,
        duration: 60
      },
      {
        id: "h2",
        name: "Full Color",
        description: "Single process color with toner",
        price: 120,
        duration: 90
      },
      {
        id: "h3",
        name: "Balayage",
        description: "Hand-painted highlights for natural dimension",
        price: 200,
        duration: 150
      },
      {
        id: "h4",
        name: "Keratin Treatment",
        description: "Smoothing treatment for frizz-free hair",
        price: 250,
        duration: 120
      }
    ],
    nails: [
      {
        id: "n1",
        name: "Luxury Manicure",
        description: "Classic manicure with massage",
        price: 45,
        duration: 45
      },
      {
        id: "n2",
        name: "Gel Polish",
        description: "Long-lasting gel polish application",
        price: 60,
        duration: 60
      },
      {
        id: "n3",
        name: "Acrylic Full Set",
        description: "Premium acrylic extensions",
        price: 80,
        duration: 90
      },
      {
        id: "n4",
        name: "Spa Pedicure",
        description: "Relaxing pedicure with foot massage",
        price: 65,
        duration: 60
      }
    ],
    skin: [
      {
        id: "s1",
        name: "Signature Facial",
        description: "Deep cleansing with hydration",
        price: 95,
        duration: 60
      },
      {
        id: "s2",
        name: "Anti-Aging Treatment",
        description: "Advanced serum and mask therapy",
        price: 135,
        duration: 75
      },
      {
        id: "s3",
        name: "Chemical Peel",
        description: "Gentle exfoliation for radiant skin",
        price: 110,
        duration: 45
      },
      {
        id: "s4",
        name: "Microdermabrasion",
        description: "Deep exfoliation for smooth texture",
        price: 125,
        duration: 60
      }
    ]
  },
  
  // Testimonials
  testimonials: [
    {
      id: 1,
      name: "Jennifer L.",
      rating: 5,
      text: "Absolutely love this salon! Sarah transformed my hair exactly how I wanted. The atmosphere is so relaxing and luxurious.",
      service: "Balayage"
    },
    {
      id: 2,
      name: "Michelle K.",
      rating: 5,
      text: "Best manicure I've ever had! Emma is incredibly talented and the attention to detail is amazing.",
      service: "Gel Polish"
    },
    {
      id: 3,
      name: "Amanda R.",
      rating: 5,
      text: "The facial here is worth every penny. My skin has never looked better. Highly recommend Olivia!",
      service: "Signature Facial"
    },
    {
      id: 4,
      name: "Rachel T.",
      rating: 5,
      text: "Finally found a salon that understands my hair goals. Marcus is a genius with scissors!",
      service: "Signature Cut & Style"
    }
  ],
  
  // Gallery Images (placeholders)
  gallery: [
    { id: 1, category: "hair", src: "images/gallery/hair1.jpg", alt: "Balayage transformation" },
    { id: 2, category: "hair", src: "images/gallery/hair2.jpg", alt: "Precision cut" },
    { id: 3, category: "nails", src: "images/gallery/nails1.jpg", alt: "Gel polish design" },
    { id: 4, category: "nails", src: "images/gallery/nails2.jpg", alt: "Acrylic set" },
    { id: 5, category: "skin", src: "images/gallery/skin1.jpg", alt: "Facial treatment" },
    { id: 6, category: "interior", src: "images/gallery/interior1.jpg", alt: "Salon interior" }
  ]
};

export default salonConfig;
