import React, { Component } from 'react';
import {Provider} from 'react-redux';

import BlogList from './BlogList'
import store from './store'



export default class Blog extends Component {
    render() {
        console.log(this.props)
        return (
           <Provider store ={store}> 
           <h3>BlogList</h3>
               <BlogList/>
           </Provider>
        )
    }
}
