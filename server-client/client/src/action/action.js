
export const SELECTSIZE = "SELECTSIZE"
export const SELECT = "SELECT";
export const SelectFilters = {
    SELECT: 'SELECT',
    LOWESTPRICE: 'LOWESTPRICE',
    HIGHESTPRICE: 'HIGHESTPRICE'
}

export function selectSize(filterSize = []) {
    return {
        type: SELECTSIZE,
        filterSize
    }
}

export function selectOrderBy(orderBy) {

    return {
        type: SelectFilters[orderBy],
        orderBy
    }
}


export function addCart(item) {
    return {
        type: "ADD_CART",
        payload: item
    }
}

export function decreaseCart(item){
    return {
        type: "DEC_CART",
        payload: item
    }
}

// export function getLists(lists){
//     return{
//         type:"GETDATA",
//         lists
//     }
// }

