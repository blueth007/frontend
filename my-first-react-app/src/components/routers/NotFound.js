import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

export default class NotFound extends Component {
    goBack=()=>{
      //  this.props.history.push("/");
        this.props.history.push({
            pathname:"/",
            state:{
                args:"返回参数404"
            }
        });
    }
    render() {
        console.log(this.props)//  只有Route直接渲染的组件才有 history等属性
        return (
            <div>
           <h3> 404  </h3>  
           <button onClick={this.goBack}>返回首页</button>


           <ButtonBack />
            </div>
        )
    }
}

 



 

  class ButtonBack extends Component {
    goBack=()=>{
        //  this.props.history.push("/");
          this.props.history.push({
              pathname:"/",
              state:{
                  args:"返回参数404 withrouter"
              }
          });
      }
    render() {
        return (
           <div>
               <p> withRouter 高阶组件包含子组件,使子组件具有route等信息</p>
              <button onClick={this.goBack}>子组件返回(带route信息的)</button>
           </div>
        )
    }
}

ButtonBack=withRouter(ButtonBack);
