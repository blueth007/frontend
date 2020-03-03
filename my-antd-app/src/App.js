import React, { Component } from "react";
 
import { adminRouter } from "./routes";
import { Switch, Route, Redirect } from "react-router-dom";

import Frame from './components/Frame';

import './App.less' 

export default class App extends Component {
  render() {
    return (
      <Frame menus={adminRouter.filter(item=>item.isNav)}>
        <Switch>
          {adminRouter.map(route => (
            <Route
              key={route.pathname}
              path={route.pathname}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Redirect to={adminRouter[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
    );
  }
}
