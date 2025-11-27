import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  Rating,
  Divider,
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
  DesignServices as DesignIcon,
  Engineering as ConstructionIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  features: string[];
  price: string;
  rating: number;
  reviews: number;
  category: string;
  image?: string;
}

const services: Service[] = [
  {
    id: '1',
    title: 'House Cleaning',
    description: 'Professional cleaning services for your home. We provide thorough cleaning of all rooms, including kitchen, bathrooms, and living areas.',
    icon: CleaningIcon,
    features: ['Deep cleaning', 'Regular maintenance', 'Window cleaning', 'Carpet cleaning', 'Eco-friendly options', 'Move-in/out cleaning'],
    price: 'From $80',
    rating: 4.8,
    reviews: 156,
    category: 'cleaning',
    image: '/images/services/cleaning.jpg',
  },
  {
    id: '2',
    title: 'Electrical Services',
    description: 'Expert electrical repair and installation services. Licensed electricians for all your electrical needs.',
    icon: ElectricIcon,
    features: ['Wiring installation', 'Circuit repairs', 'Safety inspection', 'Emergency service', 'Smart home setup', 'Lighting installation'],
    price: 'From $100',
    rating: 4.9,
    reviews: 132,
    category: 'electrical',
    image: '/images/services/electrical.jpg',
  },
  {
    id: '3',
    title: 'Plumbing Services',
    description: 'Professional plumbing solutions for repairs, installations, and maintenance.',
    icon: PlumbingIcon,
    features: ['Leak repair', 'Pipe installation', 'Water heater service', 'Drain cleaning', '24/7 emergency', 'Bathroom remodeling'],
    price: 'From $90',
    rating: 4.7,
    reviews: 198,
    category: 'plumbing',
    image: '/images/services/plumbing.jpg',
  },
  {
    id: '4',
    title: 'Moving Services',
    description: 'Full-service moving solutions for residential and commercial clients.',
    icon: MovingIcon,
    features: ['Packing services', 'Local moving', 'Long distance', 'Storage solutions', 'Furniture assembly', 'Insurance coverage'],
    price: 'From $150',
    rating: 4.6,
    reviews: 89,
    category: 'moving',
    image: '/images/services/moving.jpg',
  },
  {
    id: '5',
    title: 'Handyman Services',
    description: 'General repairs and maintenance for your home or office.',
    icon: HandymanIcon,
    features: ['Furniture assembly', 'Wall mounting', 'Door repair', 'Paint touch-ups', 'Small repairs', 'Maintenance tasks'],
    price: 'From $60',
    rating: 4.8,
    reviews: 167,
    category: 'handyman',
    image: '/images/services/handyman.jpg',
  },
  {
    id: '6',
    title: 'Interior Painting',
    description: 'Professional painting services for walls, ceilings, and trim.',
    icon: PaintingIcon,
    features: ['Wall painting', 'Ceiling painting', 'Trim work', 'Color consultation', 'Wallpaper removal', 'Texture application'],
    price: 'From $200',
    rating: 4.9,
    reviews: 145,
    category: 'painting',
    image: '/images/services/painting.jpg',
  },
  {
    id: '7',
    title: 'Lawn Care',
    description: 'Complete lawn maintenance and landscaping services.',
    icon: LandscapingIcon,
    features: ['Mowing', 'Edging', 'Fertilization', 'Weed control', 'Tree trimming', 'Landscape design'],
    price: 'From $50',
    rating: 4.7,
    reviews: 178,
    category: 'landscaping',
    image: '/images/services/landscaping.jpg',
  },
  {
    id: '8',
    title: 'HVAC Services',
    description: 'Heating, ventilation, and air conditioning installation and repairs.',
    icon: HvacIcon,
    features: ['AC repair', 'Heating service', 'Maintenance plans', 'New installation', 'Air quality', 'Duct cleaning'],
    price: 'From $120',
    rating: 4.8,
    reviews: 203,
    category: 'hvac',
    image: '/images/services/hvac.jpg',
  },
  {
    id: '9',
    title: 'Deep Cleaning',
    description: 'Intensive cleaning service for thorough home sanitization.',
    icon: CleaningIcon,
    features: ['Disinfection', 'Deep scrubbing', 'Appliance cleaning', 'Mold removal', 'Sanitization', 'Post-construction'],
    price: 'From $150',
    rating: 4.9,
    reviews: 92,
    category: 'cleaning',
    image: '/images/services/deep-cleaning.jpg',
  },
  {
    id: '10',
    title: 'Smart Home Installation',
    description: 'Professional installation and setup of smart home devices.',
    icon: ElectricIcon,
    features: ['Smart lighting', 'Security systems', 'Thermostat setup', 'Camera installation', 'Home automation', 'Voice control'],
    price: 'From $180',
    rating: 4.8,
    reviews: 76,
    category: 'electrical',
    image: '/images/services/smart-home.jpg',
  },
  {
    id: '11',
    title: 'Home Design Services',
    description: 'Professional interior design consultations and implementations.',
    icon: DesignIcon,
    features: ['Space planning', 'Color consultation', 'Furniture selection', 'Decor advice', '3D visualization', 'Remodeling plans'],
    price: 'From $250',
    rating: 4.9,
    reviews: 63,
    category: 'design',
    image: '/images/services/design.jpg',
  },
  {
    id: '12',
    title: 'Construction Services',
    description: 'Full-service home construction and major renovations.',
    icon: ConstructionIcon,
    features: ['New builds', 'Home additions', 'Major renovations', 'Project management', 'Permitting', 'Architectural services'],
    price: 'From $5000',
    rating: 4.8,
    reviews: 47,
    category: 'construction',
    image: '/images/services/construction.jpg',
  }
];

