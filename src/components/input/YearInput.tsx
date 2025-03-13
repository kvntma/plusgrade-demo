import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { yearAtom } from "../../store/atom";
import { useAtom } from "jotai";

const YEARS = [2019, 2020, 2021, 2022];

interface YearInputProps {
  error?: string;
}

const YearInput = ({ error }: YearInputProps) => {
  const [year, setYear] = useAtom(yearAtom);

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} error={!!error}>
      <InputLabel id="select-year">Tax Year</InputLabel>
      <Select
        labelId="select-year"
        id="select-year"
        value={year}
        label="Tax Year"
        onChange={handleChange}
      >
        {YEARS.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default YearInput;
