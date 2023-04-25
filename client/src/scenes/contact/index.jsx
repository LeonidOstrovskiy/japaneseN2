import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const userUrl = import.meta.env.VITE_BASE_URL + '/api/v1/user/';

const inputStyle = {
  width: '60%',
  fontSize: '20px',
  paddingLeft: '10px',
  height: '2rem',
  borderRadius: '5px',
};

const Contact = () => {
  const [pageType, setPageType] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lessons = useSelector((state) => state.global.lessons);
  const score = useSelector((state) => state.global.score);

  const registerSchema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required(),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
  });

  const schema = pageType === 'login' ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (pageType === 'login') {
      try {
        const url = userUrl + 'login';

        const loggedUser = await axios.post(url, {
          email: data.email,
          password: data.password,
        });
        if (loggedUser) {
          const currUser = {
            name: loggedUser.data.username,
            lessons: loggedUser.data.lessons,
            score: loggedUser.data.score,
            _id: loggedUser.data.userId,
          };
          localStorage.setItem('username', JSON.stringify(currUser.name));
          localStorage.setItem('lessons', JSON.stringify(currUser.lessons));
          localStorage.setItem('score', JSON.stringify(currUser.score));
          localStorage.setItem('id', JSON.stringify(currUser._id));
          dispatch(login(currUser));
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const lessonProgress = [];
      const progress = [];
      for (let i = 0; i < 50; i++) {
        lessonProgress.push(i + 1);
      }
      for (let i = 0; i < 35; i++) {
        progress.push(lessonProgress);
      }

      const userdata = {
        email: data.email,
        name: data.name,
        password: data.password,
        lessons: lessons,
        score: score,
        progress: progress,
      };
      try {
        const url = userUrl + 'register';
        await axios.post(url, userdata);
        setPageType('login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box
      margin="0 1rem 1rem 1rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          marginTop: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          width: '80%',
        }}
      >
        {pageType === 'register' && (
          <>
            <input
              style={inputStyle}
              placeholder="name"
              type="text"
              {...register('name')}
            />
            <p>{errors.name?.message} </p>
          </>
        )}
        <input
          style={inputStyle}
          type="text"
          placeholder="email"
          {...register('email')}
        />
        <p>{errors.email?.message} </p>
        <input
          style={inputStyle}
          type="password"
          placeholder="password"
          {...register('password')}
        />
        <p>{errors.password?.message} </p>
        {pageType === 'register' && (
          <>
            <input
              style={inputStyle}
              placeholder="confirm password"
              type="password"
              {...register('confirmPassword')}
            />
            <p>{errors.confirmPassword?.message} </p>
          </>
        )}
        <Button
          type="submit"
          sx={{ backgroundColor: 'green', width: '62%', marginBottom: '20px' }}
        >
          {' '}
          Submit{' '}
        </Button>
      </form>
      {pageType === 'login' && (
        <Typography
          sx={{ textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
          onClick={() => {
            setPageType('register');
          }}
        >
          {' '}
          Register First{' '}
        </Typography>
      )}
      {pageType === 'register' && (
        <Typography
          sx={{ textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
          onClick={() => {
            setPageType('login');
          }}
        >
          {' '}
          Register First{' '}
        </Typography>
      )}
    </Box>
  );
};

export default Contact;
