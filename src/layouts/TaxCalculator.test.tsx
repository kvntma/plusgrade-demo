import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider, createStore } from "jotai";
import TaxCalculator from "./TaxCalculator";
import "@testing-library/jest-dom";
import { taxDataAtom } from "../store/atom";

const mockTaxData = {
  tax_brackets: [
    { min: 0, max: 48535, rate: 0.15 },
    { min: 48535, max: 97069, rate: 0.205 },
    { min: 97069, max: 150473, rate: 0.26 },
    { min: 150473, max: 214368, rate: 0.29 },
    { min: 214368, rate: 0.33 },
  ],
};

describe("TaxCalculator", () => {
  it("renders without crashing", () => {
    render(
      <Provider>
        <TaxCalculator />
      </Provider>
    );
  });

  it("displays validation errors when inputs are empty", () => {
    render(
      <Provider>
        <TaxCalculator />
      </Provider>
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Tax year is required")).toBeInTheDocument();
    expect(screen.getByText("Salary is required")).toBeInTheDocument();
  });

  it("submit button processes if validation is correct", async () => {
    const store = createStore();
    store.set(taxDataAtom, mockTaxData as any);

    render(
      <Provider store={store}>
        <TaxCalculator />
      </Provider>
    );

    fireEvent.mouseDown(screen.getByLabelText("Tax Year"));
    fireEvent.click(screen.getByText("2022"));

    fireEvent.change(screen.getByLabelText("Salary"), {
      target: { value: "50000" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Submit"));
    });

    expect(screen.queryByText("Tax year is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Salary is required")).not.toBeInTheDocument();
  });
});
