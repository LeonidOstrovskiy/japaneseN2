import Text from '../models/Text.js';
import { StatusCodes } from 'http-status-codes';

export const getText = async (req, res) => {
  try {
    const { lesson, textNr } = req.params;

    const lessonNumber = +lesson;
    const textNumber = +textNr;
    const textPool = await Text.findOne({ lesson: lessonNumber });

    const textToReturn = textPool.texts[textNumber - 1];

    return res.status(StatusCodes.OK).json(textToReturn);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
};
