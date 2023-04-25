import Seeds from '../models/Seeds.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export const getQuestion = async (req, res) => {
  try {
    const { lesson } = req.params;
    if (!lesson) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'no lesson sent to server' });
    }
    const lessonNumber = Number(lesson);
    const randomIndex = getRandomIndex(50);
    const indiceToFind = (lessonNumber - 1) * 50 + randomIndex;
    const question = await Seeds.findOne({ indice: indiceToFind });
    res.status(StatusCodes.OK).json(question);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

export const getWords = async (req, res) => {
  try {
    const { lesson, userId } = req.params;

    if (!lesson) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'no lesson number sent' });
    }

    const lessonNumber = Number(lesson);

    let lessonToSend;
    if (userId !== 'free') {
      const existUser = await User.findById(userId);

      const progress = existUser.progress;

      if (progress[lessonNumber - 1].length === 0) {
        return res.status(StatusCodes.OK).json({ msg: 'LESSON FINISHED' });
      }

      const randomIndex = getRandomIndex(progress[lessonNumber - 1].length);

      const randomQuestionIndice = progress[lessonNumber - 1][randomIndex];

      const indiceToFind = (lessonNumber - 1) * 50 + randomQuestionIndice;

      lessonToSend = await Seeds.findOne({ indice: indiceToFind });
    } else {
      const randomIndex = getRandomIndex(49);
      const indice = randomIndex + lessonNumber * 50 - 50;
      lessonToSend = await Seeds.findOne({ indice: indice });
    }

    //const min = Number(lesson) * 50 - 50;
    //const max = Number(lesson) * 50;
    //lessonToSend = await Seeds.find({ indice: { $gt: min, $lt: max } });

    let answers = [];
    answers.push(lessonToSend.eng);
    let indexOfTheQuestion = lessonToSend.indice - 1;
    indexOfTheQuestion = indexOfTheQuestion % 50;
    if (indexOfTheQuestion === 0) {
      indexOfTheQuestion = 50;
    }
    let randomIndexNumbers = [indexOfTheQuestion];

    while (randomIndexNumbers.length < 4) {
      let item = getRandomIndex(50);

      if (!randomIndexNumbers.includes(item)) {
        randomIndexNumbers.push(item);
      }
    }

    for (let i = 1; i < randomIndexNumbers.length; i++) {
      const ans = await Seeds.findOne({
        indice: randomIndexNumbers[i] + lessonNumber * 50 - 49,
      });
      answers.push(ans.eng);
    }
    // console.log(randomIndexNumbers);
    answers = answers.map((item, index) => {
      return index === 0
        ? { ans: item, isCorrect: true }
        : { ans: item, isCorrect: false };
    });

    answers = shuffleArray(answers);

    res
      .status(StatusCodes.OK)
      .json({ fullQuestion: lessonToSend, answers: answers });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};
