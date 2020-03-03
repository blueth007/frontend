import {combineReducers}  from 'redux';
import actionType from '../action/actionType'


const initState=[
    {
        id:1,
        name:"Apple.inc",
        price:"$ 992.22",
        amount:"19"
    },
    {
        id:2,
        name:"Huawei.inc",
        price:"$ 682.66",
        amount:"36"
    },
]



function carList(state=initState,action){
    // console.log("redux",action );
    switch(action.type){
      
         case actionType.ADD_ITEM_AMOUNT:
             return  state.map(it=>{
                if(it.id===action.payload.id){
                     ++it.amount;
                }
                return it;
             })
         case actionType.RED_ITEM_AMOUNT:
             return  state.map(it=>{
                if(it.id===action.payload.id){
                     --it.amount;
                }
                return it;
             })
        default:
            return state;
    }
}


export default combineReducers({
    carList,
})
