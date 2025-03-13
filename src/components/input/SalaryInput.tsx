import { ChangeEvent } from "react";
import { formatNumberToDollars } from "../../utils/formats";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useAtom } from "jotai";
import { salaryAtom } from "../../store/atom";

interface SalaryInputProps {
  error?: string;
}

export default function SalaryInput({ error }: SalaryInputProps) {
  const [value, setValue] = useAtom(salaryAtom);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, "");
    setValue(rawValue);
  };

  return (
    <FormControl error={!!error} sx={{ minWidth: 120 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Salary</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Salary"
        value={value ? formatNumberToDollars(Number(value)) : ""}
        onChange={handleChange}
        fullWidth
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          maxLength: 12,
        }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
