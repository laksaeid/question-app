import { green } from '@mui/material/colors';
import { Button, Typography } from '@mui/material';
interface Props {
  data: QuestiosType;
  onClick: (x: string) => void;
  correct: string[];
  userAnswers: string[];
}
const Questions = ({ data, onClick, correct, userAnswers }: Props) => {
  const answers = [...data.incorrect_answers, data.correct_answer].sort(
    () => Math.random() - 0.5
  );
  return (
    <>
      {answers.map((answer) => (
        <Button
          key={answer}
          onClick={() => onClick(answer)}
          sx={{
            bgcolor: green[700],
            '&:hover': {
              bgcolor: green[900],
              boxShadow: '0 0 15px #00F973',
            },
          }}
          variant={'contained'}
        >
          {answer}
        </Button>
      ))}
      <Typography>
        Correct Answers:
        {
          correct.filter(
            (ans: string, index: number) => ans === userAnswers[index]
          ).length
        }{' '}
      </Typography>
    </>
  );
};

export default Questions;
