import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Paper, CircularProgress, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../../../../store/slices/userSlice/userSlice';
import { Order } from '..';

const preloaderSX = {
  display: 'block',
  m: '15% auto',
  width: '100px !important',
  height: '100px !important',
};

const OrderListSX = {
  listStyleType: 'none',
  p: '5%',
  overflowY: 'scroll',
  height: 'auto',
  maxHeight: '450px',
  borderRadius: '20px',
};

const emptyOrderListSX = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '20px',
};

const emptyOrderListMessageSX = {
  pt: { xs: '20px', tablet: '40px', desktop: '60px' },
  fontSize: { xs: '16px', tablet: '24px' },
};

const UserOrders = () => {
  const { orders, ordersError, isOrdersLoading } = useSelector((store) => store.userReducer, shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const handleClick = () => {
    navigate('/catalogue');
  };

  const emptyOrderList = (
    <Paper sx={emptyOrderListSX}>
      <Typography variant="h2" sx={emptyOrderListMessageSX}>
        You don&apos;t have orders yet!
      </Typography>

      <Button onClick={handleClick} sx={{ m: '10%' }}>
        Catalogue
      </Button>
    </Paper>
  );

  const orderList = (
    <Paper component="ul" sx={OrderListSX}>
      {orders &&
        orders.map(({ date, orderNo, products, totalSum }) => (
          <Order totalSum={totalSum} products={products} key={orderNo} date={date.split('T')[0]} orderNo={orderNo} />
        ))}
    </Paper>
  );

  if (orders) return orders.length === 0 ? emptyOrderList : orderList;

  return (
    <>
      {isOrdersLoading && <CircularProgress sx={preloaderSX} />}
      {ordersError && <Typography>{ordersError}</Typography>}
    </>
  );
};

export default UserOrders;
