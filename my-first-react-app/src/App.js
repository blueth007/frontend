import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/todoList";
import ReactContext from "./components/context";
import HOComponent from "./components/HOC";
import ReduxComponent from "./components/redux";
import BlogComponent from "./components/reduxAsync";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import NotFound from './components/routers/NotFound'
import Mylist from './components/routers'


function App(props) {
  console.log(props)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <content>
      <ul>
        <li>
          <Link to="/"> 首页</Link>
        </li>
        <li>
          <Link to="/todoList"> TodoList</Link>
        </li>
        <li>
          <Link to="/reactContext"> ReactContext</Link>
        </li>
        <li>
          <Link to="/HOComponent"> HOComponent</Link>
        </li>
        <li>
          <Link to="/ReduxComponent"> ReduxComponent</Link>
        </li>
        <li>
          <Link to={
            {
              pathname: "/BlogComponent",
              state: {
                arguments: [1, 2, 3, 4],  //隐式传参  在props.location 中可以查看
                from: "/home"
              }
            }

          }   > BlogComponent</Link>
        </li>
        <li>
          <Link to="/mylist"> Mylist(:id)</Link>
        </li>
        <li>
          <Link to="/notfound"> 404</Link>
        </li>
      </ul>
      <br />
      <br />

      <Switch>
        <Route path="/" render={() => <div>Home</div>} exact />
        <Route path="/todoList" component={TodoList} />
        <Route path="/reactContext" component={ReactContext} />
        <Route path="/HOComponent" component={HOComponent} />
        <Route path="/ReduxComponent" component={ReduxComponent} />
        <Route
          path="/BlogComponent"
          render={props => {
            return <BlogComponent {...props} newProps={{ new: "newprops" }} />   //; 可以传入新的属性进去
          }}
        />

          <Route path="/mylist" component={Mylist}/>

        <Route path="/notfound" component={NotFound}  />

        <Redirect to="/notfound"    />    { /*沙盒模拟没有问题  实际问题出现了   解决: 需新安装  path-to-regexp@1.17.0  -     */}

      </Switch>
      </content>
    </div>
  );
}

export default App;
