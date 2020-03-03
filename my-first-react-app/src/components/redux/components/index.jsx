import React, { Component } from 'react'
import Lists from './Lists'

export default class Tables extends Component {
    render() {
         console.log(this.props)
        return (
            <div>
                <Lists/>
            </div>
        )
    }
}




