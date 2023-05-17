import { useQuestion } from "@/context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Questions } from "@/components";
import ResultModal from "@/components/modal";

const QuestionPage = () => {
  const { state, dispatch } = useQuestion();
  const [questions, setQuestions] = useState<QuestiosType[]>([]);
  const [currect, setCurrect] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultModal, SetResultModal] = useState(false);
  const handleOpen = () => SetResultModal(true);
  const handleClose = () => SetResultModal(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(state.apiUrl).then((res) => {
      console.log(res.data.results);
      setQuestions(res.data.results);
      setLoading(false);
    });
  }, []);

  const handleNextQuestion = function (answer: string) {
    console.log(answer);
    if (state.questionNumber < questions.length) {
      dispatch({ type: "questionNumber" });
      setCurrect([...currect, questions[state.questionNumber].correct_answer]);
      setAnswers([...answers, answer]);
    }
  };
  const showResult = function () {
    handleOpen();
  };
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: green[200],
        borderRadius: "10px",
        px: 5,
        pb: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          py: 3,
        }}
        gutterBottom
        align={"center"}
      >
        {questions[state.questionNumber]?.question}
      </Typography>
      <Stack spacing={5}>
        {loading ? (
          <LinearProgress color="success" />
        ) : state.questionNumber < questions.length ? (
          <Questions
            data={questions[state.questionNumber]}
            onClick={handleNextQuestion}
          />
        ) : (
          <Button onClick={showResult} sx={{ mt: 5 }} variant={"contained"}>
            {" "}
            see result{" "}
          </Button>
        )}
      </Stack>
      <ResultModal
        handleClose={handleClose}
        currect={currect}
        answers={answers}
        open={resultModal}
      />
    </Box>
  );
};

export default QuestionPage;
