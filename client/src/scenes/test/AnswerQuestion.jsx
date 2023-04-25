import Question from './Question';
import Answers from './Answers';

const AnswerQuestion = ({ randomQuestion, answers }) => {
  return (
    <>
      <Question question={randomQuestion.jap} />
      <Answers randomQuestion={randomQuestion} answers={answers} />
    </>
  );
};

export default AnswerQuestion;
