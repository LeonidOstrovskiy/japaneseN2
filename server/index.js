import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import { connect } from './db/connect.js';
import userRouter from './rootes/User.js';
import wordRouter from './rootes/Seed.js';
import textRouter from './rootes/Text.js';
//import { texts } from './data.js';
// import Text from './models/Text.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

dotenv.config();
const port = process.env.PORT || 8000;
mongoose.set('strictQuery', false);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/words', wordRouter);
app.use('/api/v1/texts', textRouter);

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);

    // await Text.insertMany(texts);

    app.listen(port, () => {
      console.log(`server on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
