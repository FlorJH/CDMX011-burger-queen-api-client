import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../../../components/Login/LoginForm";

const mockHandleLogin = jest.fn();
beforeEach(() => render(<LoginForm handleSubmit={mockHandleLogin} />));
test("should render LoginForm", () => {
  const contentEmail = screen.getByPlaceholderText("Write your Email");
  const contentPassword = screen.getByPlaceholderText("Write your Password");
  const contentSubmit = screen.getByRole("button", { name: /Login/i });

  expect(contentEmail).toBeInTheDocument();
  expect(contentPassword).toBeInTheDocument();
  expect(contentSubmit).toBeInTheDocument();

  fireEvent.change(contentEmail, {
    target: { value: "waiterflor@burgerqueen.com" },
  });
  fireEvent.change(contentPassword, {
    target: { value: "123456" },
  });
  fireEvent.click(contentSubmit);

  expect(mockHandleLogin).toHaveBeenCalledWith(
    "waiterflor@burgerqueen.com",
    "123456"
  );
});
