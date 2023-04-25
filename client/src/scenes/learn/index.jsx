import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import QuestionLearn from './QuestionLearn';

const Learn = () => {
  const lessons = useSelector((state) => state.global.lessons);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const questionUrl =
    import.meta.env.VITE_BASE_URL + `/api/v1/words/words/${lessons}`;

  useEffect(() => {
    setLoading(true);
    try {
      const fetchLesson = async () => {
        const words = await axios.get(
          questionUrl,
          { timeout: 3000 },
          { lessons: lessons }
        );

        setQuestion(words.data);
        setLoading(false);
      };
      fetchLesson();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [lessons]);

  const nextClickHandler = async () => {
    try {
      setLoading(true);
      const words = await axios.get(
        questionUrl,
        { timeout: 3000 },
        { lessons: lessons }
      );

      setQuestion(words.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
      >
        <Button onClick={nextClickHandler} sx={{ fontSize: '20px' }}>
          Next
        </Button>
        {loading && (
          <Box>
            {' '}
            <Typography variant="h6"> LOADING </Typography>{' '}
          </Box>
        )}
        {question && !loading && <QuestionLearn question={question} />}
      </Box>
    </Box>
  );
};

export default Learn;
