import React from 'react';
import  '@/styles/test.scss'; 
import '@babel/polyfill';
const StaticDiv=()=><div>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>

class Test1 extends React.Component{

    getClock=()=>{
        console.log(new Date());
    }


    render(){
        return(
          <div className="mydiv">
              <h1 className="myh1">this is Component's div</h1>
              <StaticDiv />
          </div>
        )
    }
}

export default Test1;