import * as productType from "./productTypes";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productType.ALL_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case productType.ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
      };

    case productType.ALL_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case productType.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
