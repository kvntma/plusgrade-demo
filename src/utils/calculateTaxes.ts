import { TaxBracket } from "../types/types";

export const calculateMarginalTax = (
  salary: number,
  taxBrackets: TaxBracket[]
): { bracket: TaxBracket; taxPaid: number }[] => {
  let remainingSalary = salary;
  const taxDetails: { bracket: TaxBracket; taxPaid: number }[] = [];

  for (const bracket of taxBrackets) {
    if (remainingSalary <= 0) break;

    const taxableIncome = bracket.max
      ? Math.min(remainingSalary, bracket.max - bracket.min)
      : remainingSalary;
    const taxPaid = taxableIncome * bracket.rate;
    taxDetails.push({ bracket, taxPaid });

    remainingSalary -= taxableIncome;
  }

  return taxDetails;
};

export const calculateEffectiveTax = (
  salary: number,
  taxBrackets: TaxBracket[]
): number => {
  const taxDetails = calculateMarginalTax(salary, taxBrackets);
  const totalTaxPaid = taxDetails.reduce(
    (acc, { taxPaid }) => acc + taxPaid,
    0
  );

  return totalTaxPaid / salary;
};
