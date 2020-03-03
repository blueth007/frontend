import { withRouter, Link, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

class MyList extends Component {
  render() {
    return (
      <div>
          <h3>MyList 根据id跳转</h3>
        <ul>
          <li>
            <Link to="/mylist/1">mylist1</Link>
          </li>
          <li>
            <Link to="/mylist/2">mylist2</Link>
          </li>
        </ul>
        <Switch>
          <Route
            path="/mylist/:id"
            render={props => {
              return <div>thiis is my list: {props.match.params.id}</div>;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MyList);
