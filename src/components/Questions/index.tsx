import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
interface Props {
  data: QuestiosType;
  onClick: (x:string) => void;
}
const Questions = ({ data, onClick }: Props) => {
  const answers = [...data.incorrect_answers, data.correct_answer].sort(()=>Math.random() - .5);
  return (
    <>
      {answers.map((answer) => (
        <Button
            key={answer}
          onClick={()=>onClick(answer)}
          sx={{
            bgcolor: green[700],
            "&:hover": {
              bgcolor: green[900],
              boxShadow: "0 0 15px #00F973",
            },
          }}
          variant={"contained"}
        >
          {answer}
        </Button>
      ))}
    </>
  );
};

export default Questions;