const categories = ['all', 'cleaning', 'electrical', 'plumbing', 'handyman', 'design', 'construction', 'painting', 'landscaping', 'hvac', 'moving'];

const getCategoryLabel = (category: string): string => {
  if (category === 'all') return 'All Services';
  return category.charAt(0).toUpperCase() + category.slice(1);
};

const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #121216 50%, #1a1a1a 100%)',
  minHeight: '100vh',
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

const StyledTab = styled(Tab)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontWeight: 600,
  '&.Mui-selected': {
    color: '#fff',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '20%',
      width: '60%',
      height: '3px',
      background: 'linear-gradient(45deg, #2D95FF 20%, #E747DC 90%)',
      borderRadius: '3px 3px 0 0',
      animation: 'glowingTab 2s infinite alternate',
    },
    '@keyframes glowingTab': {
      '0%': {
        boxShadow: '0 0 5px rgba(45, 149, 255, 0.5), 0 0 10px rgba(231, 71, 220, 0.3)',
      },
      '100%': {
        boxShadow: '0 0 10px rgba(45, 149, 255, 0.7), 0 0 20px rgba(231, 71, 220, 0.5)',
      }
    }
  },
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
    opacity: 1,
  },
  transition: 'all 0.3s ease'
});

const StyledTabs = styled(Tabs)({
  position: 'relative',
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
  }
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

const StyledIconBox = styled(Box)({
  background: 'rgba(45, 149, 255, 0.1)',
  borderRadius: '12px',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle, rgba(45, 149, 255, 0.4) 0%, rgba(45, 149, 255, 0) 70%)',
    opacity: 0.5,
    animation: 'pulse 2s infinite alternate'
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0.3,
      transform: 'scale(0.95)'
    },
    '100%': {
      opacity: 0.6,
      transform: 'scale(1.05)'
    }
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#2D95FF',
    animation: 'iconSpin 8s linear infinite',
    '@keyframes iconSpin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      }
    }
  }
});

const FeatureChip = styled(Chip)({
  margin: '0 4px 4px 0',
  background: 'rgba(45, 149, 255, 0.1)',
  color: '#ffffff',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(45, 149, 255, 0.3)',
  '&:hover': {
    background: 'rgba(45, 149, 255, 0.2)',
    boxShadow: '0 0 10px rgba(45, 149, 255, 0.5)',
  }
});

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

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else if (!categoryParam) {
      setSelectedCategory('all');
    }
  }, [location.search]);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
    navigate(`/services?category=${newValue}`, { replace: true });
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const handleBookService = (serviceTitle: string) => {
    navigate('/booking', { state: { service: serviceTitle } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container sx={{ pt: 10, pb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" align="center" gutterBottom>
              <GradientText data-text="Our Services">Our Services</GradientText>
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 6, color: 'rgba(255, 255, 255, 0.7)' }}>
              Discover our professional services tailored to meet your needs
            </Typography>
          </motion.div>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
            <StyledTabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="service categories"
            >
              <StyledTab label="All" value="all" />
              <StyledTab label="Cleaning" value="cleaning" />
              <StyledTab label="Plumbing" value="plumbing" />
              <StyledTab label="Electrical" value="electrical" />
              <StyledTab label="Repair" value="repair" />
              <StyledTab label="Gardening" value="gardening" />
              <StyledTab label="Painting" value="painting" />
            </StyledTabs>
          </Box>

          <Grid container spacing={4}>
            {filteredServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <StyledCard>
                    <StyledIconBox>
                      {React.createElement(service.icon)}
                    </StyledIconBox>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                      {service.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                      {service.features.map((feature, index) => (
                        <FeatureChip key={index} label={feature} size="small" />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                        ${service.price}
                      </Typography>
                      <Typography variant="caption" component="span" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        per service
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Rating 
                        name={`rating-${service.id}`} 
                        value={service.rating} 
                        readOnly 
                        precision={0.5}
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#FFD700',
                            filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))'
                          }
                        }}
                      />
                      <Typography variant="body2" sx={{ ml: 1, color: 'rgba(255,255,255,0.6)' }}>
                        ({service.reviews})
                      </Typography>
                    </Box>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <GradientButton 
                        variant="contained" 
                        fullWidth
                        onClick={() => handleBookService(service.title)}
                        sx={{
                          background: 'linear-gradient(45deg, #2D95FF 30%, #E747DC 90%)',
                          color: 'white',
                          fontWeight: 'bold',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #4DA6FF 30%, #E85DE3 90%)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 15px rgba(45, 149, 255, .3)',
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
                        }}
                      >
                        Book Now
                      </GradientButton>
                    </motion.div>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </motion.div>
    </PageContainer>
  );
};

export default Services; 