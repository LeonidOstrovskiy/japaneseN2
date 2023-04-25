import { Box, Typography } from '@mui/material';
import LessonButton from './LessonButton';
import { useSelector } from 'react-redux';

let data = [];
for (let i = 1; i < 35; i++) {
  data.push(i);
}

const LessonBar = () => {
  const activeLesson = useSelector((state) => state.global.lessons);
  const buttons = data.map((item) => (
    <LessonButton
      key={item}
      lessonNumber={item}
      isActive={activeLesson === item ? true : false}
    />
  ));
  return (
    <Box
      position="absolute"
      top="90px"
      left="1px"
      zIndex="10"
      display="flex"
      flexDirection="column"
    >
      {buttons}
    </Box>
  );
};

export default LessonBar;
