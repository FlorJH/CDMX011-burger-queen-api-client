import React from "react";
import { render, screen } from "@testing-library/react";
import MenuOption from "../../../../components/WaiterProfile/MenuOption";
//import { jsonMock } from "./jsonMock";

//const data = jsonMock.product;
// const breakfast = data.filter(items=> items.type==="Breakfast");
// const lunch = data.filter(items=> items.type==="Lunch");
// console.log("breakfast", breakfast, "lunch", lunch ); 

beforeEach(() => render(<MenuOption />));
test("should render LoginForm", () => {
  const contentSubTitle = screen.getByText("Menu");
  const contentOptionBreakfast = screen.getByRole("button", {
    name: /Breakfast/i,
  });
  const contentOptionLunch = screen.getByRole("button", { name: /Lunch/i });
  expect(contentSubTitle).toBeInTheDocument();
  expect(contentOptionBreakfast).toBeInTheDocument();
  expect(contentOptionLunch).toBeInTheDocument();
  // fireEvent.click(contentOptionBreakfast);
  // fireEvent.click(contentOptionLunch);
 
 
});
