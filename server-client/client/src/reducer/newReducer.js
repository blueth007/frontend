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
} from "../action/newAction";
import {
    combineReducers
} from "redux";

/*****     重新定义 store   ************/

const initState = {
    checkedSize: [],
    orderSelect: "SELECT",
    products: {
        isFetching: false,
        items: {
            "12": {
                id: 12,
                sku: 12064273040195392,
                title: "Cat Tee Black T-Shirt",
                description: "4 MSL",
                availableSizes: 12,
                style: "Black with custom print",
                price: 10.9,
                installments: 9,
                currencyId: "USD",
                currencyFormat: "$",
                isFreeShipping: true
            },
            "11": {
                id: 11,
                sku: 12064273040195392,
                title: "Cat Tee Black T-Shirt",
                description: "4 MSL",
                availableSizes: 11,
                style: "Black with custom print",
                price: 10.9,
                installments: 9,
                currencyId: "USD",
                currencyFormat: "$",
                isFreeShipping: true
            }
        },
        availableSizes: {
            "12": ["S", "XS"],
            "11": ["L", "XL"]
        },
        sortOrder: [12, 13, 1, 14]
    },
    cart: {
        "12": {
            quantity: 1
        },
        "1": {
            quantity: 1
        }
    }
};

const checkedSize = (state = [], action) => {
    switch (action.type) {
        case SELECTSIZE:
            return action.checked;
        default:
            return state;
    }
};

const orderSelect = (state = SelectFilters.SELECT, action) => {
    switch (action.type) {
        case SelectFilters.SELECT:
            return action.filter;
        case SelectFilters.LOWESTPRICE:
            return action.filter;
        case SelectFilters.HIGHESTPRICE:
            return action.filter;
        default:
            return state;
    }
};

function posts(
    state = {
        isFetching: false,
        items: {},
        availableSizes: {},
        sortOrder: []
    },
    action
) {
    switch (action.type) {
        case INVALIDATE_LIST:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_POSTS:
            return Object.assign({},
                state, {
                    isFetching: false
                }, {
                    ...action.products
                }
            );
        default:
            return state;
    }
}

const products = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_LIST:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return Object.assign({}, state, posts(state, action));

        default:
            return state;
    }
};

const shopCart = (state = {}, action) => {
    switch (action.type) {
        case PUSH_CART:
            return Object.assign({}, state, {
                [action.actionId]: {
                    quantity: 1
                }
            });
        case PULL_CART:
            var newState = {
                ...state
            }
            delete newState[action.actionId]
            return newState;

        case INCREASE_QUANTITY:
            var newState = {
                    ...state
                }
                ++newState[action.actionId].quantity
            return newState;
            /*
            Object.assign({}, state, {
                     [action.actionId]: {
                         quantity: ++state[action.actionId].quantity
                     }
                 });
            */
        case DECREASE_QUANTITY:
            return Object.assign({}, state, {
                [action.actionId]: {
                    quantity: --state[action.actionId].quantity > 1 ? state[action.actionId].quantity : 1
                }
            });
        default:
            return state;
    }
};

export default combineReducers({
    checkedSize,
    orderSelect,
    products,
    shopCart
});