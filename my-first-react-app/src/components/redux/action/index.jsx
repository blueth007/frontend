import actionType from "./actionType";

//action  创建函数, 确定一个action 对应改变一个值

export const increment = id => {
    return {
        type: actionType.ADD_ITEM_AMOUNT,
        payload: {
            id //需要修改的id
        }
    };
};

export const decrement = id => {
    return {
        type: actionType.RED_ITEM_AMOUNT,
        payload: {
            id //需要修改的id
        }
    };
};

//异步处理

// export const incrementBigAsync = id => {
//   return dispatch => {
//     setTimeout(   //注意防抖
//      ()=> dispatch({
//         type: "ADD_ITEM_AMOUNT",   //或者其他方法 在reducer中修改
//         payload: {
//           id
//         }
//       }),
//       2000
//     );
//   };
// };

//等价代码 ===>

export const incrementBigAsync = id => dispatch => {
    setTimeout(() => dispatch(increment(id)), 2000);
};
