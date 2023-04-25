import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const QuestionLearn = ({ question }) => {
  const isSmallScreen = useMediaQuery('(max-width: 400px)');
  const [isEnglish, setIsEnglish] = useState(false);

  const helpHandler = () => {
    setIsEnglish(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0' }}
        animate={{ width: isSmallScreen ? '200px' : '300px' }}
        exit={{ x: 'window.innerWidth', transition: { duration: 0.1 } }}
      >
        <Box
          textAlign="center"
          width={isSmallScreen ? '200px' : '300px'}
          marginBottom="2rem"
          paddingTop="4rem"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography
              fontSize={isSmallScreen ? '16px' : '24px'}
              fontWeight="bolder"
              color="#840FE1"
            >
              {question.jap}{' '}
            </Typography>{' '}
            <Button color="error" variant="outlined" onClick={helpHandler}>
              {' '}
              Help{' '}
            </Button>
          </Box>

          <Typography
            fontSize={isSmallScreen ? '16px' : '24px'}
            fontWeight="bolder"
            color="black"
            paddingTop="20px"
            sx={{
              transform: isEnglish ? 'undefined' : 'translateX(-1200px)',
              transitionProperty: 'all',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'linear',
            }}
          >
            {question.eng}
          </Typography>
        </Box>{' '}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionLearn;
