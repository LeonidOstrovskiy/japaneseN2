import { Box, Typography, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

const Question = ({ question }) => {
  const isSmallScreen = useMediaQuery('(max-width: 400px)');
  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0' }}
        animate={{ width: '200px' }}
        exit={{ x: 'window.innerWidth', transition: { duration: 0.1 } }}
      >
        {' '}
        <Box textAlign="center" width="200px" marginBottom="2rem">
          <Typography
            fontSize={isSmallScreen ? '16px' : '24px'}
            fontWeight="bolder"
            color="black"
          >
            {question}{' '}
          </Typography>{' '}
        </Box>{' '}
      </motion.div>{' '}
    </AnimatePresence>
  );
};

export default Question;
