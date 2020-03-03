import React, { Component } from 'react'

export default class componentName extends Component {
  componentDidMount() {
    fetch('http://127.0.0.1:3030/api', {
      method: 'GET'
      // mode: 'no-cors'
      //dataType: 'json'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return <div>fetch</div>
  }
}
