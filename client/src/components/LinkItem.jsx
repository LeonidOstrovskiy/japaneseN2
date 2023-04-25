import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

const LinkItem = ({ destination, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:475px)');

  const handleEnter = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const linkStyle = {
    textDecoration: 'none',
    lineHeight: '2rem',
    fontSize: isSmallScreen ? '16px' : '20px',
    color: isHovered ? 'red' : '#1C1C16',

    fontWeight: 'bolder',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: isSmallScreen ? '5px' : '40px',
        paddingLeft: isSmallScreen ? '5px' : '10px',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link className="link" style={linkStyle} to={destination}>
        {' '}
        {name}{' '}
      </Link>{' '}
    </div>
  );
};

export default LinkItem;
