import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBarProvider } from "./nav/NavBarProvider";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Moto.css";

export const Moto = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("moto_user")) {
          return (
            <>
              <NavBarProvider>
                <NavBar key={window.location.pathname} />
              </NavBarProvider>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/logout">
      <Register />
    </Route>
  </>
);