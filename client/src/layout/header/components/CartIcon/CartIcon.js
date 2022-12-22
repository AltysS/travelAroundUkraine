import React, { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { fetchCart } from '../../../../store/slices/cartSlice/cartSlice';

const CartIcon = () => {
  const dispatch = useDispatch();

  const count = useSelector((store) => store.cart.count);
  const isLogin = useSelector((store) => store.userReducer.isLogin);

  useEffect(() => {
    dispatch(fetchCart(isLogin));
  }, []);

  return (
    <Badge badgeContent={count} color="secondary">
      <ShoppingCartIcon fontSize="medium" />
    </Badge>
  );
};

export default CartIcon;
