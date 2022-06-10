import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authzation } from "./auth";

export const ProtectedRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isLogin = authzation();
        // console.log(props)
        if (isLogin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location.pathname,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
