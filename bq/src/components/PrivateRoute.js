import React from "react";
import {  Navigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export const PrivateRoute=({ children })=> {
  const user= auth.currentUser;
  return user ? children : <Navigate to="/" />;
}