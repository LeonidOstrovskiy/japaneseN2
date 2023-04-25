import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setTextNumber } from '../../../state';

const TextButton = ({ buttonNumber }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setTextNumber(buttonNumber));
  };
  return <Button onClick={clickHandler}> {buttonNumber} </Button>;
};

export default TextButton;
