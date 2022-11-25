import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { styled, Stack, Box, Container, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CatalogTourCard, CatalogMainSection, CatalogMainFilter } from '../../features/Catalogue/components';
import getProducts from '../../api/getProducts';
import { setProducts } from '../../store/slices/catalogueSlice';
import scrollToTop from '../../layout/utils/scrollToTop';

const FilterContainer = styled((props) => <Grid item xs={12} {...props} />)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: 10,
  boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.05)',
  padding: '25px 0',
  height: 'fit-content',

  [theme.breakpoints.up('laptop')]: {
    width: 295,
    order: '-1',
  },
}));

const CataloguePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const products = useSelector((state) => state.catalogueReducer.products, shallowEqual);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  let lastItemIndex = currentPage * countriesPerPage;
  let firstItemIndex = lastItemIndex - countriesPerPage;
  let currentItems = products.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getProducts();
      dispatch(setProducts(data));
      setLoading(false);
    };
    if (products.length > 0) {
      setLoading(false);
    } else {
      getData();
    }
  }, []);

  return (
    <>
      {loading === false ? (
        <Box sx={{ backgroundColor: '#EDEDED', paddingBottom: '150px' }}>
          <CatalogMainSection />
          <Container>
            <Grid container sx={{ mt: '60px', gap: '40px' }}>
              <Grid item xs={12} laptop sx={{ p: 0 }}>
                <Typography variant="h2" sx={{ textTransform: 'uppercase', mb: '25px' }}>
                  Tours
                </Typography>
                <Stack spacing={2}>
                  {currentItems.map(({ name, currentPrice, duration, description, imageUrls, _id }) => (
                    <CatalogTourCard
                      key={_id}
                      name={name}
                      description={description}
                      currentPrice={currentPrice}
                      duration={duration}
                      imageUrls={imageUrls}
                    />
                  ))}
                </Stack>
              </Grid>
              <FilterContainer>
                <CatalogMainFilter />
              </FilterContainer>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: '50px' }}>
              <Pagination
                hidePrevButton
                hideNextButton
                count={Math.round(products.length / 10)}
                color="primary"
                page={currentPage}
                onChange={(_, num) => {
                  setCurrentPage(num);
                  lastItemIndex = currentPage * countriesPerPage;
                  firstItemIndex = lastItemIndex - countriesPerPage;
                  currentItems = products.slice(firstItemIndex, lastItemIndex);
                  scrollToTop();
                }}
              />
            </Box>
          </Container>
        </Box>
      ) : (
        <Typography variant="h2" sx={{ paddingTop: '400px', paddingBottom: '400px', textAlign: 'center' }}>
          Loading...
        </Typography>
      )}
      {}
    </>
  );
};

export default CataloguePage;
