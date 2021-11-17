import React from "react";
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Login from "../../components/Login/Login";


afterEach(cleanup);
const mockHandleSubmit = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockHandleSubmit,
 }));


beforeEach(()=>render(<Login />));

test('test should render Login ', async () => {

    const contentEmail = screen.getByPlaceholderText("Write your Email")
    const contentPassword = screen.getByPlaceholderText("Write your Password")
    const contentSubmit = screen.getByRole("button", { name: /Login/i });
    const foother=screen.getByText(/2021 All rights reserved - Made by Flor Jardinez & Ana Karina Dávila./i);
    
    expect(contentEmail).toBeInTheDocument()
    expect(contentPassword).toBeInTheDocument()
    expect(contentSubmit).toBeInTheDocument()
    expect(foother).toBeInTheDocument()


});