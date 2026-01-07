export interface Provider {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  hourlyRate: number;
  availability: string;
  verified: boolean;
  image: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  providers: Provider[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'plumber',
    name: 'Plumber',
    icon: '🔧',
    description: 'Professional plumbing services',
    providers: [
      {
        id: 'p1',
        name: 'John Smith',
        company: 'Smith Plumbing Co.',
        location: 'Downtown, 2.5 km away',
        rating: 4.9,
        reviews: 234,
        experience: '15 years',
        hourlyRate: 75,
        availability: 'Available Today',
        verified: true,
        image: '',
        description: 'Expert in residential and commercial plumbing. Specializes in emergency repairs and bathroom renovations.',
      },
      {
        id: 'p2',
        name: 'Mike Johnson',
        company: 'Quick Fix Plumbers',
        location: 'Westside, 4.2 km away',
        rating: 4.7,
        reviews: 156,
        experience: '8 years',
        hourlyRate: 65,
        availability: 'Available Tomorrow',
        verified: true,
        image: '',
        description: 'Certified master plumber with expertise in pipe fitting and water heater installation.',
      },
    ],
  },
  {
    id: 'electrician',
    name: 'Electrician',
    icon: '⚡',
    description: 'Electrical installation & repair',
    providers: [
      {
        id: 'e1',
        name: 'Sarah Williams',
        company: 'Bright Sparks Electric',
        location: 'Midtown, 1.8 km away',
        rating: 4.8,
        reviews: 189,
        experience: '12 years',
        hourlyRate: 80,
        availability: 'Available Today',
        verified: true,
        image: '',
        description: 'Licensed electrician specializing in home automation and smart home installations.',
      },
    ],
  },
  {
    id: 'housekeeper',
    name: 'Housekeeper',
    icon: '🧹',
    description: 'Home cleaning services',
    providers: [
      {
        id: 'h1',
        name: 'Maria Garcia',
        company: 'Sparkle Clean Services',
        location: 'Your Area, 1.2 km away',
        rating: 4.9,
        reviews: 312,
        experience: '10 years',
        hourlyRate: 45,
        availability: 'Available Today',
        verified: true,
        image: '',
        description: 'Professional deep cleaning and organizing services. Eco-friendly products available.',
      },
    ],
  },
  {
    id: 'watchman',
    name: 'Watchman',
    icon: '👮',
    description: 'Security guard services',
    providers: [
      {
        id: 'w1',
        name: 'Robert Chen',
        company: 'SecureWatch Inc.',
        location: 'Citywide, 3.5 km away',
        rating: 4.6,
        reviews: 78,
        experience: '20 years',
        hourlyRate: 35,
        availability: 'Available 24/7',
        verified: true,
        image: '',
        description: 'Former military personnel with extensive security experience. Licensed and bonded.',
      },
    ],
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    icon: '🪚',
    description: 'Woodwork & furniture',
    providers: [
      {
        id: 'c1',
        name: 'David Brown',
        company: 'Craftwood Studios',
        location: 'Eastside, 5.1 km away',
        rating: 4.8,
        reviews: 145,
        experience: '18 years',
        hourlyRate: 70,
        availability: 'Available This Week',
        verified: true,
        image: '',
        description: 'Master carpenter specializing in custom furniture and kitchen cabinets.',
      },
    ],
  },
  {
    id: 'painter',
    name: 'Painter',
    icon: '🎨',
    description: 'Interior & exterior painting',
    providers: [
      {
        id: 'pt1',
        name: 'Lisa Anderson',
        company: 'ColorSplash Painting',
        location: 'North District, 2.8 km away',
        rating: 4.7,
        reviews: 167,
        experience: '11 years',
        hourlyRate: 55,
        availability: 'Available Today',
        verified: true,
        image: '',
        description: 'Professional painter with expertise in decorative finishes and wallpaper installation.',
      },
    ],
  },
  {
    id: 'gardener',
    name: 'Gardener',
    icon: '🌱',
    description: 'Landscaping & garden care',
    providers: [],
  },
  {
    id: 'driver',
    name: 'Driver',
    icon: '🚗',
    description: 'Personal driver services',
    providers: [],
  },
  {
    id: 'cook',
    name: 'Cook',
    icon: '👨‍🍳',
    description: 'Personal chef services',
    providers: [],
  },
];

export interface ServiceRequest {
  id: string;
  clientName: string;
  clientLocation: string;
  serviceType: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  budget: string;
  date: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
}

export const sampleRequests: ServiceRequest[] = [
  {
    id: 'r1',
    clientName: 'Emma Thompson',
    clientLocation: '123 Oak Street, Downtown',
    serviceType: 'Plumbing',
    description: 'Leaking faucet in kitchen needs immediate repair. Water damage possible.',
    urgency: 'high',
    budget: '$100 - $150',
    date: '2024-01-15',
    status: 'pending',
  },
  {
    id: 'r2',
    clientName: 'James Wilson',
    clientLocation: '456 Maple Avenue, Westside',
    serviceType: 'Plumbing',
    description: 'Bathroom renovation - need to install new shower and toilet.',
    urgency: 'medium',
    budget: '$500 - $800',
    date: '2024-01-18',
    status: 'pending',
  },
  {
    id: 'r3',
    clientName: 'Sophie Davis',
    clientLocation: '789 Pine Road, Eastside',
    serviceType: 'Electrical',
    description: 'Install new ceiling fans in 3 rooms.',
    urgency: 'low',
    budget: '$200 - $300',
    date: '2024-01-20',
    status: 'pending',
  },
];
