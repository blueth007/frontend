import React, { Component } from "react";
import TodoContent from "./TodoContent";
import "./todolist.scss";

export default class TodoList extends Component {
  static defaultProps = {
    todos: [
      {
        id: 1,
        title: "First Events",
        isCompleted: false
      },
      {
        id: 2,
        title: "Second Events",
        isCompleted: true
      },
      {
        id: 3,
        title: "Third Events",
        isCompleted: true
      },
      {
        id: 4,
        title: "Fourth Events",
        isCompleted: false
      }
    ]
  };
  state = {
    todos: this.props.todos
  };





  handleAdd = () => {
    //服务器连接时候需post到服务器 然后获取服务器给的值再进行setState.
    var input = this.refs.todoItem;

    if (input.value === "") return;
    // console.log(input.value);
    this.setState(
      prevState => {
        return {
          todos: [
            ...prevState.todos,
            {
              id: prevState.todos.length + 1,
              title: input.value,
              isCompleted: false
            }
          ]
        };
      },
      () => {
        input.value = "";
        input.focus();
      }
    );
  };


handlerChangeCompleted=(id)=>{
    // console.log(id);
    this.setState(prevState=>{
        prevState.todos[id-1].isCompleted=!prevState.todos[id-1].isCompleted;
        return{
             todos:prevState.todos,
        }
    })
}


  /*********** 渲染组件 ******/
  render() {
    console.log("Component Redner")
    return (
      <div className="todolist">
        <h1>待办事项</h1>
        <input type="text" ref="todoItem" />
        <button onClick={this.handleAdd}>Add</button>
        <TodoContent todos={this.state.todos}  changeCompleted={this.handlerChangeCompleted.bind(this)} />
      </div>
    );
  }
}
