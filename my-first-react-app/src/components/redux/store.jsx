import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk"; //引入中间件
import rootReducer from "./reducers";

export default createStore(rootReducer, applyMiddleware(thunk));
