import {
  Box,
  Button, CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useQuestion } from "@/context";
import {green, grey} from "@mui/material/colors";
import axios from "axios";
import {useState} from "react";

interface FormData {
  questions: number | "";
  Category: string;
  difficulty: string;
}

const StartForm = () => {
  const [loading , setLoading] = useState(false)
  const { dispatch } = useQuestion();
  const schema: ZodType<FormData> = z.object({
    questions: z.number().min(1).max(10),
    difficulty: z.string().nonempty("select one"),
    Category: z.string().nonempty("select one"),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    delayError: 1000,
    defaultValues: {
      questions: "",
      Category: "",
      difficulty: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  const submitHandler = async function (form: FormData) {
    setLoading(true)
    const token = await axios('https://opentdb.com/api_token.php?command=request')
    setLoading(false)
    dispatch({
      type: "submitForm",
      payload: {
        apiUrl: `https://opentdb.com/api.php?amount=${form.questions}&category=${form.Category}&difficulty=${form.difficulty}&token=${token.data.token}`,
      },
    });
  };
  return (
    <>
      <Box
        sx={{
          color: "white",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          // bgcolor: "gray",
          // borderRadius: 5,
          // p: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          control={control}
          render={() => {
            return (

                <TextField
                  sx={{ bgcolor: 'white'}}
                  variant={"filled"}
                  {...register("questions", {
                    valueAsNumber: true,
                  })}
                  label="questions"
                  error={!!errors.questions}
                  helperText={errors.questions?.message}
                />

            );
          }}
          name={"questions"}
        />

        <Controller
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{ bgcolor:'white' }}
                variant="filled"
                fullWidth
                error={!!errors.Category}
              >
                <InputLabel id="demo-simple-select-error-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  label="Category"
                  {...field}
                >
                  <MenuItem value={"25"}>art</MenuItem>
                  <MenuItem value={"21"}>sport</MenuItem>
                  <MenuItem value={"23"}>history</MenuItem>
                </Select>
                {!!errors.Category && (
                  <FormHelperText error={true}>
                    {errors.Category.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
          name={"Category"}
        />

        <Controller
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{ bgcolor:'white' }}
                variant="filled"
                fullWidth
                error={!!errors.difficulty}
              >
                <InputLabel id="demo-simple-select-label">
                  Difficulty
                </InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Difficulty"
                  {...field}
                >
                  <MenuItem value={"easy"}>easy</MenuItem>
                  <MenuItem value={"medium"}>medium</MenuItem>
                  <MenuItem value={"hard"}>hard</MenuItem>
                </Select>
                {!!errors.difficulty && (
                  <FormHelperText error={true}>
                    {errors.difficulty.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
          name={"difficulty"}
        />
        <Button variant={"contained"} sx={{
          py:2,
          borderRadius:'10px',
          bgcolor:green[500],
          '&:hover':{
            bgcolor:green[800]
          }

        }} type={"submit"}>
          submit {loading &&<CircularProgress sx={{pl:1,ml:1}} color="inherit" />}
        </Button>
      </Box>
    </>
  );
};

export default StartForm;
