import React, { Component } from "react";

export default class MyContent extends Component {
  render() {
    return (
      <div>
        <Content title="this is title" />
        <NewContetn />
        <NewContetn2 />
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.name && this.props.name}</p>
      </div>
    );
  }
}

//高阶组件新增属性和扩展新子组件
const WithHocomponent = WrappedComponent => {
  const hocComponent = ({ ...props }) => (
    <WrappedComponent {...props} name="withHoc" />
  );

  return hocComponent;
};

const WithHocomponent2 = WrappedComponent => {
    const hocComponent = ({ ...props }) => (
    <>
      <WrappedComponent {...props}  />
      <h2>this is new paragph  add..........</h2>
    </>
    );
  
    return hocComponent;
  };
  


const NewContetn = WithHocomponent(Content);
const NewContetn2 = WithHocomponent2(Content);
