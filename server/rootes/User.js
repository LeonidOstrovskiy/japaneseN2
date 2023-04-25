import express from 'express';
import {
  login,
  register,
  patchProgress,
  resetProgress,
  fetchProgress,
} from '../controllers/User.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.patch('/patchprogress', patchProgress);
userRouter.patch('/resetprogress', resetProgress);
userRouter.get('/fetchprogress/:_id/:lessonnumber', fetchProgress);
export default userRouter;
