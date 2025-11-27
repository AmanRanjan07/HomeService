import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Paper,
} from '@mui/material';
import {
  CleaningServices as CleaningIcon,
  ElectricBolt as ElectricIcon,
  Plumbing as PlumbingIcon,
  LocalShipping as MovingIcon,
  Handyman as HandymanIcon,
  Brush as PaintingIcon,
  Grass as LandscapingIcon,
  AcUnit as HvacIcon,
  VerifiedUser as ProfessionalIcon,
  AttachMoney as PricingIcon,
  AccessTime as TimingIcon,
  ThumbUp as SatisfactionIcon,
  EventAvailable as BookingIcon,
  Support as SupportIcon,
  LocalOffer as LocalOfferIcon,
  Redeem,
  Share,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { serviceAPI } from '../services/api';

// Add this type definition after the imports and before services array
interface ServiceType {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  image: string;
  features: string[];
}

const services: ServiceType[] = [
  {
    title: 'House Cleaning',
    description: 'Professional cleaning services for your home. Our expert cleaners use eco-friendly products and proven techniques to transform your living spaces. From regular maintenance to deep cleaning, we ensure a spotless, healthier environment for you and your family.',
    icon: CleaningIcon,
    image: '/images/cleaning.jpg',
    features: ['Regular cleaning', 'Deep cleaning', 'Move-in/out', 'Green cleaning', 'Custom cleaning plans', 'Pet-friendly options'],
  },
  {
    title: 'Electrical Services',
    description: 'Expert electrical repair and installation by licensed professionals. Our electricians bring years of experience to every job, ensuring safety and reliability. From simple fixture installations to complex rewiring projects, we handle all electrical needs with precision and care.',
    icon: ElectricIcon,
    image: '/images/electrical.jpg',
    features: ['Repairs', 'Installation', 'Smart home', 'Safety inspection', 'Panel upgrades', 'Emergency service'],
  },
  {
    title: 'Plumbing',
    description: 'Reliable plumbing services and repairs available 24/7. Our certified plumbers quickly diagnose and fix issues, preventing costly water damage. We handle everything from leaky faucets to complete bathroom remodels, ensuring proper function and water efficiency.',
    icon: PlumbingIcon,
    image: '/images/plumbing.jpg',
    features: ['Repairs', 'Installation', 'Maintenance', 'Emergency service', 'Drain cleaning', 'Water heater service'],
  },
  {
    title: 'Moving Services',
    description: 'Professional moving and packing services that make relocation stress-free. Our trained movers carefully handle your belongings with the utmost respect, using proper equipment and techniques. We offer comprehensive solutions from packing to furniture setup in your new home.',
    icon: MovingIcon,
    image: '/images/moving.jpg',
    features: ['Local moving', 'Packing', 'Storage', 'Assembly', 'International moving', 'Special item handling'],
  },
  {
    title: 'Handyman',
    description: "General repairs and maintenance by skilled technicians who can fix almost anything. Our handymen bring versatile skills and quality tools to tackle your to-do list efficiently. From hanging pictures to assembling furniture, we handle the tasks you don't have time for.",
    icon: HandymanIcon,
    image: '/images/handyman.jpg',
    features: ['Repairs', 'Assembly', 'Installation', 'Maintenance', 'Carpentry', 'Drywall repair'],
  },
  {
    title: 'Painting',
    description: 'Interior and exterior painting services that transform your spaces. Our professional painters prepare surfaces properly, use premium paints, and apply with precision for flawless results. We help with color selection and provide long-lasting finishes that enhance your property.',
    icon: PaintingIcon,
    image: '/images/painting.jpg',
    features: ['Interior', 'Exterior', 'Commercial', 'Decorative', 'Cabinet refinishing', 'Color consultation'],
  },
  {
    title: 'Landscaping',
    description: 'Professional lawn care and landscaping that enhances your outdoor living spaces. Our landscapers combine horticultural knowledge with design expertise to create beautiful, sustainable landscapes. From basic maintenance to complete garden transformations, we bring your outdoor vision to life.',
    icon: LandscapingIcon,
    image: '/images/landscaping.jpg',
    features: ['Maintenance', 'Design', 'Installation', 'Tree service', 'Irrigation systems', 'Hardscaping'],
  },
  {
    title: 'HVAC Services',
    description: 'Heating, ventilation, and air conditioning services by certified technicians. Our HVAC experts ensure your systems run efficiently year-round, improving comfort and energy savings. We provide professional installation, regular maintenance, and prompt repairs for all makes and models.',
    icon: HvacIcon,
    image: '/images/hvac.jpg',
    features: ['Installation', 'Repair', 'Maintenance', 'Air quality', 'Energy efficiency', 'Duct cleaning'],
  },
];

const features = [
  {
    title: 'Professional Service',
    description: 'Our service providers are verified professionals with years of experience',
    icon: 'verified_user',
  },
  {
    title: 'Affordable Pricing',
    description: 'Competitive prices with transparent pricing and no hidden fees',
    icon: 'attach_money',
  },
  {
    title: 'Reliable & Timely',
    description: 'Punctual service delivery with real-time tracking and updates',
    icon: 'schedule',
  },
  {
    title: 'Satisfaction Guaranteed',
    description: '100% satisfaction guarantee with our service quality promise',
    icon: 'thumb_up',
  },
  {
    title: 'Easy Booking',
    description: 'Simple online booking process with flexible scheduling',
    icon: 'event_available',
  },
  {
    title: 'Customer Support',
    description: '24/7 customer support for all your service needs',
    icon: 'support_agent',
  },
];

// Styled components
const HeroSection = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #121212 50%, #1a1a1a 100%)',
  color: '#fff',
  padding: '3rem 1rem',
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    animation: 'bgPulse 8s ease-in-out infinite alternate',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '@keyframes bgPulse': {
    '0%': {
      opacity: 0.6,
      background: 'radial-gradient(circle at 30% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 70% 70%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    },
    '50%': {
      opacity: 0.8,
      background: 'radial-gradient(circle at 40% 50%, rgba(255, 81, 43, 0.06) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 60% 40%, rgba(231, 71, 220, 0.06) 0%, rgba(0, 0, 0, 0) 50%)',
    },
    '100%': {
      opacity: 0.7,
      background: 'radial-gradient(circle at 60% 30%, rgba(45, 149, 255, 0.08) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 30% 60%, rgba(231, 71, 220, 0.08) 0%, rgba(0, 0, 0, 0) 50%)',
    }
  }
});

const HeroImageContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '60%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, #000000 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%), linear-gradient(0deg, #000000 0%, rgba(0,0,0,0) 50%)',
    mixBlendMode: 'multiply',
    zIndex: 1,
  },
  '@media (max-width: 900px)': {
    width: '100%',
    opacity: 0.6,
  },
});

const StyledHeroImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  filter: 'brightness(0.85) contrast(1.1) saturate(1.2)',
  transform: 'scale(1.05)',
});

const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  width: '100%',
});

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'blur(12px)',
    opacity: 0,
    animation: 'textGlow 3s ease-in-out infinite alternate'
  },
  '@keyframes textGlow': {
    '0%': { opacity: 0.3 },
    '100%': { opacity: 0.7 }
  }
});

const FloatingShape = styled(Box)({
  position: 'absolute',
  top: '20%',
  right: '5%',
  width: '300px',
  height: '300px',
  background: 'linear-gradient(180deg, rgba(45, 149, 255, 0.3) 0%, rgba(231, 71, 220, 0.2) 100%)',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.5,
  transform: 'translate(0, 0)',
  animation: 'floatAndGlow 8s ease-in-out infinite alternate',
  '@keyframes floatAndGlow': {
    '0%': {
      transform: 'translate(0, 0) scale(1)',
      background: 'linear-gradient(180deg, rgba(45, 149, 255, 0.3) 0%, rgba(231, 71, 220, 0.2) 100%)',
      filter: 'blur(80px)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'translate(-30px, 20px) scale(1.1)',
      background: 'linear-gradient(180deg, rgba(231, 71, 220, 0.3) 0%, rgba(255, 81, 43, 0.2) 100%)',
      filter: 'blur(90px)',
      opacity: 0.6,
    },
    '100%': {
      transform: 'translate(30px, -20px) scale(0.95)',
      background: 'linear-gradient(180deg, rgba(255, 81, 43, 0.3) 0%, rgba(45, 149, 255, 0.2) 100%)',
      filter: 'blur(70px)',
      opacity: 0.4,
    }
  }
});

const GlowingOrb = styled(motion.div)({
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(45, 149, 255, 0.2) 0%, rgba(231, 71, 220, 0.1) 50%, rgba(0, 0, 0, 0) 70%)',
  filter: 'blur(60px)',
  opacity: 0.5,
  animation: 'orbGlow 10s ease-in-out infinite alternate',
  '@keyframes orbGlow': {
    '0%': { 
      opacity: 0.3,
      transform: 'scale(0.8)',
    },
    '50%': { 
      opacity: 0.5,
      transform: 'scale(1)',
    },
    '100%': { 
      opacity: 0.4,
      transform: 'scale(0.9)',
    }
  }
});

const StyledCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(25, 25, 30, 0.5)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(3),
  color: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  position: 'relative',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3), rgba(255, 81, 43, 0.3))',
    zIndex: -1,
    borderRadius: '18px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
      animation: 'borderGlow 3s infinite alternate',
    }
  },
  '@keyframes borderGlow': {
    '0%': {
      opacity: 0.5,
      transform: 'rotate(0deg)',
      background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3), rgba(255, 81, 43, 0.3))',
    },
    '100%': {
      opacity: 0.8,
      transform: 'rotate(180deg)',
      background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.3), rgba(45, 149, 255, 0.3), rgba(231, 71, 220, 0.3))',
    }
  }
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: 'rgba(25, 25, 30, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(45, 149, 255, 0.05), rgba(231, 71, 220, 0.05))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 0,
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1.5rem',
  background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
  boxShadow: '0 3px 5px 2px rgba(45, 149, 255, .2)',
  position: 'relative',
  zIndex: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
    filter: 'blur(12px)',
    opacity: 0.5,
    animation: 'iconGlow 3s ease-in-out infinite alternate',
    zIndex: -1,
  },
  '@keyframes iconGlow': {
    '0%': { 
      opacity: 0.3,
      transform: 'scale(0.8)'
    },
    '100%': { 
      opacity: 0.7,
      transform: 'scale(1.2)'
    }
  },
  '& svg': {
    fontSize: '30px',
    color: '#ffffff',
    position: 'relative',
    zIndex: 2
  }
}));

const OfferCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2.5rem 1.5rem',
  textAlign: 'center',
  background: 'rgba(25, 25, 30, 0.4)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '& .offer-icon-container': {
      transform: 'scale(1.1)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #2D95FF, #E747DC)',
    opacity: 0.8,
    animation: 'borderGlow 3s ease-in-out infinite alternate',
  },
  '@keyframes borderGlow': {
    '0%': {
      opacity: 0.6,
      background: 'linear-gradient(90deg, #2D95FF, #E747DC)',
    },
    '50%': {
      opacity: 0.8,
      background: 'linear-gradient(90deg, #E747DC, #FF512B)',
    },
    '100%': {
      opacity: 0.7,
      background: 'linear-gradient(90deg, #FF512B, #2D95FF)',
    }
  }
}));

const OfferIconContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1.5rem',
  background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.8) 0%, rgba(221, 36, 118, 0.8) 100%)',
  boxShadow: '0 10px 20px rgba(221, 36, 118, 0.3)',
  transition: 'transform 0.3s ease',
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  marginBottom: '3rem',
  width: '100%',
}));

const ProfileImageContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '3px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
  marginBottom: '1.5rem',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    border: '4px solid transparent',
    background: 'linear-gradient(45deg, #FF512B, #DD2476) border-box',
    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    borderRadius: '50%',
    animation: 'rotate 4s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  }
}));

const ProfileImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

const ProfileInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '2rem',
}));

const ProfileStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginTop: '1rem',
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
  border: 0,
  borderRadius: 50,
  boxShadow: '0 3px 5px 2px rgba(45, 149, 255, .3)',
  color: 'white',
  padding: '10px 30px',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #4DA6FF 30%, #E85DE3 90%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(45, 149, 255, .3)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 5px rgba(45, 149, 255, .3)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
    transform: 'rotate(30deg)',
    animation: 'shimmer 6s infinite',
    zIndex: 1,
  },
  '@keyframes shimmer': {
    '0%': {
      transform: 'translateX(-150%) rotate(30deg)',
    },
    '100%': {
      transform: 'translateX(150%) rotate(30deg)',
    }
  }
}));

// Improve the Special Offers Section styling
const SpecialOffersSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: '5rem 0',
  background: 'linear-gradient(135deg, #111111 0%, #1f1f1f 100%)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 40%, rgba(255, 81, 43, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 70% 60%, rgba(221, 36, 118, 0.1) 0%, rgba(0, 0, 0, 0) 50%)',
    pointerEvents: 'none',
  }
}));

