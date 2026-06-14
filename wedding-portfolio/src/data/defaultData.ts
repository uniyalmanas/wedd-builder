export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  price: string;
}

export interface PortfolioItem {
  id: number;
  src: string;
  cat: string;
  title: string;
  layout: 'tall' | 'wide' | 'square';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  instagram: string;
}

export interface TestimonialItem {
  name: string;
  event: string;
  quote: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface PortfolioData {
  brandName: string;
  brandSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactHours: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    pinterest: string;
    whatsapp: string;
  };
  hero: {
    label: string;
    titleLine1: string;
    titleItalic: string;
    titleLine2: string;
    subtitle: string;
    bgImage: string;
    btnPrimaryText: string;
    btnOutlineText: string;
    stats: { num: string; label: string }[];
  };
  about: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    story1: string;
    story2: string;
    experienceYears: string;
    experienceText: string;
    experienceDesc: string;
    imageLarge: string;
    imageSmall: string;
    values: { title: string; desc: string }[];
  };
  services: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    items: ServiceItem[];
  };
  portfolio: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    categories: string[];
    items: PortfolioItem[];
  };
  team: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    description: string;
    items: TeamMember[];
    citiesLabel: string;
    cities: string[];
  };
  testimonials: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    items: TestimonialItem[];
  };
  faq: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    items: FAQItem[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBtnText: string;
  };
  bookingCta: {
    sectionLabel: string;
    titleLine1: string;
    titleItalic: string;
    description: string;
    bgImage: string;
    btnPrimaryText: string;
    btnOutlineText: string;
    trustSignals: string[];
  };
}

