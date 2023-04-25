import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

const Text = ({
  question,
  isEnglish,
  isFurigana,
  setIsEnglish,
  setIsFurigana,
}) => {
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const isMediumScreen = useMediaQuery('(max-width: 700px)');

  const engHandler = () => {
    setIsFurigana(false);
    setIsEnglish(true);
  };

  const kanaHandler = () => {
    setIsEnglish(false);
    setIsFurigana(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0' }}
        animate={{
          width: isSmallScreen ? '250px' : isMediumScreen ? '400px' : '600px',
        }}
        exit={{ x: 'window.innerWidth', transition: { duration: 0.1 } }}
      >
        <Box
          textAlign="center"
          width={isSmallScreen ? '250px' : isMediumScreen ? '400px' : '600px'}
          marginBottom="2rem"
          paddingTop={
            isSmallScreen ? '0.5rem' : isMediumScreen ? '1rem' : '4rem'
          }
        >
          <Box display="flex" justifyContent="space-between">
            <Typography
              fontSize={isSmallScreen ? '16px' : '24px'}
              fontWeight="bolder"
              color="#840FE1"
            >
              {question.jap}{' '}
            </Typography>{' '}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Button
                color="error"
                variant="outlined"
                onClick={engHandler}
                size={isSmallScreen ? 'small' : 'medium'}
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {' '}
                Eng{' '}
              </Button>
              <Button
                color="success"
                variant="text"
                onClick={kanaHandler}
                sx={{
                  fontWeight: 'bold',
                }}
                size={isSmallScreen ? 'small' : 'medium'}
              >
                {' '}
                Kana{' '}
              </Button>
            </Box>
          </Box>

          <Typography
            fontSize={isSmallScreen ? '16px' : '24px'}
            fontWeight="bolder"
            color="black"
            paddingTop="20px"
            sx={{
              transform:
                isEnglish || isFurigana ? 'undefined' : 'translateX(-1200px)',
              transitionProperty: 'all',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'linear',
            }}
          >
            {isEnglish && question.eng}
            {isFurigana && question.kana}
          </Typography>
        </Box>{' '}
      </motion.div>
    </AnimatePresence>
  );
};

export default Text;
