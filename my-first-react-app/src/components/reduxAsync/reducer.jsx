import { combineReducers } from "redux";

const initState = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
];
const status = {
  isLoading: false
};

const reducerBlogList = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_LISTS_START":
      return [];
    case "FETCH_LISTS_SUCCESS":
      return action.data;
    case "FETCH_LISTS_FAILED":
        return ['failed']
    default:
      return state;
  }
};
const statusBlog = (state = status, action) => {
  switch (action.type) {
    case "FETCH_LISTS_START":
        return {
            isLoading: true
          };
    case "FETCH_LISTS_SUCCESS":
      return {
        isLoading: true
      };
    case "FETCH_LISTS_FAILED":
       return {
        isLoading: false
      }; 
    default:
      return state;
  }
};

export default combineReducers({
  reducerBlogList,
  statusBlog
});