export const defaultPortfolioData: PortfolioData = {
  brandName: 'Vows & Vistas',
  brandSubtitle: 'Luxury Weddings & Events',
  contactEmail: 'hello@vowsandvistas.in',
  contactPhone: '+91 98765 43210',
  contactAddress: '42 Rajpur Road,\nDehradun, Uttarakhand\n248001, India',
  contactHours: 'Mon – Sat · 10 AM – 7 PM',
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    pinterest: 'https://pinterest.com',
    whatsapp: '919876543210',
  },
  hero: {
    label: 'Luxury Wedding & Event Planners',
    titleLine1: 'Where Dream',
    titleItalic: 'Celebrations',
    titleLine2: 'Meet Flawless Reality',
    subtitle: 'Bespoke wedding planning and design across India. We orchestrate every vendor, detail, and timeline so you can enjoy your day in absolute peace.',
    bgImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
    btnPrimaryText: 'Plan Your Event',
    btnOutlineText: 'View Design Gallery',
    stats: [
      { num: '250+', label: 'Events Planned' },
      { num: '15+', label: 'Cities Covered' },
      { num: '100%', label: 'Stress-Free Guarantee' }
    ]
  },
  about: {
    sectionLabel: 'Our Philosophy',
    titleLine1: 'Visionary Designs, Flawless Execution —',
    titleItalic: 'Your Story, Managed Beautifully',
    story1: 'Vows & Vistas was founded with a singular belief: that a wedding should be as joyful to plan as it is to experience. We are a boutique events group managing high-end weddings, destination events, and grand social galas.',
    story2: 'We work with a select number of clients each year. This allows us to dedicate our complete creative energy and resources to your day — ensuring bespoke vendor matching, custom-engineered decor themes, and military-precision scheduling.',
    experienceYears: '8+',
    experienceText: 'Years of Curating Magic',
    experienceDesc: 'Crafting bespoke celebrations across India',
    imageLarge: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=85',
    imageSmall: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80',
    values: [
      { title: 'Bespoke Design', desc: 'Tailor-made styling, zero copy-paste templates' },
      { title: 'Vendor Symphony', desc: 'Orchestrating caterers, decor, and artists' },
      { title: 'Budget Mastery', desc: 'Maximizing aesthetic impact transparently' },
      { title: 'On-Site Control', desc: 'Coordination team active dawn to last dance' }
    ]
  },
  services: {
    sectionLabel: 'What We Offer',
    titleLine1: 'Services Crafted for',
    titleItalic: 'Every Occasion',
    items: [
      {
        id: '01',
        title: 'Full-Service Planning',
        description: 'End-to-end orchestration of your celebration. Includes venue selection, budget design, vendor contracting, layout styling, and on-site coordination.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
        tags: ['Complete Management', 'Budget Planning', 'On-Site Team'],
        price: 'Starting ₹1,50,000',
      },
      {
        id: '02',
        title: 'Theme & Floral Styling',
        description: 'Creating a cohesive aesthetic vision for your events. Includes custom entrance gates, stage backdrops, tablescapes, lighting plots, and floral layouts.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
        tags: ['Bespoke Decor', 'Lighting Plot', '3D Visuals'],
        price: 'Starting ₹80,000',
      },
      {
        id: '03',
        title: 'Month-of Coordination',
        description: 'For couples who booked their own vendors but want a professional team to take over 4 weeks prior to handle scheduling, rehearsals, and wedding day logistics.',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
        tags: ['4 Weeks Handover', 'Timeline Creation', 'Rehearsal Run'],
        price: 'Starting ₹45,000',
      },
      {
        id: '04',
        title: 'Destination Logistics',
        description: 'Managing travel and guest experience for weddings across India. Includes RSVP tracking, airport shuttles, hotel check-ins, and hospitality helpdesks.',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
        tags: ['Guest Check-In', 'RSVP Tracking', 'Gift Hamper Setup'],
        price: 'Starting ₹1,20,000',
      },
      {
        id: '05',
        title: 'Entertainment & Artist Booking',
        description: 'Sourcing premium talent to bring your events to life. Includes live bands, celebrity singers, choreographers, sound systems, and entry effects.',
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
        tags: ['Celebrity Access', 'Choreography', 'Technical Stage Setup'],
        price: 'Starting ₹60,000',
      },
      {
        id: '06',
        title: 'Catering & Menu Design',
        description: 'Curating culinary journeys. Includes coordinating with elite caterers, designing menu flows, custom cocktail bars, and coordinating live food theater counters.',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
        tags: ['Menu Customization', 'Fusion Food Counters', 'Mixologist Sourcing'],
        price: 'Starting ₹30,000',
      }
    ]
  },
  portfolio: {
    sectionLabel: 'Our Work',
    titleLine1: "Stories We've Had the",
    titleItalic: 'Honour to Tell',
    categories: ['All', 'Royal Palace', 'Beach Sundowner', 'Enchanted Forest', 'Minimalist Chic', 'Traditional'],
    items: [
      { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', cat: 'Royal Palace', title: 'Sharma Sangeet Courtyard, Jaipur', layout: 'tall' },
      { id: 2, src: 'https://images.unsplash.com/photo-1507504038482-7621ea2b2ff6?w=800&q=80', cat: 'Beach Sundowner', title: 'Priya & Rahul Canopy, Goa', layout: 'wide' },
      { id: 3, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', cat: 'Royal Palace', title: 'Mehta Wedding Mandap, Udaipur', layout: 'square' },
      { id: 4, src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80', cat: 'Enchanted Forest', title: 'Ananya & Vikram Canopy, Dehradun', layout: 'square' },
      { id: 5, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', cat: 'Traditional', title: 'Kapoor Palace Haldi Setup, Jodhpur', layout: 'tall' },
      { id: 6, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', cat: 'Minimalist Chic', title: 'Modern Cocktail Reception, Mumbai', layout: 'wide' },
      { id: 7, src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80', cat: 'Traditional', title: 'Gupta Traditional Mehendi, Jaipur', layout: 'square' },
      { id: 8, src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80', cat: 'Minimalist Chic', title: 'Luxe Banquet Table Setting, Chandigarh', layout: 'square' },
      { id: 9, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', cat: 'Enchanted Forest', title: 'Verma Forest Dinner Canopy, Shimla', layout: 'square' }
    ]
  },
  team: {
    sectionLabel: 'The People',
    titleLine1: 'The Hands Behind',
    titleItalic: 'Your Memories',
    description: "A small, tight-knit team that works every event together. You'll meet us before the day — and we'll feel like friends by the end of it.",
    items: [
      {
        name: 'Arjun Mehra',
        role: 'Founder & Chief Coordinator',
        bio: 'With 8 years of planning events across 15 Indian cities, Arjun oversees operations, venue negotiations, and on-site logistics, bringing calm and structural precision to every wedding.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        instagram: '@arjun.planners',
      },
      {
        name: 'Priya Mehra',
        role: 'Co-Founder & Creative Director',
        bio: "Priya leads our visual team. From floral setups to custom lighting, she translates a couple's vision into highly-curated physical spaces and theme layouts.",
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        instagram: '@priya.designs',
      },
      {
        name: 'Rohan Kapoor',
        role: 'Guest Hospitality & Logistics Lead',
        bio: 'Rohan ensures that your guests have a flawless experience, managing RSVP lists, welcome desks, hotel check-ins, local transfers, and emergency ground logistics.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        instagram: '@rohan.hospitality',
      },
      {
        name: 'Sneha Rawat',
        role: 'Vendor Operations Coordinator',
        bio: 'Sneha is the liaison between our vendors and clients. She manages supplier schedules, contracts, deliverables, and timelines to ensure everyone is synchronized.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        instagram: '@sneha.ops',
      }
    ],
    citiesLabel: 'Trusted by Families From',
    cities: ['Delhi NCR', 'Mumbai', 'Jaipur', 'Chandigarh', 'Dehradun', 'Lucknow', 'Udaipur', 'Goa']
  },
  testimonials: {
    sectionLabel: 'Kind Words',
    titleLine1: 'What Our Clients',
    titleItalic: 'Say About Us',
    items: [
      {
        name: 'Ananya & Vikram Singh',
        event: 'Wedding · Jaipur · March 2024',
        quote: "Arjun and Priya took over our wedding planning and made it feel like a breeze. From venue layout coordination in Jaipur to orchestrating a 500-guest dinner flow, everything went flawlessly. We didn't lift a finger!",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&q=80',
      },
      {
        name: 'Neha Kapoor',
        event: 'Corporate Gala · Delhi · Jan 2024',
        quote: "Orchestrated our company's annual summit with 300 delegates flawlessly. The stage setup, audio-visual feeds, catering timelines, and ground transportation were handled with perfect professional precision.",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80',
      },
      {
        name: 'Ravi & Sunita Sharma',
        event: 'Destination Wedding · Shimla · Dec 2023',
        quote: 'Managing a winter wedding in Shimla in sub-zero temperatures is a nightmare, but Vows & Vistas coordinated gas heaters, indoor backup banquets, and local shuttle transports effortlessly. Exceptional coordination!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80',
      },
      {
        name: 'Meera & Aryan Joshi',
        event: 'Sangeet Night · Mussoorie · Oct 2023',
        quote: "Priya's decor design for our Sangeet night was absolutely breath-taking. The custom canopy setups and fairy light tunnels made it feel like a dream forest. It surpassed everything we had visualized!",
        rating: 5,
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=300&q=80',
      }
    ]
  },
  faq: {
    sectionLabel: 'Questions & Answers',
    titleLine1: 'Everything You Need',
    titleItalic: 'to Know',
    items: [
      {
        q: 'How far in advance should we book?',
        a: 'For full wedding planning, we recommend booking 6–12 months in advance, especially for peak wedding seasons (October – February). For decor-only styling or social events, 2–4 months is usually sufficient. We limit our bookings to ensure personalized attention.',
      },
      {
        q: 'What is your booking and fee structure?',
        a: 'After our initial consultation, we provide a custom proposal. To secure your date, we require a 30% advance on our planning fee. We charge a transparent flat fee based on the complexity and size of your events, rather than vendor commissions, ensuring unbiased recommendations.',
      },
      {
        q: 'Do you coordinate weddings outside Uttarakhand?',
        a: 'Yes, we orchestrate events pan-India. We have planned and managed weddings in Rajasthan, Goa, Punjab, Delhi NCR, and Himachal Pradesh. Travel and hotel arrangements for our core coordination team are factored directly into our packages.',
      },
      {
        q: 'Do we have to use your list of recommended vendors?',
        a: 'Not at all. While we have a highly vetted network of photographers, caterers, makeup artists, and entertainers, we are happy to work with any vendor you choose. Our role is to align and coordinate all teams seamlessly.',
      },
      {
        q: 'What is the difference between a planner and a venue coordinator?',
        a: 'A venue coordinator works for the venue and handles venue-specific operations. We work for YOU. We coordinate all external vendors, manage guest RSVPs and check-ins, build your timeline, run rehearsals, and ensure your entire day runs seamlessly from morning to night.',
      },
      {
        q: 'Can you help us with budget management?',
        a: 'Yes, budget allocation is one of the first things we tackle. We help you divide your budget among vendors, track payments, identify areas to save, and ensure there are no surprise expenditures close to the wedding date.',
      },
      {
        q: 'What happens if there is bad weather on our wedding day?',
        a: 'Every wedding plan we design includes a detailed backup Plan B. For outdoor events, we secure backup banquet halls, plan canopy covers, or prepare immediate rain/heat mitigation layouts. Your peace of mind is guaranteed.',
      },
      {
        q: 'Can we meet in person before booking?',
        a: 'Absolutely! We start with a 30-minute consultation call. If you are based near Dehradun, we love to meet for a cup of coffee. Since planning a wedding is a close collaboration, ensuring we have a great connection is highly important.',
      }
    ],
    ctaTitle: 'Still have questions?',
    ctaDesc: "We're happy to chat on WhatsApp or set up a quick call.",
    ctaBtnText: 'Chat on WhatsApp'
  },
  bookingCta: {
    sectionLabel: 'Limited Dates Available',
    titleLine1: 'Your Date Won\'t',
    titleItalic: 'Wait Forever',
    description: 'We take fewer than 20 weddings a year to ensure every celebration receives our dedicated, complete attention. Peak season dates (October – February) typically fill up to 8 months in advance.',
    bgImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=85',
    btnPrimaryText: 'Check Availability',
    btnOutlineText: 'WhatsApp Us',
    trustSignals: [
      '✓ 30% advance only',
      '✓ Written contract',
      '✓ Backup photographer guarantee',
      '✓ Delivery on time, every time'
    ]
  }
};
