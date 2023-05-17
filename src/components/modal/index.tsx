import { Box, Button, Modal, Typography } from '@mui/material';
import { useQuestion } from '@/context';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};
interface Props {
  handleClose: () => void;
  open: boolean;
  correct: string[];
  answers: string[];
}
const ResultModal = ({ handleClose, open, correct, answers }: Props) => {
  const { dispatch } = useQuestion();
  const correctAnswers = correct.filter((ans, index) => ans === answers[index]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Result
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You answered {correctAnswers.length} from {answers.length}
          </Typography>
          <Button onClick={() => dispatch({ type: 'reset' })}>AGAIN</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ResultModal;
