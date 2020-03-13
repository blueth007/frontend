import fetch from "cross-fetch";

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

//size 排序
export const checkboxSelect = (checkedList = []) => ({
  type: "SELECTSIZE",
  checkedList
});

//order 排序
export const selectOrder = (order = "SELECT") => ({
  type: SelectFilters[order],
  order
});

export const addToCart = item => ({
  type: PUSH_CART,
  item
});
export const deleteToCart = item => ({
  type: PULL_CART,
  item
});

export const increase = payload => ({
  type: INCREASE_QUANTITY,
  payload
});
export const decrease = payload => ({
  type: DECREASE_QUANTITY,
  payload
});

//刷新
export function invalidatelist(list) {
  return {
    type: INVALIDATE_LIST,
    list
  };
}

export function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

export function receivePosts(data) {
  return {
    type: RECEIVE_POSTS,
    lists: data.products,
    receivedAt: Date.now()
  };
}
const fetchFailed = error => {
  return {
    type: FAILED_POSTS,
    error
  };
};

function shouldFetchPosts(state) {
  console.log(state);
  return true;
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    // return fetch("../reducer/productions.json")
    return fetch(
      "http://rap2.taobao.org:38080/app/mock/232073/example/products"
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.code === "200") {
          setTimeout(
            //延迟 spinner
            () => dispatch(receivePosts(data)),
            3000
          );
        }
      })
      .catch(err => dispatch(fetchFailed(err)));
  };
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
}

export const sortArr = (lists, filterOrder) => {
  /**  数组排序不能引起 数组变化而改变state */
  switch (filterOrder) {
    case SelectFilters.SELECT:
      return lists.sort((a, b) => a.id - b.id);
    // lists.sort((a, b) => a.id - b.id);
    // break;
    case SelectFilters.HIGHESTPRICE:
      return lists.sort((a, b) => b.price - a.price);
    // lists.sort((a, b) => b.price - a.price);
    // break;
    case SelectFilters.LOWESTPRICE:
      // lists.sort((a, b) => a.price - b.price);
      return lists.sort((a, b) => a.price - b.price);
    // break;
    default:
      // lists.sort((a, b) => a.id - b.id);
      return lists;
  }
};

//判断数组含有相同元素
function isGetSameValue(a, b) {
  var c = a.concat(b);
  //2个数组过滤后不等元素组长度 证明含有相同的元素,选
  return (
    c.filter((m, index) => c.indexOf(m) === index).length !==
    a.length + b.length
  );
}

//过滤数组
export const filterLsits = (state, filterSize) => {
  var arr = state;

  if (filterSize.length > 0)
    arr = state.filter(it => isGetSameValue(it.availableSizes, filterSize));

  return arr;
};
