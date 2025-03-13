import React from "react";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import {
  salaryAtom,
  yearAtom,
  taxDataAtom,
  marginalTaxRateAtom,
  effectiveTaxRateAtom,
} from "../../store/atom";

const ResetButton: React.FC = () => {
  const [, resetSalary] = useAtom(salaryAtom);
  const [, resetYear] = useAtom(yearAtom);
  const [, resetTaxData] = useAtom(taxDataAtom);
  const [, resetMarginalTaxRate] = useAtom(marginalTaxRateAtom);
  const [, resetEffectiveTaxRate] = useAtom(effectiveTaxRateAtom);

  const handleReset = () => {
    resetSalary("");
    resetYear("");
    resetTaxData(null);
    resetMarginalTaxRate([]);
    resetEffectiveTaxRate(null);
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleReset}>
      Reset
    </Button>
  );
};

export default ResetButton;
