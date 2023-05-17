import { Box, Button, CircularProgress } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useQuestion } from "@/context";
import { green } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { FormInput, SelectComp } from "@/components";

interface FormData {
  questions: number | "";
  Category: string;
  difficulty: string;
}

const StartForm = () => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const token = await axios(
      "https://opentdb.com/api_token.php?command=request"
    );
    setLoading(false);
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
        }}
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <Controller
          control={control}
          render={() => {
            return <FormInput errors={errors} register={register} />;
          }}
          name={"questions"}
        />

        <Controller
          control={control}
          render={({ field }) => {
            return (
              <SelectComp
                errors={errors}
                field={field}
                label={"Category"}
                options={{ "25": "art", "21": "sport", "23": "history" }}
              />
            );
          }}
          name={"Category"}
        />
        <Controller
          control={control}
          render={({ field }) => {
            return (
              <SelectComp
                errors={errors}
                label={"difficulty"}
                field={field}
                options={{ easy: "easy", medium: "medium", hard: "hard" }}
              />
            );
          }}
          name={"difficulty"}
        />
        <Button
          variant={"contained"}
          sx={{
            py: 2,
            borderRadius: "10px",
            bgcolor: green[500],
            "&:hover": {
              bgcolor: green[800],
            },
          }}
          type={"submit"}
        >
          submit{" "}
          {loading && (
            <CircularProgress sx={{ pl: 1, ml: 1 }} color="inherit" />
          )}
        </Button>
      </Box>
    </>
  );
};

export default StartForm;
