import express from 'express';
import { getText } from '../controllers/Text.js';

const textRouter = express.Router();

textRouter.get('/:lesson/:textNr', getText);

export default textRouter;
