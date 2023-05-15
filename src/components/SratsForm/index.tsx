import {
  Box,
  Button,
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

interface FormData {
  questions: number | "";
  Category: string;
  difficulty: string;
}

const StartForm = () => {
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

  const submitHandler = function (form: FormData) {
    // console.log(form, state);
    dispatch({
      type: "submitForm",
      payload: {
        apiUrl: `https://opentdb.com/api.php?amount=${form.questions}&category=${form.Category}&difficulty=${form.difficulty}&token=c06162cb2a96fe50f8e10e20c605fa613adb7ca212984aabff061f7062d33bde`,
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
          gap: "10px",
          bgcolor: "gray",
          borderRadius: 5,
          p: 5,
        }}
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          control={control}
          render={() => {
            return (
              <>
                <TextField
                  sx={{ bgcolor: "white" }}
                  variant={"filled"}
                  {...register("questions", {
                    valueAsNumber: true,
                  })}
                  label="questions"
                  error={!!errors.questions}
                  helperText={errors.questions?.message}
                />
              </>
            );
          }}
          name={"questions"}
        />

        <Controller
          control={control}
          render={({ field }) => {
            return (
              <FormControl
                sx={{ bgcolor: "white" }}
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
                sx={{ bgcolor: "white" }}
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
        <Button variant={"contained"} color={"secondary"} type={"submit"}>
          submit
        </Button>
      </Box>
    </>
  );
};

export default StartForm;
