import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

// Import team member images
import amanImage from '../assets/Aman.jpg';
import divyanshuImage from '../assets/divyanshu.jpg';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Check as CheckIcon,
  Verified as VerifiedIcon,
  Security as SecurityIcon,
  EmojiEvents as AwardIcon,
  People as PeopleIcon,
  Handyman as HandymanIcon,
  VerifiedUser as QualityIcon,
  LocalOffer as OfferIcon,
} from '@mui/icons-material';

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #111111 0%, #1f1f1f 100%)',
  position: 'relative',
  color: '#ffffff',
  overflow: 'hidden',
  minHeight: '100vh',
  paddingTop: '2rem',
  paddingBottom: '4rem',
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

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
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
    background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
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

const StyledCard = styled(Card)(({ theme }) => ({
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

const TeamMemberCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 30, 35, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
    '& .MuiAvatar-root': {
      transform: 'scale(1.1)',
      boxShadow: '0 0 30px rgba(255, 81, 43, 0.5)',
    }
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  border: '3px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 0 20px rgba(255, 81, 43, 0.3)',
  transition: 'all 0.3s ease',
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  boxShadow: '0 10px 20px rgba(221, 36, 118, 0.3)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
    filter: 'blur(15px)',
    opacity: 0.5,
    zIndex: -1,
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.9)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(1.2)',
      opacity: 0.7,
    },
    '100%': {
      transform: 'scale(0.9)',
      opacity: 0.5,
    }
  }
}));

const teamMembers = [
  {
    name: 'AMAN RANJAN',
    role: 'Founder & CEO',
    bio: 'With over 15 years of experience in the home services industry, Aman founded HomeServices to connect homeowners with reliable, skilled professionals. His vision drives our commitment to quality and customer satisfaction.',
    image: amanImage,
  },
  {
    name: 'Divyanshu Raj',
    role: 'Operations Director',
    bio: 'Sarah oversees day-to-day operations, ensuring our service providers deliver consistently excellent results. Her background in hospitality management brings a customer-first approach to everything we do.',
    image: divyanshuImage,
  },
  {
    name: 'SONU KUMAR',
    role: 'Technical Lead',
    bio: 'Michael leads our technology team, creating innovative solutions that make booking and managing services seamless. His expertise in software development drives our platform\'s user-friendly experience.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'PIYUSH KUMAR',
    role: 'Customer Success Manager',
    bio: 'Elena ensures every customer receives exceptional service from start to finish. Her team handles feedback, resolves issues, and continuously improves our service quality based on customer input.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
  }
];

