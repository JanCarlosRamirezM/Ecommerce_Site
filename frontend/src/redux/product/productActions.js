import axios from "axios";
import * as productType from "./productTypes";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productType.ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/v1/products");

    dispatch({
      type: productType.ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: productType.ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = async (dispatch) => {
  dispatch({
    type: productType.CLEAR_ERRORS,
  });
};
