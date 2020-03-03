import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext();

export default class ReactContext extends Component {
  state = {
    count: 0
  };
  handlerIncreament = () => {
    this.setState(prevState => {
      return { count: ++prevState.count };
    });
  };
  handlerdecreament = () => {
    this.setState(prevState => {
      return { count: --prevState.count };
    });
  };

  render() {
    return (
      <div>
        <h3>React Context</h3>
        <Provider
          value={{
            count: this.state.count,
            handlerIncreament: this.handlerIncreament,
            handlerdecreament: this.handlerdecreament
          }}
        >
          <CountBtn type="decreament">-</CountBtn>
          <Counter />
          <CountBtn type="increament">+</CountBtn>
        </Provider>
      </div>
    );
  }
}

function Counter() {
  return <SubItem />;
}

function SubItem() {
  return (
    <Consumer>
      {/* Consumer 的子组件必须是一个函数方法 */}
      {value => {
        return <span>{value.count}</span>;
      }}
    </Consumer>
  );
}

function CountBtn(props) {
  return (
    <Consumer>
      {value => {
        console.log(value);
        const handler =
          props.type === "increament"
            ? value.handlerIncreament
            : value.handlerdecreament;
        return <button onClick={handler}>{props.children}</button>;
      }}
    </Consumer>
  );
}
