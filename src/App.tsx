import {Container, CssBaseline} from "@mui/material";

import {QuestionProvider} from "@/context";
import { Main } from "@/components";

const App = () => {

  return (
    <>
        <QuestionProvider>

      <CssBaseline />
      <Container maxWidth={"md"} sx={{
          height:'100%',
      }}>
        <Main />

        
      </Container>
        </QuestionProvider>
    </>
  );
};

export default App;
