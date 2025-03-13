import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "jotai";
import YearInput from "./YearInput";
import { yearAtom } from "../../store/atom";

describe("YearInput", () => {
  it("renders without crashing", () => {
    render(
      <Provider>
        <YearInput />
      </Provider>
    );
  });

  it("displays error message when error prop is passed", () => {
    render(
      <Provider>
        <YearInput error="Tax year is required" />
      </Provider>
    );

    expect(screen.getByText("Tax year is required")).toBeInTheDocument();
  });

  it("updates the year atom when input changes", async () => {
    render(
      <Provider>
        <YearInput />
      </Provider>
    );

    fireEvent.mouseDown(screen.getByRole("combobox", { name: /Tax Year/i }));

    const yearOption = await screen.findByText("2022", {}, { timeout: 1000 });

    fireEvent.click(yearOption);

    expect(screen.getByRole("combobox")).toHaveTextContent("2022");
  });
});
