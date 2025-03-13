import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAtom } from "jotai";
import { fetchTaxData } from "../../api/taxCalculatorAPI";
import {
  effectiveTaxRateAtom,
  snackbarAtom,
  taxDataAtom,
} from "../../store/atom";
import { TaxData } from "../../types/types";

interface SubmitButtonProps {
  taxYear: string;
  onClick: (data: TaxData) => void;
  validate: () => boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  taxYear = "",
  onClick,
  validate,
}) => {
  const [, setTaxData] = useAtom(taxDataAtom);
  const [, setEffectiveTaxRate] = useAtom(effectiveTaxRateAtom);
  const cacheRef = useRef<{ [key: string]: any }>({});
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // validate first

    if (!validate()) {
      setSnackbar({
        open: true,
        message: "Please ensure all fields are filled in",
        severity: "warning",
      });
      return;
    }

    // start loading for api calls

    setLoading(true);

    // check if we have cached data for this year so we don't need to fetch
    // can set a validation time in future if this updates frequenetly
    if (cacheRef.current[taxYear]) {
      const cachedData = cacheRef.current[taxYear];
      setTaxData(cachedData);
      console.log("Using cached data:", cachedData);
      onClick(cachedData);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchTaxData(taxYear);
      cacheRef.current[taxYear] = data;
      setTaxData(data);
      console.log("Response data:", data);
      onClick(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Something went wrong while fetching the Tax Rates - please try again or contact support",
        severity: "error",
      });
      setTaxData(null);
      setEffectiveTaxRate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : "Submit"}
    </Button>
  );
};

export default SubmitButton;
