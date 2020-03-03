import React from "react";
import ReactDOM from "react-dom";
// import Test1 from './components/Test1';    
import Test1 from '@/components/Test1';   // @ 是在webpack.a2config中的别名  
 import Clock from "./components/Clock";
import './index.css';
import  './styles/app.scss';// scss 模块化必须使用一个名字来代替对应的scss



import Ali from './images/ali.jpg';


const Mydiv =()=> <div>12312</div>
const App = () => {
    return (
        <div className="myapp">
            <h1 className="myh1">This is React App</h1>
            <p>React here!!</p>
            <div className="imgtest" >
                <img src={Ali} alt="阿离" />
            </div>
            <Test1 />
          
            <Mydiv/>


            <Clock />
    </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById("root"));