import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import App from "./App";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'
import { mainRouter } from "./routes";

render(
  <ConfigProvider locale={zhCN}>
   <Router>
    <Switch>
      <Route path="/admin" component={App} />
      {mainRouter.map(route => (
        <Route
          key={route.pathname}
          path={route.pathname}
          component={route.component}
          exact={route.exact}
        />
      ))}
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>
</ConfigProvider>
  ,
  document.querySelector("#root")
);
