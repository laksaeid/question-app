import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
interface Props {
  label: string;
  options: any;
  field: any;
  errors: any;
}
const SelectComp = ({ label, options, field, errors }: Props) => {
  return (
    <div>
      <FormControl
        sx={{ bgcolor: 'white' }}
        variant="filled"
        fullWidth
        error={!!errors[label]}
      >
        <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          label={label}
          {...field}
        >
          {Object.entries(options).map((opt) => {
            return (
              <MenuItem key={opt[0]} value={opt[0]}>
                {opt[1]}
              </MenuItem>
            );
          })}

          {/*<MenuItem value={"21"}>sport</MenuItem>*/}
          {/*<MenuItem value={"23"}>history</MenuItem>*/}
        </Select>
        {!!errors[label] && (
          <FormHelperText error={true}>{errors[label].message}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default SelectComp;