// Update the main page background at the root level
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #111111 0%, #1f1f1f 100%)',
  position: 'relative',
  color: '#ffffff',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 81, 43, 0.1) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(221, 36, 118, 0.05) 0%, rgba(0, 0, 0, 0) 50%)',
    pointerEvents: 'none',
    zIndex: 0,
  }
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [apiServices, setApiServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await serviceAPI.getAll();
        setApiServices(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        console.error('Failed to load services:', error);
        setError('Failed to load services. Using fallback data.');
        // Set default local data as fallback
        setApiServices(services);
      } finally {
        setLoading(false);
      }
    };
    
    loadServices();
  }, []);

  const handleBookService = (serviceTitle: string) => {
    navigate('/booking', { state: { service: serviceTitle } });
  };

  return (
    <PageContainer>
      <HeroSection>
        <FloatingShape />
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h2" component="h1" gutterBottom>
                  <GradientText data-text="Professional Home Services">Professional Home Services</GradientText>
                </Typography>
                <Typography variant="h5" component="h2" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>
                  Quality services delivered to your doorstep by licensed professionals. Save time and enjoy peace of mind with our vetted experts who bring the highest standards of service right to your home.
                </Typography>
                <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    <GradientText data-text="Home Services Reimagined">Home Services Reimagined</GradientText>
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    maxWidth: '800px', 
                    mx: 'auto', 
                    mb: 6,
                    lineHeight: 1.8
                  }}>
                    Our platform connects you with skilled professionals who excel in their craft. Whether you need a quick repair, regular maintenance, or a complete home transformation, our verified experts deliver exceptional results every time. With transparent pricing, convenient scheduling, and our satisfaction guarantee, we've revolutionized how home services are delivered.
                  </Typography>
                </Box>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <GradientButton 
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/services')}
                    sx={{ 
                      mt: 2,
                      animation: 'pulse 1.5s infinite alternate',
                      '@keyframes pulse': {
                        '0%': { 
                          boxShadow: '0 0 5px rgba(45, 149, 255, 0.6), 0 0 10px rgba(231, 71, 220, 0.3)' 
                        },
                        '100%': { 
                          boxShadow: '0 0 10px rgba(45, 149, 255, 0.8), 0 0 20px rgba(231, 71, 220, 0.5)' 
                        }
                      }
                    }}
                  >
                    Explore Services
                  </GradientButton>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Box sx={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    {/* Circular profile image with fallback styling */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        zIndex: 2,
                        overflow: 'hidden',
                        border: '4px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 0 20px rgba(45, 149, 255, 0.6)',
                        background: 'linear-gradient(45deg, #2D95FF, #E747DC)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        textAlign: 'center',
                        padding: '10px'
                      }}
                    >
                      <Typography variant="subtitle1" component="div">
                        Aman Ranjan<br/>Home Services
                      </Typography>
                    </Box>
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"
                      alt="Home Services Dashboard"
                      sx={{
                        width: '100%',
                        filter: 'drop-shadow(0 0 20px rgba(45, 149, 255, 0.5))',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    />
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Add Dashboard Profile Section after the hero section */}
      {isAuthenticated && (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ 
              position: 'relative',
              background: 'rgba(25, 25, 30, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              overflow: 'hidden',
              p: 0,
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {/* Dashboard Header Background Image */}
              <Box sx={{
                height: '200px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url("https://images.unsplash.com/photo-1562516710-55d39427716a?q=80&w=1200&auto=format&fit=crop")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)',
                  zIndex: 0,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(25,25,30,1))',
                  zIndex: 1,
                }
              }} />

              <Box sx={{ px: 4, pb: 4, position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <ProfileInfo sx={{ mt: 4 }}>
                  <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                    Welcome back, <GradientText data-text={user?.firstName || 'User'}>{user?.firstName || 'User'}</GradientText>
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                    Your personal Home Services Dashboard
                  </Typography>
                </ProfileInfo>

                <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      p: 2, 
                      background: 'rgba(255, 81, 43, 0.1)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 81, 43, 0.2)',
                    }}>
                      <Typography variant="h4" component="div" sx={{ color: '#FF512B', fontWeight: 700 }}>
                        12
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Services Used
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      p: 2, 
                      background: 'rgba(45, 149, 255, 0.1)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(45, 149, 255, 0.2)',
                    }}>
                      <Typography variant="h4" component="div" sx={{ color: '#2D95FF', fontWeight: 700 }}>
                        4
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Active Bookings
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      p: 2, 
                      background: 'rgba(231, 71, 220, 0.1)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(231, 71, 220, 0.2)',
                    }}>
                      <Typography variant="h4" component="div" sx={{ color: '#E747DC', fontWeight: 700 }}>
                        89%
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        Satisfaction Rate
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <GradientButton
                    variant="contained"
                    onClick={() => navigate('/booking')}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Book New Service
                  </GradientButton>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/profile')}
                    sx={{ 
                      px: 3, 
                      py: 1.5,
                      borderRadius: '30px',
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        borderColor: '#FF512B',
                        backgroundColor: 'rgba(255, 81, 43, 0.1)',
                      },
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      )}

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            sx={{ mb: 6, color: '#ffffff' }}
          >
            Our <GradientText>Services</GradientText>
          </Typography>
        </motion.div>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Loading services...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {error}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {(apiServices && apiServices.length > 0 ? apiServices : services).map((service, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StyledCard>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.icon && <service.icon sx={{ fontSize: 40, color: '#FF512B', mb: 2 }} />}
                      </motion.div>
                      <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                        {service.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {service.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {service.features && service.features.map((feature, i) => (
                          <Chip
                            key={i}
                            label={feature}
                            size="small"
                            sx={{
                              m: 0.5,
                              background: 'rgba(255,82,182,0.1)',
                              color: '#ffffff',
                              border: '1px solid rgba(255,82,182,0.3)',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ color: '#ffffff', mb: 6 }}>
            Why Choose Us
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <ProfessionalIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Professional Service
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Our service providers undergo rigorous background checks and skill assessments. With an average of 8+ years of experience, our professionals deliver exceptional workmanship and customer service on every job.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <PricingIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Affordable Pricing
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Our upfront pricing means no surprises on your bill. We provide detailed quotes before work begins, and we're committed to delivering exceptional value without hidden fees or unexpected charges.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <TimingIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Reliable & Timely
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Our professionals arrive within the scheduled time window, respecting your schedule. Our real-time tracking system keeps you informed of your service provider's arrival time, minimizing wait times.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <SatisfactionIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Satisfaction Guaranteed
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    If you're not completely satisfied, we'll make it right. Our Quality Guarantee means we stand behind our work with a promise to return and fix any issues at no additional cost to you.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <BookingIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Easy Booking
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Book services in under 60 seconds through our app or website. Choose the service, select your preferred time, and confirm – it's that simple. We offer same-day and next-day availability for most services.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <FeatureCard>
                  <IconWrapper>
                    <SupportIcon />
                  </IconWrapper>
                  <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                    Customer Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Our dedicated support team is available 24/7 to assist with questions, concerns, or special requests. Reach us via chat, email, or phone for prompt, friendly assistance whenever you need it.
                  </Typography>
                </FeatureCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Special Offers Section */}
      <SpecialOffersSection>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
              <GradientText data-text="Special Offers">Special Offers</GradientText>
            </Typography>
            
            <Typography variant="h6" align="center" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '700px',
              mx: 'auto',
              mb: 6
            }}>
              Take advantage of our limited-time promotions and save on your home services
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <OfferCard>
                    <OfferIconContainer className="offer-icon-container">
                      <LocalOfferIcon sx={{ fontSize: 40, color: '#ffffff' }} />
                    </OfferIconContainer>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                      New Customer Discount
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                      First-time customers receive 15% off their initial service booking. This exclusive discount applies to any service category and has no minimum purchase requirement. Simply create an account and use code WELCOME15 at checkout.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 'auto',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        '&:hover': {
                          borderColor: '#FF512B',
                          backgroundColor: 'rgba(255, 81, 43, 0.1)',
                        },
                      }}
                    >
                      Claim Offer
                    </Button>
                  </OfferCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <OfferCard>
                    <OfferIconContainer className="offer-icon-container">
                      <Redeem sx={{ fontSize: 40, color: '#ffffff' }} />
                    </OfferIconContainer>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                      Package Deals
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                      Bundle multiple services and save up to 25% with our comprehensive packages. Popular combinations include cleaning + handyman, HVAC + electrical, and moving + painting services. Custom packages available to suit your specific needs.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 'auto',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        '&:hover': {
                          borderColor: '#FF512B',
                          backgroundColor: 'rgba(255, 81, 43, 0.1)',
                        },
                      }}
                    >
                      View Packages
                    </Button>
                  </OfferCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <OfferCard>
                    <OfferIconContainer className="offer-icon-container">
                      <Share sx={{ fontSize: 40, color: '#ffffff' }} />
                    </OfferIconContainer>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#ffffff', mb: 2 }}>
                      Referral Rewards
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                      Earn $25 in service credit for each friend you refer who books their first service. Your friend also receives $25 off their initial booking. There's no limit to how many credits you can earn – share with friends, family, and neighbors!
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 'auto',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        '&:hover': {
                          borderColor: '#FF512B',
                          backgroundColor: 'rgba(255, 81, 43, 0.1)',
                        },
                      }}
                    >
                      Refer Friends
                    </Button>
                  </OfferCard>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SpecialOffersSection>
    </PageContainer>
  );
};

export default Home; 