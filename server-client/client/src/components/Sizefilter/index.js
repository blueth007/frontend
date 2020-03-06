import React, { Component } from 'react'
import "./index.scss"


const size = ["XS","S", "M","ML", "L", "XL", "XXL"]
export default class Filter extends Component {
    render() {
        return (
            <div className="sizeFilter">
                <h2>Size:</h2>
              {
                  size.map(a=><LabelCheckbox value={a} key={a}/>)
              }

            </div>
        )
    }
}





function LabelCheckbox(props) {
    // console.log(props)
    return (
        <div className="labeldiv">
            <label >
                <input type="checkbox" value={props.value} />
                <span className="checkmark">{props.value} </span>
            </label>
        </div>
    )
}
