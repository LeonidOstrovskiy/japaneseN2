import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LessonBar from '../../components/lessonbar';

const Layout = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <LessonBar />
      <Outlet />
    </div>
  );
};

export default Layout;
