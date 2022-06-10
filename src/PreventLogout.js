import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authzation } from "./auth";

const PreventLogout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isLogin = authzation();
        if (isLogin) {
          return (
            <Redirect
              to={{
                pathname: "/articles",
                state: {
                  from: props.location.pathname,
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PreventLogout;
