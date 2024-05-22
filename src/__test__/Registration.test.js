import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import Registration from "../components/Dashboard/Registration.jsx";
import { act } from "react";



describe("Registration Component", () => {

  test("renders the Registration component and opens the dialog", () => {
    render(<Registration />);

    // Check that the IconButton is rendered
    const iconButton = screen.getByRole('button');
    expect(iconButton).toBeInTheDocument();

    // Simulate button click to open the dialog
    fireEvent.click(iconButton);

    // Check that the dialog is open
    const dialogTitle = screen.getByText("Registration");
    expect(dialogTitle).toBeInTheDocument();
  });


  test("fills out the form and submits", async () => {
    render(<Registration />);

    // Open the dialog
    fireEvent.click(screen.getByRole('button'));

    // Fill out the form
    fireEvent.change(screen.getByLabelText("Company Code", { exact: false }), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText("Company Name", { exact: false }), { target: { value: 'TechSavvy Solutions' } });
    fireEvent.change(screen.getByLabelText("Company Address", { exact: false }), { target: { value: '123 Tech Lane' } });

    // Submit the form
    fireEvent.click(screen.getByText("Register"));

    // For now, we just expect the dialog to be closed after submission
    await act(async () => {
      await new Promise((r) => setTimeout(r, 500))
    })
    expect(screen.queryByText("Registration")).not.toBeInTheDocument();
  });


  test("cancels the dialog", async () => {
    render(<Registration />);

    // Open the dialog
    fireEvent.click(screen.getByRole('button'));

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 500))
    })
    // Check that the dialog is closed
    expect(screen.queryByText("Registration")).not.toBeInTheDocument();
  });
});


