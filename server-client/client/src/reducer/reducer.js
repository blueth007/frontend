import { SelectFilters } from '../action/action'
import { combineReducers } from 'redux'


const initlists = [
    {
        "id": 0,
        "sku": 8552515751438644,
        "title": "Cat Tee Black T-Shirt",
        "description": "14/15 s/nº",
        "availableSizes": [
            "X",
            "L",
            "XL",
            "XXL"
        ],
        "style": "Branco com listras pretas",
        "price": 10.9,
        "installments": 9,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },
    {
        "id": 1,
        "sku": 18644119330491312,
        "title": "Sphynx Tie Dye Grey T-Shirt",
        "description": "14/15 s/nº",
        "availableSizes": [
            "X",
            "L",
            "XL",
            "XXL"
        ],
        "style": "Preta com listras brancas",
        "price": 10.9,
        "installments": 9,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },
    {
        "id": 2,
        "sku": 10686354557628303,
        "title": "Sphynx Tie Dye Wine T-Shirt",
        "description": "GPX Poly 1",
        "availableSizes": [
            "X",
            "L",
            "XL"
        ],
        "style": "Front tie dye print",
        "price": 9.0,
        "installments": 3,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },
    {
        "id": 15,
        "sku": 11033926921508487,
        "title": "Skuul",
        "description": "Treino 2014",
        "availableSizes": [
            "X",
            "L",
            "XL",
            "XXL"
        ],
        "style": "Black T-Shirt with front print",
        "price": 14.0,
        "installments": 5,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },
    {
        "id": 21,
        "sku": 12064273040195392,
        "title": "Cat Tee Black T-Shirt",
        "description": "4 MSL",
        "availableSizes": [
            "S",
            "XS"
        ],
        "style": "Black with custom print",
        "price": 10.9,
        "installments": 9,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },
    {
        "id": 13,
        "sku": 51498472915966366,
        "title": "Dark Thug Blue-Navy T-Shirt",
        "description": "",
        "availableSizes": [
            "M"
        ],
        "style": "Front print and paisley print",
        "price": 29.45,
        "installments": 5,
        "currencyId": "USD",
        "currencyFormat": "$",
        "isFreeShipping": true
    },

]


// const initStore={
//     filterSize:[],
//     orderBy:SelectFilters.SELECT,
//     lists
// }


function setfilterSize(state = [], action) {

    switch (action.type) {
        case "SELECTSIZE":
            state = action.filterSize
            return state
        default: return state
    }

}



function setFilterOrderBy(state = SelectFilters.SELECT, action) {
    console.log("SelectFilters: ", state, action.type)
    switch (action.type) {
        case SelectFilters.SELECT:
            return action.orderBy
        case SelectFilters.HIGHESTPRICE:
            return action.orderBy
        case SelectFilters.LOWESTPRICE:
            return action.orderBy
        default: return state;

    }
}

function getlists(state = initlists, action) {
    switch (action.type) {
        case "GETDATA":
            return initlists;
        default: return state
    }
}

const setlists = (state = initlists, action) => {
    console.log("Lists: ", state, action.type);
    const newState = state.concat();  //返回新的数组
    switch (action.type) {
        case SelectFilters.SELECT:
            return newState.sort((a, b) => a.id - b.id)
        case SelectFilters.HIGHESTPRICE:
            return newState.sort((a, b) => b.price - a.price)
        case SelectFilters.LOWESTPRICE:
            return newState.sort((a, b) => a.price - b.price)
        default: return newState;
    }
}


const cartList = (state = [], action) => {

    switch (action.type) {
        case "ADD_CART":
            var newState = [...state];
            if (newState.findIndex(it => it.id === action.payload.id) == -1) {
                newState.push(action.payload)
                console.log(newState)
                return newState;
            }
        case "DEC_CART":
            var newState = [...state];
           const index=newState.findIndex(it=>it.id===action.payload);
           newState.splice(index,1);
           return newState;
        default: return state;
    }
}




const todoApp = combineReducers({
    setfilterSize,
    setFilterOrderBy,
    lists: setlists,
    cartList
})





export default todoApp

