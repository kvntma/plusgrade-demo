export const validateInputs = (
  year: string,
  salary: string,
  setYearError: (error: string) => void,
  setSalaryError: (error: string) => void
): boolean => {
  let isValid = true;

  if (!year) {
    setYearError("Tax year is required");
    isValid = false;
  } else {
    setYearError("");
  }

  if (!salary) {
    setSalaryError("Salary is required");
    isValid = false;
  } else {
    setSalaryError("");
  }

  return isValid;
};
