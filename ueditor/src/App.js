import React, { Component } from 'react'
import Ueditor from './Ueditor/ueditor'
 
export default class App extends Component {

  state = {
    content: "<p>这是初始化内容</p>"
  }

  componentDidMount() {

    setTimeout(() => {
      console.log("DS");

      this.setState({
        content: "<p>异步获取到的值进行重新传递,需要子组件shouldComponentUpdate(nextPops){判断更新}</p>"
      })



    }, 5000)


  }
handleGetContent=(text)=>{
  console.log("GET:" ,text)
}



  render() {
    return (
      <div style={{ width: "800px" }}>
        <Ueditor id={"myEditor"} content={this.state.content} onGetContent={this.handleGetContent}/>

        <hr/>
         
      </div>
    )
  }
}
