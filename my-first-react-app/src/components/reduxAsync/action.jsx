import { getData } from "./service";
export const loading = () => ({
  type: "LOADING......."
});

const getDataStart = () => ({
  type: "FETCH_LISTS_START"
});

const getDataFailed = () => ({
  type: "FETCH_LISTS_FAILED"
});

const getDataSuccess = data => ({
  type: "FETCH_LISTS_SUCCESS",
  data
});

export const getDataAsync = () => dispatch => {
  dispatch(getDataStart());
  getData()
    .then(data => {
      const part = data.slice(90);
      console.log(part);
      dispatch(getDataSuccess(part));
    })
    .catch(error => {
      console.log(error);
      dispatch(getDataFailed());
    });
};
