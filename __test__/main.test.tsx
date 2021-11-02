/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Autocomplete from "../src/Autocomplete";

describe("Autocomplete component", () => {
  it("should render in initial state", async () => {
    render(<Autocomplete name="search" />);

    const input = screen.getByLabelText(/search github/i);
    const dropdown = screen.queryByRole("listbox");

    expect(input).toBeInTheDocument();
    expect(dropdown).not.toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should allow typing", async () => {
    render(<Autocomplete name="search" />);

    const input = screen.getByLabelText(/search github/i);

    await userEvent.type(input, "qwe");

    expect(input).toHaveValue("qwe");
  });

  it("should show loading state", async () => {
    render(<Autocomplete name="search" />);

    await userEvent.type(screen.getByLabelText(/search github/i), "qwe");

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  it("should show results", async () => {
    render(<Autocomplete name="search" />);

    await userEvent.type(screen.getByLabelText(/search github/i), "qwe");

    await waitFor(() => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
  });

  it("should allow navigation with arrow keys", async () => {
    render(<Autocomplete name="search" />);

    await userEvent.type(screen.getByLabelText(/search github/i), "qwe");

    await waitFor(() => {
      screen.getByRole("listbox");
    });

    await userEvent.type(screen.getByLabelText(/search github/i), "{arrowdown}");

    expect(screen.getAllByRole("option")[1]).toBeInTheDocument();
    expect(screen.queryAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
  });

  it("should clear the results", async () => {
    render(<Autocomplete name="search" />);

    const input = screen.getByLabelText(/search github/i);

    await userEvent.type(input, "qwe");
    await screen.findByRole("listbox");
    await userEvent.click(screen.getByRole("button", { name: /clear the query/i }));

    const dropdown = screen.queryByRole("listbox");

    expect(dropdown).not.toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should show error message", async () => {
    render(<Autocomplete name="search" />);

    const input = screen.getByLabelText(/search github/i);

    await userEvent.type(input, "errortest");

    await waitFor(() => {
      screen.getByRole("alert");
    });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
