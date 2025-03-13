import { validateInputs } from "./validation";

describe("validateInputs", () => {
  it("should return true when both year and salary are provided", () => {
    const setYearError = jest.fn();
    const setSalaryError = jest.fn();
    const result = validateInputs(
      "2022",
      "50000",
      setYearError,
      setSalaryError
    );
    expect(result).toBe(true);
    expect(setYearError).toHaveBeenCalledWith("");
    expect(setSalaryError).toHaveBeenCalledWith("");
  });

  it("should return false and set year error when year is not provided", () => {
    const setYearError = jest.fn();
    const setSalaryError = jest.fn();
    const result = validateInputs("", "50000", setYearError, setSalaryError);
    expect(result).toBe(false);
    expect(setYearError).toHaveBeenCalledWith("Tax year is required");
    expect(setSalaryError).toHaveBeenCalledWith("");
  });

  it("should return false and set salary error when salary is not provided", () => {
    const setYearError = jest.fn();
    const setSalaryError = jest.fn();
    const result = validateInputs("2022", "", setYearError, setSalaryError);
    expect(result).toBe(false);
    expect(setYearError).toHaveBeenCalledWith("");
    expect(setSalaryError).toHaveBeenCalledWith("Salary is required");
  });
});
