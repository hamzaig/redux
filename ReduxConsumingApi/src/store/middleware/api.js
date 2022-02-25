const { default: axios } = require("axios");
import * as actions from "../api";

export const api = ({ dispatch }) => next => async action => {
  // console.log();
  if (action.type !== actions.apiCallBegan.type) {
    return next(action);
  }
  const { url, method, data, onSuccess, onError, onRequest } = action.payload;
  if (onRequest) dispatch({ type: onRequest });
  next(action);
  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data))
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
}

