import {Box, Typography} from "@mui/material";
import {QuestionPage, StartForm} from "@/components";
import {useQuestion} from "@/context";

const Main = () => {
    const state = useQuestion()

    return (
        <Box sx={{
            height:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',

            pt:10
        }} >
            <Typography sx={{mb:5}} variant={'h3'}  align={'center'}>Question App</Typography>
            {state && state.state.page === 'startForm' ? <StartForm /> : <QuestionPage/>}
        </Box>
    );
};

export default Main;