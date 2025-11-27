import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Plus as PlusIcon } from 'lucide-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(10),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  textAlign: 'center',
  color: '#ffffff',
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  color: 'rgba(255, 255, 255, 0.7)',
}));

const GradientText = styled('span')({
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
});

const SearchContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(5),
  borderRadius: theme.spacing(2),
  background: 'rgba(25, 25, 30, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'rgba(30, 30, 35, 0.6)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  borderRadius: '12px !important',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  '&:before': {
    display: 'none',
  },
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&.Mui-expanded': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(255, 81, 43, 0.3)',
    background: 'rgba(35, 35, 40, 0.7)',
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '&.Mui-expanded': {
    '& .MuiSvgIcon-root': {
      color: '#FF512B',
    }
  }
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1, 3, 3),
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  color: 'rgba(255, 255, 255, 0.8)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&.active': {
    background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(255, 81, 43, 0.3)',
    border: 'none',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF512B',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputAdornment-root svg': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const ContactChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500, 
  padding: '20px 10px', 
  height: 'auto',
  background: 'linear-gradient(45deg, #FF512B 30%, #DD2476 90%)',
  boxShadow: '0 4px 10px rgba(255, 81, 43, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(255, 81, 43, 0.4)',
  }
}));

// FAQ data
const faqData = [
  {
    id: 1,
    question: 'How do I book a cleaning service?',
    answer: "You can book a cleaning service by navigating to our \"Services\" page, selecting the type of cleaning you need, and following the booking flow. You'll need to create an account or log in, specify the date and time, and provide the address for the service.",
    category: 'booking',
  },
  {
    id: 2,
    question: 'What cleaning supplies do I need to provide?',
    answer: "Our professional cleaners bring all necessary cleaning supplies and equipment. However, if you prefer specific products to be used in your home, you can provide them or let us know in advance.",
    category: 'cleaning',
  },
  {
    id: 3,
    question: 'How are your service providers vetted?',
    answer: "All our service providers undergo thorough background checks, reference verification, and skills assessment. We only partner with experienced professionals who meet our high standards for quality and reliability.",
    category: 'providers',
  },
  {
    id: 4,
    question: 'Can I reschedule or cancel my booking?',
    answer: "Yes, you can reschedule or cancel your booking through your account. For cancellations, please note our policy: free cancellation up to 24 hours before the scheduled service, 50% fee for cancellations within 24 hours, and full charge for no-shows or cancellations after the provider has arrived.",
    category: 'booking',
  },
  {
    id: 5,
    question: 'Is there a satisfaction guarantee?',
    answer: "Yes, we offer a 100% satisfaction guarantee. If you're not completely satisfied with the service, please notify us within 24 hours, and we'll arrange for a re-clean at no additional cost or provide a refund according to our policy.",
    category: 'policy',
  },
  {
    id: 6,
    question: 'How do I pay for services?',
    answer: "We accept various payment methods including credit/debit cards and digital wallets. Payment is processed securely through our platform after you book a service. You can save payment methods in your account for future bookings.",
    category: 'payment',
  },
  {
    id: 7,
    question: 'What if something is damaged during service?',
    answer: "In the rare event that something is damaged during service, please report it immediately. Our service providers are insured, and we have a claims process to handle such situations. We'll work with you to resolve the issue promptly.",
    category: 'policy',
  },
  {
    id: 8,
    question: 'Do you offer recurring cleaning services?',
    answer: "Yes, we offer weekly, bi-weekly, and monthly recurring cleaning services. You can set up a schedule that works for you, and enjoy discounted rates for regular bookings.",
    category: 'cleaning',
  },
  {
    id: 9,
    question: 'What areas do you service?',
    answer: "We currently service major metropolitan areas including New York, Los Angeles, Chicago, and surrounding suburbs. You can check if we service your area by entering your zip code on our homepage or contacting our customer support.",
    category: 'general',
  },
  {
    id: 10,
    question: 'How can I provide feedback about my service?',
    answer: "After each service, you'll receive a request to rate and review your experience. You can also provide feedback directly through your account or by contacting our customer support team.",
    category: 'general',
  },
];

// Categories
const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'booking', label: 'Booking' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'providers', label: 'Service Providers' },
  { id: 'payment', label: 'Payment' },
  { id: 'policy', label: 'Policies' },
  { id: 'general', label: 'General' },
];

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<number | false>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleAccordionChange = (id: number) => {
    setExpandedId(expandedId === id ? false : id);
  };

  // Filter FAQs based on search query and selected category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <PageContainer>
      <ContentContainer maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageTitle variant="h3">
            <GradientText>Frequently Asked Questions</GradientText>
          </PageTitle>
          <PageSubtitle variant="h6">
            Find answers to common questions about our home services
          </PageSubtitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchContainer>
            <StyledTextField
              fullWidth
              placeholder="Search for questions..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={20} />
                  </InputAdornment>
                ),
              }}
            />

            <Box mt={3}>
              <Typography variant="subtitle2" gutterBottom color="rgba(255, 255, 255, 0.9)">
                Filter by category:
              </Typography>
              <Box display="flex" flexWrap="wrap">
                {categories.map((category) => (
                  <CategoryChip
                    key={category.id}
                    label={category.label}
                    onClick={() => handleCategoryChange(category.id)}
                    className={activeCategory === category.id ? 'active' : ''}
                    clickable
                  />
                ))}
              </Box>
            </Box>
          </SearchContainer>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <motion.div key={faq.id} variants={itemVariants}>
                    <StyledAccordion
                      expanded={expandedId === faq.id}
                      onChange={() => handleAccordionChange(faq.id)}
                    >
                      <StyledAccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                      >
                        <Typography variant="subtitle1" fontWeight={500} color="#ffffff">
                          {faq.question}
                        </Typography>
                      </StyledAccordionSummary>
                      <StyledAccordionDetails>
                        <Typography variant="body1" color="#ffffff">
                          {faq.answer}
                        </Typography>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  </motion.div>
                ))
              ) : (
                <Box textAlign="center" py={6}>
                  <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                    No matching questions found
                  </Typography>
                  <Typography variant="body1" color="rgba(255, 255, 255, 0.5)">
                    Try adjusting your search or category filter to find what you're looking for.
                  </Typography>
                </Box>
              )}
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Box mt={8} textAlign="center">
            <Typography variant="h5" gutterBottom>
              <GradientText>Still have questions?</GradientText>
            </Typography>
            <Typography variant="body1" mb={3} color="rgba(255, 255, 255, 0.7)">
              Our support team is here to help you
            </Typography>
            <Box component="a" href="/contact" sx={{ textDecoration: 'none' }}>
              <ContactChip
                icon={<PlusIcon size={16} />}
                label="Contact Support"
                color="primary"
                clickable
              />
            </Box>
          </Box>
        </motion.div>
      </ContentContainer>
    </PageContainer>
  );
};

export default FAQ;