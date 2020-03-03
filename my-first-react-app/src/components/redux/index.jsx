import React, { Component } from 'react';
import{ Provider} from 'react-redux'
import TableList from './components'


import store from './store';
window.store=store;
 


export default class ReduxComponent extends Component {
    render() {
        return (
        <Provider store={store}>
              <TableList/>
        </Provider>
        )
    }
}
