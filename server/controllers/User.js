import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  //console.log('in register');
  try {
    const { name, email, password, lessons, score, progress } = req.body;
    if (!name) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'no user data sent to server' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      lessons: lessons,
      score: score,
      progress: progress,
    });
    await newUser.save();
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

export const login = async (req, res) => {
  // console.log('in login');
  try {
    const { email, password } = req.body;
    // console.log(email);

    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'no user data sent to server' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: 'no such user exist' });
    }
    const dbPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    // console.log('password match' + passwordMatch);
    if (!passwordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: 'passwords not match' });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('access-token', accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.status(StatusCodes.OK).json({
      userId: user._id,
      username: user.name,
      lessons: user.lessons,
      score: user.score,
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
};

export const patchProgress = async (req, res) => {
  try {
    const { _id, lessonNumber, indice } = req.body;
    // console.log('_id ' + _id);
    // console.log('lesson: ' + lessonNumber);
    // console.log('indice: ' + indice);
    let wordNumber = indice % 50;
    if (wordNumber === 0) {
      wordNumber = 50;
    }
    // console.log('word number: ' + wordNumber);
    if (!_id || !lessonNumber) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'No data sent to server' });
    }
    const existingUser = await User.findById(_id);
    const existingProgress = existingUser.progress;
    // console.log(existingProgress[0]);
    const newProgress = [];
    for (let i = 0; i < existingProgress.length; i++) {
      if (i === lessonNumber - 1) {
        let currLessonProgress = existingProgress[i].filter(
          (item) => item !== wordNumber
        );
        newProgress.push(currLessonProgress);
      } else {
        newProgress.push(existingProgress[i]);
      }
    }
    // console.log(newProgress);
    await User.findByIdAndUpdate(_id, { progress: newProgress });
    res.status(StatusCodes.OK).json({ msg: 'ok' });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

export const resetProgress = async (req, res) => {
  try {
    const { _id } = req.body;

    const lessonProgress = [];
    const progress = [];
    for (let i = 0; i < 50; i++) {
      lessonProgress.push(i + 1);
    }
    for (let i = 0; i < 35; i++) {
      progress.push(lessonProgress);
    }
    await User.findByIdAndUpdate(_id, { progress: progress });
    res.status(StatusCodes.OK).json({ msg: 'ok' });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

export const fetchProgress = async (req, res) => {
  try {
    const { _id, lessonnumber } = req.params;

    const existUser = await User.findById(_id);
    const progress = existUser.progress[lessonnumber - 1];
    res.status(StatusCodes.OK).json(progress);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};
