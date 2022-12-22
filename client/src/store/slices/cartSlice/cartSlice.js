/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axiosConfig from '../../../axiosConfig';
import getProduct from '../../../api/getProduct';
import updateCart from '../../../api/updateCart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    isLoading: false,
    count: 0,
  },
  reducers: {
    // the next reducers deals with 2 types of payload type, where array or object, maybe refactoring is needed by splitting reducers and creating a second reducer to deal with local cart data

    // TODO need to check naming schema of all reducer and thunk api functions

    setCart: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.data = action.payload;
      } else {
        const index = state.data.findIndex((item) => item.product._id === action.payload._id);

        if (index === -1) {
          state.data.push({ product: { ...action.payload }, cartQuantity: 1 });
          localStorage.setItem('cart', JSON.stringify(state.data));
        } else {
          state.data[index].cartQuantity += 1;
          // refactor this function, maybe write a function in API folder that writes cart to local storage
          localStorage.setItem('cart', JSON.stringify(state.data));
        }
      }

      state.count = state.data.reduce((total, cur) => total + cur.cartQuantity, 0);
    },

    // the next 2 reducers have repeated code, to be refactored...

    decreaseProductFromLocal: (state, action) => {
      const index = state.data.findIndex((item) => item.product._id === action.payload);
      state.data[index].cartQuantity -= 1;
      state.count -= 1;
      localStorage.setItem('cart', JSON.stringify(state.data));
    },

    delProductFromLocal: (state, action) => {
      const index = state.data.findIndex((item) => item.product._id === action.payload);
      state.data.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.data));
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { setCart, decreaseProductFromLocal, delProductFromLocal, setIsLoading } = cartSlice.actions;

export const fetchCart = (isLogin) => async (dispatch) => {
  if (isLogin) {
    dispatch(setIsLoading(true));
    try {
      const { data, status } = await axiosConfig('/cart');

      if (status === 200 && data) {
        const { products } = data;
        dispatch(setCart(products));
        dispatch(setIsLoading(false));
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      dispatch(setCart(cart));
    }
  }
};

export const deleteCart = () => async (dispatch) => {
  try {
    const { status } = await axiosConfig.delete('/cart');

    if (status === 200) {
      dispatch(setCart([]));
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const addProduct = (itemNo, productId, isLogin) => async (dispatch) => {
  if (isLogin) {
    try {
      const { data, status } = await axiosConfig.put(`/cart/${productId}`);

      if (status === 200) {
        const { products } = data;
        dispatch(setCart(products));
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    const data = await getProduct(itemNo);
    dispatch(setCart(data));
  }
};

export const decreaseQuantity = (id, isLogin) => async (dispatch) => {
  if (isLogin) {
    try {
      const { data, status } = await axiosConfig.delete(`/cart/product/${id}`);
      const { products } = data;

      if (status === 200) {
        dispatch(setCart(products));
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    dispatch(decreaseProductFromLocal(id));
  }
};

export const deleteProduct = (id, isLogin) => async (dispatch) => {
  if (isLogin) {
    try {
      const { data, status } = await axiosConfig.delete(`/cart/${id}`);
      const { products } = data;

      if (status === 200) {
        const { _id } = products[0].product;

        if (products.length === 1 && _id === id) {
          dispatch(deleteCart());
        } else dispatch(setCart(products));
      }
    } catch (err) {
      console.error(err.message);
    }
  } else {
    dispatch(delProductFromLocal(id));
  }
};

export const migrateCart = () => async (dispatch) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    const { products } = await updateCart(cart);
    dispatch(setCart(products));
    localStorage.removeItem('cart');
  }
};
