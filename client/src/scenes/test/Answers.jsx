import { useState } from 'react';
import Answer from './Answer';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { setScore } from '../../state';

const Answers = ({ answers, randomQuestion }) => {
  const isSmallScreen = useMediaQuery('(max-width: 500px)');
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.global.lessons);
  const _id = useSelector((state) => state.global._id);
  const score = useSelector((state) => state.global.score);
  const [localIsClicked, setLocalIsClicked] = useState(false);

  const onClickHandler = async (isCorrect) => {
    if (isCorrect && _id !== '') {
      await axios.patch(
        import.meta.env.VITE_BASE_URL + '/api/v1/user/patchprogress',
        {
          _id: _id,
          lessonNumber: lessons,
          indice: randomQuestion.indice,
        }
      );
      if (!localIsClicked) {
        dispatch(setScore(score + 1));
      }
    } else if (isCorrect && _id === '') {
      if (!localIsClicked) {
        dispatch(setScore(score + 1));
      }
    }
    setLocalIsClicked(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0', visibility: 'hidden' }}
        animate={{ width: '100%', visibility: 'visible' }}
        exit={{
          visibility: 'collapse',
          transition: { duration: 0.2 },
        }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          display="grid"
          width="60%"
          gap="2rem"
          gridTemplateColumns="repeat(2,minmax(0, 1fr))"
          sx={{
            '&>div': { gridColumn: isSmallScreen ? 'span 2' : undefined },
          }}
        >
          {answers &&
            answers.map((item, index) => (
              <Answer
                key={index}
                answer={item.ans}
                isCorrect={item.isCorrect}
                localIsClicked={localIsClicked}
                onClickHandler={onClickHandler}
              />
            ))}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Answers;
