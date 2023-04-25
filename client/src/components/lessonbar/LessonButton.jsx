import { Button } from '@mui/material';
import { setLesson } from '../../state';
import { useDispatch, useSelector } from 'react-redux';

import { setScore, setTextNumber } from '../../state';
import axios from 'axios';

const LessonButton = ({ lessonNumber, isActive }) => {
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.global._id);

  const clickHandler = async () => {
    dispatch(setLesson(lessonNumber));
    dispatch(setTextNumber(1));

    if (_id === '') {
      dispatch(setScore(0));
    } else {
      try {
        const progress = await axios.get(
          `http://localhost:8000/api/v1/user/fetchprogress/${_id}/${lessonNumber}`
        );

        dispatch(setScore(50 - progress.data.length));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Button
      onClick={clickHandler}
      variant={isActive ? 'contained' : 'outlined'}
    >
      {lessonNumber}{' '}
    </Button>
  );
};

export default LessonButton;
