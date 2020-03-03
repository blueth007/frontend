import React, { Component } from 'react'
import { getAlldata } from '../config'
export default class componentName extends Component {
  componentDidMount() {
    getAlldata('products')
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  render() {
    return <div>fetch</div>
  }
}
