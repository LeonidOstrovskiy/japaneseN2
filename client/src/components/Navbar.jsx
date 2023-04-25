import { useEffect, useState } from 'react';
import LinkItem from './LinkItem';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../state';
import axios from 'axios';

const data = [
  { destination: '/', name: 'Learn' },
  { destination: '/test', name: 'Test' },
  { destination: '/reading', name: 'Reading' },
];

const Navbar = () => {
  const loggedUser = useSelector((state) => state.global);
  const _id = loggedUser._id;
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(loggedUser.name);
  const [userScore, setUserScore] = useState(loggedUser.score);
  const [userLessons, setUserLessons] = useState(loggedUser.lessons);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  const [isResetProgressHovered, setIsResetProgressHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    setUserName(loggedUser.name);
    setUserScore(loggedUser.score);
    setUserLessons(loggedUser.lessons);
  }, [loggedUser]);

  const resetProgressHandler = async () => {
    setUserModalOpen(!isUserModalOpen);
    await axios.patch(
      import.meta.env.VITE_BASE_URL + '/api/v1/user/resetprogress',
      {
        _id: _id,
      }
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100vw',
        height: '80px',
        zIndex: '5',
        position: 'absolute',
        left: '0',
        top: '0',
        backgroundColor: '#3E5731',
        boxShadow: '0 8px 6px -6px black',
      }}
    >
      {data.map((item) => (
        <LinkItem
          key={item.name}
          destination={item.destination}
          name={item.name}
        />
      ))}
      {userName === '' && <LinkItem destination="contact" name="Login" />}
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        {userName !== '' && (
          <Box
            sx={{ cursor: 'pointer', marginRight: '2rem' }}
            onClick={() => setUserModalOpen(!isUserModalOpen)}
          >
            <Typography>{userName} </Typography>
          </Box>
        )}
        {userName !== '' && (
          <Box
            width="160px"
            sx={{
              position: 'absolute',
              top: '80px',
              right: '20px',
              paddingRight: '10px',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#BED4CE',
              borderColor: 'black',
              boxShadow: '-6px 8px 6px -6px black',
              gap: '1rem',
              visibility: isUserModalOpen ? '' : 'hidden',
              transitionProperty: 'visibility',
              transitionDuration: '0.1s',
              msTransitionTimingFunction: 'linear',
            }}
          >
            <Typography>
              {' '}
              <span>Score: </span> {userScore}{' '}
            </Typography>
            <Typography>
              {' '}
              <span>Lesson: </span> {userLessons}{' '}
            </Typography>
            <Box
              onMouseEnter={() => setIsResetProgressHovered(true)}
              onMouseLeave={() => setIsResetProgressHovered(false)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Button
                sx={{
                  fontWeight: isResetProgressHovered ? 'bold' : '200',
                  color: isResetProgressHovered ? 'red' : 'black',
                  transitionProperty: 'all',
                  transitionDuration: '0.1s',
                  msTransitionTimingFunction: 'linear',
                }}
                onClick={resetProgressHandler}
              >
                Reset Progress
              </Button>{' '}
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Typography
                color={isLogoutHovered ? 'red' : 'black'}
                fontWeight={isLogoutHovered ? 'bolder' : '800'}
                sx={{
                  transitionProperty: 'all',
                  transitionDuration: '0.1s',
                  msTransitionTimingFunction: 'linear',
                }}
              >
                LOG OUT
              </Typography>{' '}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Navbar;
