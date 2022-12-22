import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Product from '../Product/Product';

const Order = ({ totalSum, orderNo, date, products }) => {
  const productsList = (
    <Box sx={{ marginBottom: 4 }}>
      {products.map(({ product: { name, currentPrice, itemNo, imageUrls, description }, cartQuantity }) => (
        <Product
          name={name}
          currentPrice={currentPrice}
          itemNo={itemNo}
          image={imageUrls[0]}
          cartQuantity={cartQuantity}
          description={description}
          key={itemNo}
        />
      ))}
    </Box>
  );

  const orderInfo = (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Typography>Date: {date}</Typography>
      <Typography>Total price: {totalSum}€</Typography>
    </Box>
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Order №{orderNo}</Typography>
      </AccordionSummary>
      <AccordionDetails>{productsList}</AccordionDetails>
      {orderInfo}
    </Accordion>
  );
};

Order.propTypes = {
  orderNo: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  totalSum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default memo(Order);
