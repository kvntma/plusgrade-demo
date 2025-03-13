import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "jotai";
import SalaryInput from "./SalaryInput";

describe("SalaryInput", () => {
  it("renders without crashing", () => {
    render(
      <Provider>
        <SalaryInput />
      </Provider>
    );
  });

  it("displays error message when error prop is passed", () => {
    render(
      <Provider>
        <SalaryInput error="Salary is required" />
      </Provider>
    );

    expect(screen.getByText("Salary is required")).toBeInTheDocument();
  });

  it("updates the salary atom when input changes", () => {
    render(
      <Provider>
        <SalaryInput />
      </Provider>
    );

    const input = screen.getByLabelText("Salary") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50000" } });

    expect(input.value).toBe("50,000");
  });
});
