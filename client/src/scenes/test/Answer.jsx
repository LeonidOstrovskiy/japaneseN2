import { Button, Box } from '@mui/material';

const Answer = ({ answer, isCorrect, localIsClicked, onClickHandler }) => {
  return (
    <Box
      display="flex"
      marginBottom="3rem"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        onClick={() => onClickHandler(isCorrect)}
        sx={{
          color:
            !isCorrect && localIsClicked
              ? 'red'
              : isCorrect && localIsClicked
              ? '#840FE1'
              : '#1C1C16',
          fontWeight: 'bold',
          textDecoration:
            !isCorrect && localIsClicked
              ? 'solid line-through purple 4px'
              : 'none',
          transitionProperty: 'color, text-decoration',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'linear',
        }}
      >
        {' '}
        {answer}
      </Button>{' '}
    </Box>
  );
};

export default Answer;
