import React from "react";

// function TodoItem(props) {
//   console.log("Item Render"); //检查更新次数,每次更改 都会重新渲染整个ul的所有li,通过shouldcomponentupdate来实现哪些更新和不更新
//   return (
//     <li onClick={props.changeCompleted.bind(this,props.id)}>
//       <span style={{ textDecoration: props.isCompleted ? "line-through" : "" }}>

//         {props.title}
//       </span>
//       <span >{props.isCompleted ? "完成" : "未完成"}</span>
//     </li>
//   );
// }
 
class TodoItem extends React.Component {
 
shouldComponentUpdate(newPorps,newState){

  return newPorps.isCompleted!==this.props.isCompleted;//渲染更改的单独选项
}
componentDidUpdate(newPorps){
  console.log("this is Rendered: ",this.props.title)
}

  render() {
    const  props =this.props;
    console.log("Item Render")
    return (
       
      <li onClick={props.changeCompleted.bind(this,props.id)}>
        <span
          style={{ 'textDecoration': props.isCompleted ? "line-through" : "" }}
        >
          {props.title}
        </span>
        <span>{props.isCompleted ? "完成" : "未完成"}</span>
      </li>
    );
  }
}

export default function TodoContent(props) {
  return (
    <ul>
      {props.todos.map(todo => (
        <TodoItem
          {...todo}
          key={todo.id}
          changeCompleted={props.changeCompleted}
        />
      ))}
    </ul>
  );
} 
