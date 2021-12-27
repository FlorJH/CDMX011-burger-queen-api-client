
import { render, screen } from "@testing-library/react";
import { FoodMenu } from "../../../../components/WaiterProfile/FoodMenu";
import{ rest} from "new";
const toResponse= rest.get();

test("It should return 4 items when someone press brekfast", async () =>{
render(<FoodMenu />)
const foodItem= await screen.findAllByAltText("Food ilustration")
expect(foodItem).toBeVisible()
})