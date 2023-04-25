import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Text from './Text';
import { setTextNumber } from '../../state';

const Reading = () => {
  const isMediumScreen = useMediaQuery('(max-width: 750px)');

  const lessons = useSelector((state) => state.global.lessons);
  const textNumber = useSelector((state) => state.global.textNumber);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isFurigana, setIsFurigana] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsEnglish(false);
    setIsFurigana(false);
    setLoading(true);
    const questionUrl =
      import.meta.env.VITE_BASE_URL + `/api/v1/texts/${lessons}/${textNumber}`;

    const getTexts = async () => {
      try {
        const currLesson = await axios.get(questionUrl, {
          lessons: lessons,
          textNumber: textNumber,
        });
        setQuestion(currLesson.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getTexts();
  }, [lessons, textNumber]);

  const onClickHandler = async (buttonNumber) => {
    dispatch(setTextNumber(buttonNumber));
  };

  const textNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Box
      style={{
        width: '100vw',
        height: '90vh',
        padding: '120px 10px 10px 10px ',
        opacity: '0.8',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box
        display="flex"
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pr={isMediumScreen ? '10px' : 'auto'}
      >
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          ml={isMediumScreen ? '70px' : 'auto'}
          mr={isMediumScreen ? '10px' : 'auto'}
        >
          {textNumbers.map((number) => (
            <Button
              color="secondary"
              key={number}
              onClick={() => onClickHandler(number)}
              variant={number === textNumber ? 'contained' : 'outlined'}
              size={isMediumScreen ? 'small' : 'medium'}
              sx={{
                marginRight: isMediumScreen ? '40px' : 'auto',
              }}
            >
              {number}{' '}
            </Button>
          ))}
        </Box>

        {loading && (
          <Box>
            {' '}
            <Typography variant="h6"> LOADING </Typography>{' '}
          </Box>
        )}
        {question && !loading && (
          <Text
            question={question}
            isEnglish={isEnglish}
            isFurigana={isFurigana}
            setIsEnglish={setIsEnglish}
            setIsFurigana={setIsFurigana}
          />
        )}
      </Box>
    </Box>
  );
};

export default Reading;
