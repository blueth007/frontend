import {
    SelectFilters,
    SELECTSIZE,
    PULL_CART,
    PUSH_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    INVALIDATE_LIST, //刷新
    REQUEST_POSTS, //请求
    RECEIVE_POSTS, //获取
    FAILED_POSTS
} from "../action/action";
import { combineReducers } from "redux";

function posts(
    state = {
        isFetching: false,
        products: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_LIST:
            return state;
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_POSTS:
            // console.log(action)
            return Object.assign({}, state, {
                isFetching: false,
                products: action.lists
            });
        case FAILED_POSTS:
            console.log(action.err);
            return state;
        default:
            return state;
    }
}

const lists = (state = {}, action) => {
    //在products 判断state格式
    switch (action.type) {
        case INVALIDATE_LIST:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, posts(state, action));

        default:
            return state;
    }
};
const checkedSize = (state = [], action) => {
    switch (action.type) {
        case SELECTSIZE:
            return action.checkedList;
        default:
            return state;
    }
};

const selectByOrder = (state = SelectFilters.SELECT, action) => {
    switch (action.type) {
        case SelectFilters.SELECT:
            return action.order;
        case SelectFilters.LOWESTPRICE:
            return action.order;
        case SelectFilters.HIGHESTPRICE:
            return action.order;
        default:
            return state;
    }
};

const cartLists = (state = [], action) => {
    var newState = [...state];
    switch (action.type) {
        case PUSH_CART:
            const index = state.findIndex(a => a.id === action.item.id);

            if (index === -1) {
                action.item.quantity = 1;
                newState.push(action.item);
            }

            return newState;
        case PULL_CART:
            return newState.filter(it => it.id !== action.item);
        case INCREASE_QUANTITY:
            return newState.map(it => {
                if (it.id === action.payload) {
                    ++it.quantity;
                }
                return it;
            });
        case DECREASE_QUANTITY:
            return newState.map(it => {
                if (it.id === action.payload) {
                    it.quantity = --it.quantity < 1 ? 1 : it.quantity;
                }
                return it;
            });

        default:
            return state;
    }
};

export default combineReducers({
    selectByOrder,
    checkedSize,
    lists,
    cartLists
});



