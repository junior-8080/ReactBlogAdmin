import React from "react";
import { Switch, Route } from "react-router-dom";
import Signin from "./pages/Siginin";
import PreventLogout from "./PreventLogout";
import "antd/dist/antd.css";
import "./App.css";
import { ProtectedRouter } from "./ProtectedRouter";
import Articles from "./pages/ArticlesPage";
import Article from "./pages/ArticlePage";



const App = () => {
  return (
    <Switch>
      <PreventLogout path="/" exact component={Signin} />
      <ProtectedRouter path="/articles" exact component={Articles} />
      <ProtectedRouter path="/articles/:id" component={Article} />
      <Route
        path="*"
        render={() => {
          return <h1 style={{ textAlign: "center" }}>404 Page Not Found</h1>;
        }}
      />
    </Switch>
  );
};

export default App;
