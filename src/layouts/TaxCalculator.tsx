import { useState } from "react";
import { useAtom } from "jotai";
import SalaryInput from "../components/input/SalaryInput";
import YearInput from "../components/input/YearInput";
import SubmitButton from "../components/input/SubmitButton";
import ResetButton from "../components/input/ResetButton";
import {
  marginalTaxRateAtom,
  salaryAtom,
  taxDataAtom,
  yearAtom,
  effectiveTaxRateAtom,
} from "../store/atom";
import {
  calculateMarginalTax,
  calculateEffectiveTax,
} from "../utils/calculateTaxes";
import TaxBreakdownTable from "../components/table/TaxBreakdownTable";
import { TaxData } from "../types/types";
import { Box, Typography } from "@mui/material";
import { validateInputs } from "../utils/validation";

const TaxCalculator = () => {
  const [year, _setYear] = useAtom(yearAtom);
  const [_taxData, _setTaxData] = useAtom<TaxData | null>(taxDataAtom);
  const [salary, _setSalary] = useAtom(salaryAtom);
  const [marginalTaxRate, setMarginalTaxRate] = useAtom(marginalTaxRateAtom);
  const [effectiveTaxRate, setEffectiveTaxRate] = useAtom(effectiveTaxRateAtom);

  const [yearError, setYearError] = useState("");
  const [salaryError, setSalaryError] = useState("");

  // used for calculations and setting the table
  const handleSubmit = (data: TaxData) => {
    if (data) {
      const taxBrackets = data?.tax_brackets || [];
      const calculatedTaxDetails = calculateMarginalTax(
        Number(salary),
        taxBrackets
      );
      setMarginalTaxRate(calculatedTaxDetails);
      setEffectiveTaxRate(
        calculateEffectiveTax(Number(salary), data.tax_brackets)
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          padding: 2,
          gap: 3,
        }}
      >
        <SalaryInput error={salaryError} />
        <YearInput error={yearError} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          gap: 1,
        }}
      >
        <SubmitButton
          taxYear={year}
          onClick={handleSubmit}
          validate={() =>
            validateInputs(year, salary, setYearError, setSalaryError)
          }
        />
        <ResetButton />
      </Box>
      <TaxBreakdownTable taxDetails={marginalTaxRate} />
      {effectiveTaxRate !== null && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
          <Typography variant="h6">
            Effective Tax Rate: {(effectiveTaxRate * 100).toFixed(2)}%
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TaxCalculator;
