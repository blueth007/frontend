 
import { createStore,applyMiddleware,compose } from 'redux'
import todoApp from './reducer'
import thunkMiddleware from 'redux-thunk';
import newApp from './newReducer'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
 
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
 
);
 

let store = createStore(
    // todoApp,
    newApp, //改造state版本
    enhancer
      )
export default store