import { atom } from "jotai";
import { TaxBracket } from "../types/types";
import { AlertProps } from "@mui/material";

// atoms for global state management

export const marginalTaxRateAtom = atom<
  { bracket: TaxBracket; taxPaid: number }[]
>([]);

export const effectiveTaxRateAtom = atom<number | null>(null);

export const salaryAtom = atom("");
export const yearAtom = atom("");

export const taxDataAtom = atom(null);

// snackbar

export const snackbarAtom = atom({
  open: false,
  message: "",
  severity: "info" as AlertProps["severity"],
});