const About: React.FC = () => {
  return (
    <PageContainer>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ py: 8, position: 'relative' }}>
            <Box sx={{ 
              position: 'absolute', 
              top: '20%', 
              right: '10%', 
              width: '300px', 
              height: '300px', 
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.2), rgba(221, 36, 118, 0.2))',
              filter: 'blur(100px)',
              zIndex: 0,
              animation: 'float 8s ease-in-out infinite alternate',
            }} />
            
            <Typography variant="h2" component="h1" align="center" gutterBottom>
              About <GradientText data-text="HomeServices">HomeServices</GradientText>
            </Typography>
            
            <Typography variant="h6" align="center" sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 5,
              position: 'relative',
              zIndex: 1,
            }}>
              We connect homeowners with trusted professionals to make home maintenance simpler, faster, and more reliable than ever before.
            </Typography>
          </Box>
        </motion.div>

        {/* Our Story Section */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h4" gutterBottom>
                  Our <GradientText data-text="Story">Story</GradientText>
                </Typography>
                
                <Typography paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                  Founded in 2017, HomeServices began with a simple mission: to eliminate the frustration and uncertainty that comes with finding reliable home service professionals. After experiencing his own challenges with unreliable contractors, our founder Aman Kumar set out to create a platform that would transform how homeowners connect with service providers.
                </Typography>
                
                <Typography paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                  Starting with just five service categories in one city, we've now expanded to offer over 20 different home services across the country. Our growth is built on a foundation of trust, quality, and customer satisfaction—values that continue to guide us as we innovate and improve.
                </Typography>
                
                <Typography paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.8 }}>
                  Today, HomeServices facilitates thousands of bookings every month, connecting homeowners with vetted professionals who deliver exceptional service. While we've grown significantly, our commitment to quality and reliability remains as strong as day one.
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box sx={{ 
                  position: 'relative', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"
                    alt="Our journey"
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      display: 'block',
                      filter: 'brightness(0.9) contrast(1.1)',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Our Values Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Our <GradientText data-text="Values">Values</GradientText>
          </Typography>
          
          <Typography variant="h6" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 6 
          }}>
            The principles that guide everything we do
          </Typography>
          
          <Grid container spacing={4}>
            {[
              { 
                title: 'Quality', 
                description: 'We maintain rigorous standards for all service providers on our platform, ensuring you receive top-notch service every time.', 
                icon: <QualityIcon fontSize="large" sx={{ color: 'white' }} /> 
              },
              { 
                title: 'Reliability', 
                description: 'Punctuality and consistency are non-negotiable. Our professionals arrive on time and deliver as promised.', 
                icon: <VerifiedIcon fontSize="large" sx={{ color: 'white' }} /> 
              },
              { 
                title: 'Transparency', 
                description: 'Clear pricing, detailed service descriptions, and honest communication build trust between all parties.', 
                icon: <SecurityIcon fontSize="large" sx={{ color: 'white' }} /> 
              },
              { 
                title: 'Customer-First', 
                description: 'Your satisfaction drives every decision we make, from platform design to service provider selection.', 
                icon: <PeopleIcon fontSize="large" sx={{ color: 'white' }} /> 
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StyledCard sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <IconBox>
                        {value.icon}
                      </IconBox>
                      <Typography variant="h6" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {value.description}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Why Choose <GradientText data-text="HomeServices">HomeServices</GradientText>
          </Typography>
          
          <Typography variant="h6" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 6 
          }}>
            What sets us apart from other service providers
          </Typography>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <StyledCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      The HomeServices Difference
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
                      We've reimagined the home services experience from the ground up, focusing on what matters most to homeowners:
                    </Typography>
                    
                    <List sx={{ mt: 2 }}>
                      {[
                        'Rigorous vetting for all service providers with background checks and skill assessments',
                        'Real customer reviews and ratings that can\'t be manipulated or removed',
                        'Fixed, upfront pricing with no surprise fees or charges',
                        'Guaranteed on-time arrival with real-time tracking',
                        'Satisfaction guarantee: if you\'re not happy, we\'ll make it right',
                        '24/7 customer support accessible through multiple channels'
                      ].map((item, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckIcon sx={{ color: '#FF512B' }} />
                          </ListItemIcon>
                          <ListItemText primary={item} sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <StyledCard>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      By the Numbers
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      {[
                        { number: '95%', text: 'Customer satisfaction rate across all services' },
                        { number: '20+', text: 'Different service categories available' },
                        { number: '500+', text: 'Vetted professional service providers nationwide' },
                        { number: '50,000+', text: 'Successfully completed service appointments' }
                      ].map((stat, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ 
                            textAlign: 'center',
                            p: 3,
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            height: '100%',
                          }}>
                            <Typography variant="h3" sx={{ 
                              mb: 1,
                              background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}>
                              {stat.number}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              {stat.text}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <Box sx={{ 
                      mt: 3, 
                      p: 3, 
                      borderRadius: '12px',
                      background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.1), rgba(221, 36, 118, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}>
                      <Typography variant="h6" align="center" gutterBottom>
                        <GradientText data-text="Awards & Recognition">Awards & Recognition</GradientText>
                      </Typography>
                      <Grid container spacing={2} justifyContent="center">
                        {[
                          'Best Home Service Platform 2023',
                          'Service Excellence Award 2022',
                          'Tech Innovation in Home Services 2021'
                        ].map((award, index) => (
                          <Grid item xs={12} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <AwardIcon sx={{ color: '#FF512B' }} />
                              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {award}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Meet Our <GradientText data-text="Team">Team</GradientText>
          </Typography>
          
          <Typography variant="h6" align="center" sx={{ 
            maxWidth: '700px', 
            mx: 'auto', 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 6 
          }}>
            The people behind HomeServices
          </Typography>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TeamMemberCard>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <StyledAvatar 
                        src={member.image} 
                        alt={member.name}
                        className="MuiAvatar-root"
                      />
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ 
                        mb: 2,
                        color: '#FF512B',
                        fontWeight: 500,
                      }}>
                        {member.role}
                      </Typography>
                      <Divider sx={{ 
                        mb: 2, 
                        background: 'rgba(255, 255, 255, 0.1)',
                        width: '80%',
                        mx: 'auto',
                      }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </TeamMemberCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Mission Section */}
        <Box sx={{ mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Box sx={{ 
              p: 6, 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 81, 43, 0.1) 0%, rgba(221, 36, 118, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Box sx={{ 
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, rgba(255, 81, 43, 0.2), rgba(221, 36, 118, 0.2))',
                filter: 'blur(80px)',
              }} />
              
              <Typography variant="h4" align="center" gutterBottom>
                Our <GradientText data-text="Mission">Mission</GradientText>
              </Typography>
              
              <Typography variant="h6" align="center" sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                lineHeight: 1.8,
                position: 'relative',
                zIndex: 1,
              }}>
                "To transform the home services industry by connecting homeowners with skilled professionals through technology that prioritizes quality, transparency, and exceptional customer experience."
              </Typography>
              
              <Typography align="center" variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                — Aman Ranjan, Founder & CEO
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default About; 