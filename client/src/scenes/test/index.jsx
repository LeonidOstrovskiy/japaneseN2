import { useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';

import { useState } from 'react';

import AnswerQuestion from './AnswerQuestion';

const Test = () => {
  const [loading, setLoading] = useState(true);

  const lessons = useSelector((state) => state.global.lessons);
  const score = useSelector((state) => state.global.score);
  const _id = useSelector((state) => state.global._id) || 'free';

  const [randomQuestion, setRandomQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [lessonFinished, setLessonFinished] = useState(false);

  let words;
  const wordsUrl =
    import.meta.env.VITE_BASE_URL + `/api/v1/words/words/${lessons}/${_id}`;

  useEffect(() => {
    try {
      const fetchLessons = async () => {
        setLoading(true);

        words = await axios.get(
          wordsUrl,
          { timeout: 3000 },
          { lessons: lessons }
        );

        if (!words.data.msg) {
          setLessonFinished(false);
          setRandomQuestion(words.data.fullQuestion);
          setAnswers(words.data.answers);
        } else if (words.data.msg === 'LESSON FINISHED') {
          setLessonFinished(true);
          setLoading(false);
        }

        setLoading(false);
      };
      fetchLessons();
    } catch (err) {
      console.log(err);
    }
  }, [lessons]);

  const nextClickHandler = async () => {
    try {
      setLoading(true);
      words = await axios.get(
        wordsUrl,
        { timeout: 3000 },
        { lessons: lessons }
      );

      if (!words.data.msg) {
        setLessonFinished(false);
        setRandomQuestion(words.data.fullQuestion);
        setAnswers(words.data.answers);
      } else if (words.data.msg === 'LESSON FINISHED') {
        setLessonFinished(true);
        setLoading(false);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="auto"
      sx={{ backgroundColor: '#BED4CE' }}
    >
      <Box
        display="flex"
        width="100%"
        marginTop="120px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-evenly"
          padding="0 5rem 0 5rem"
          alignItems="center"
        >
          <Button onClick={nextClickHandler}>Next</Button>
          <Typography>
            {' '}
            Score: <span style={{ color: '#840FE1' }}> {score}</span>{' '}
          </Typography>
        </Box>
        {loading && <div>LOADING</div>}
        {!loading && lessonFinished && (
          <Box>
            {' '}
            <Typography> NEXT LESSON </Typography>{' '}
          </Box>
        )}
        {!loading && !lessonFinished && (
          <AnswerQuestion randomQuestion={randomQuestion} answers={answers} />
        )}
      </Box>
    </Box>
  );
};

export default Test;
