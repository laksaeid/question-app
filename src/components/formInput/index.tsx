import React from 'react';
import {TextField} from "@mui/material";

const FormInput = ({errors,register}) => {
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
};

export default FormInput;