import fetch from 'cross-fetch'

export const SELECTSIZE = "SELECTSIZE";
export const SelectFilters = {
    SELECT: "SELECT",
    LOWESTPRICE: "LOWESTPRICE",
    HIGHESTPRICE: "HIGHESTPRICE"
};

export const PUSH_CART = " PUSH_CART"; //添加到购物车
export const PULL_CART = " PULL_CART"; //删除从购物车

//增删数量
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

//数据请求
export const REQUEST_POSTS = "REQUEST_POSTS"; //请求
export const RECEIVE_POSTS = "RECEIVE_POSTS"; //接收
export const INVALIDATE_LIST = "INVALIDATE_LIST"; //刷新
export const FAILED_POSTS = "FAILED_POSTS"; //刷新



export const selectSize = (checked) => ({
    type: SELECTSIZE,
    checked // 返回数据[ "M","SL"]
})

export const selectFilter = (filter) => ({
    type: SelectFilters[filter],
    filter   //"SELECT"
})

function formatData(products) {
    var items = {},
        availableSizes = {},
        sortOrder = [];
    products.map(it => {
        sortOrder.push(it.id);
        availableSizes[it.id] = it.availableSizes;
        items[it.id] = it;
        items[it.id].availableSizes = it.id;
    })
 
    return {
        items,
        availableSizes,
        sortOrder
    }
}


const fetchQuest = () => ({
    type: REQUEST_POSTS
})
const fetchCompleted = (json) => ({
    type: RECEIVE_POSTS,
    products: formatData(json.products)
})
const fetchFailed = (err) => ({
    type: FAILED_POSTS,
    err
})


export const fetchData = () => {
    return dispatch => {
        dispatch(fetchQuest());
        // return fetch("../reducer/productions.json")
        return fetch("http://rap2.taobao.org:38080/app/mock/232073/example/products")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.code === "200") {
                    setTimeout(  //延迟 spinner
                        () => dispatch(fetchCompleted(data))
                        , 3000
                    )
                }

            })
            .catch(err => dispatch(fetchFailed(err)));
    };
}

export const addToCart = actionId => ({
    type: PUSH_CART,
    actionId
  });
export const deleteToCart = actionId => ({
    type: PULL_CART,
    actionId
  });

  export const  increase=(actionId)=>{
      return{
        type:INCREASE_QUANTITY,
        actionId
      }
  }
  
  
  export const  decrease=(actionId)=>{
      return{
         type:DECREASE_QUANTITY ,
         actionId
      }
  }



//判断数组含有相同元素
 export function isGetSameValue(a, b) {
    var c = a.concat(b);
    //2个数组过滤后不等元素组长度 证明含有相同的元素,选
    return (
      c.filter((m, index) => c.indexOf(m) === index).length !==
      a.length + b.length
    )||a.length===0||b.length===0;
  }
  
  //过滤数组
  export const filterLsits = (state, filterSize) => {
    var arr = state;
  
    if (filterSize.length > 0)
      arr = state.filter(it => isGetSameValue(it.availableSizes, filterSize));
  
    return arr;
  };
  