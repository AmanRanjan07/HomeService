// Mock services data for offline mode
import {
  CleaningServices as CleaningIcon,
  ElectricBolt as ElectricIcon,
  Plumbing as PlumbingIcon,
  LocalShipping as MovingIcon,
  Handyman as HandymanIcon,
  Brush as PaintingIcon,
  Grass as LandscapingIcon,
  AcUnit as HvacIcon,
} from '@mui/icons-material';

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: any; // Using any since we're mixing icon types
  image: string;
  features: string[];
  category: string;
  price: number;
  imageUrl?: string;
}

const mockServices: ServiceType[] = [
  {
    id: '1',
    title: 'House Cleaning',
    description: 'Professional cleaning services for your home.',
    icon: CleaningIcon,
    image: '/images/cleaning.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Home+Cleaning',
    features: ['Regular cleaning', 'Deep cleaning', 'Move-in/out', 'Green cleaning'],
    category: 'CLEANING',
    price: 80.0
  },
  {
    id: '2',
    title: 'Electrical Services',
    description: 'Expert electrical repair and installation by licensed professionals.',
    icon: ElectricIcon,
    image: '/images/electrical.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Electrical',
    features: ['Repairs', 'Installation', 'Smart home', 'Safety inspection'],
    category: 'REPAIRS',
    price: 120.0
  },
  {
    id: '3',
    title: 'Plumbing',
    description: 'Reliable plumbing services and repairs available 24/7.',
    icon: PlumbingIcon,
    image: '/images/plumbing.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Plumbing',
    features: ['Repairs', 'Installation', 'Maintenance', 'Emergency service'],
    category: 'REPAIRS',
    price: 100.0
  },
  {
    id: '4',
    title: 'Moving Services',
    description: 'Professional moving and packing services that make relocation stress-free.',
    icon: MovingIcon,
    image: '/images/moving.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Moving',
    features: ['Local moving', 'Packing', 'Storage', 'Assembly'],
    category: 'MOVING',
    price: 150.0
  },
  {
    id: '5',
    title: 'Handyman',
    description: 'General repairs and maintenance by skilled technicians.',
    icon: HandymanIcon,
    image: '/images/handyman.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Handyman',
    features: ['Repairs', 'Assembly', 'Installation', 'Maintenance'],
    category: 'REPAIRS',
    price: 75.0
  },
  {
    id: '6',
    title: 'Painting',
    description: 'Interior and exterior painting services that transform your spaces.',
    icon: PaintingIcon,
    image: '/images/painting.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Painting',
    features: ['Interior', 'Exterior', 'Commercial', 'Decorative'],
    category: 'HOME_IMPROVEMENT',
    price: 95.0
  },
  {
    id: '7',
    title: 'Landscaping',
    description: 'Professional lawn care and landscaping services.',
    icon: LandscapingIcon,
    image: '/images/landscaping.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=Landscaping',
    features: ['Maintenance', 'Design', 'Installation', 'Tree service'],
    category: 'OUTDOOR',
    price: 70.0
  },
  {
    id: '8',
    title: 'HVAC Services',
    description: 'Heating, ventilation, and air conditioning services by certified technicians.',
    icon: HvacIcon,
    image: '/images/hvac.jpg',
    imageUrl: 'https://via.placeholder.com/300x200?text=HVAC',
    features: ['Installation', 'Repair', 'Maintenance', 'Air quality'],
    category: 'REPAIRS',
    price: 130.0
  },
];

export default mockServices; 