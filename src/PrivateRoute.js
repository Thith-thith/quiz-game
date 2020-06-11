import React from "react";
import { Route, Redirect } from "react-router-dom";

let token = localStorage.getItem("token");

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
