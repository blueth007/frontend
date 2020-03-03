import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import blogReducer from './reducer';


export default createStore(blogReducer,applyMiddleware(thunk));