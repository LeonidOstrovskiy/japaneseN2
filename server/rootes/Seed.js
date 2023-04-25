import express from 'express';
import { getWords, getQuestion } from '../controllers/Seed.js';

const wordRouter = express.Router();

wordRouter.get('/words/:lesson/:userId', getWords);
wordRouter.get('/words/:lesson', getQuestion);

export default wordRouter;
