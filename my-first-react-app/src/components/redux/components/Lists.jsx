import React, { Component } from "react";
import { connect } from "react-redux";
import "./lists.scss";

import { increment, decrement ,incrementBigAsync} from "../action";

class Lists extends Component {
  render() {

    return (
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() => this.props.decrement(item.id)}
                >
                  -
                </button>
                {item.amount}
                {/* 注意区分 上下两种方法 */}
                <button onClick={  this.props.increment.bind(this,item.id)} >+</button>
               
              </td>
              <td>异步加 <button onClick={  this.props.incrementBigAsync.bind(this,item.id)} >+</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.carList
  };
};


/**官方写法
const mapDispatchToProps = dispatch => {
  return {
    increment: id => {
      dispatch(increment(id));
    },
    decrement: id => {
      dispatch(decrement(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lists);


*/
//默认会自动dispatch{}对象写法
export default connect(mapStateToProps, {increment,decrement,incrementBigAsync})(Lists);