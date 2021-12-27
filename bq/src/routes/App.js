import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterProfile from "../components/WaiterProfile/WaiterProfile";
import Login from "../components/Login/Login";
import NotFound from "../components/NotFound/NotFound";
import { KitchenRoom } from "../components/KitchenRoom/KitchenRoom";
import { ReadyOrders } from "../components/WaiterProfile/Orders/ReadyOrders";
import { PrivateRoute } from "../components/PrivateRoute";

import { AdminProfile } from "../components/Administrator/AdminProfile";

import { UserRegister } from "../components/Administrator/UserRegister";
import { ManageProducts } from "../components/Administrator/ManageProducts/ManageProducts";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/ManageProducts"
            element={
              <PrivateRoute>
                <ManageProducts />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/AdminProfile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/UserRegister"
            element={
              <PrivateRoute>
                <UserRegister />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/ReadyOrders"
            element={
              <PrivateRoute>
                <ReadyOrders />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/KitchenRoom"
            element={
              <PrivateRoute>
                <KitchenRoom />
              </PrivateRoute>
            }
          />
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/WaiterProfile"
            element={
              <PrivateRoute>
                <WaiterProfile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;
