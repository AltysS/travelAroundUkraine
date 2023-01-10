/* eslint-disable no-unneeded-ternary */
import {
  alpha,
  Box,
  Button,
  Container,
  Dialog,
  Link,
  Slide,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

// React
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTour } from '../../store/slices/tourSlice/tourSlice';

import { TourAccordion, TourInfoDialog, TourReasonToChoose, ImageGallery } from '../../features/Tour/components';

const sections = [
  { title: 'About tour', link: '#about-tour' },
  { title: 'Reasons to choose', link: '#reasons-to-choose' },
];

// TODO: make dates come from server instead of placeholders
const dates = { beginDate: new Date('2022-02-01'), endDate: new Date('2022-02-25') };

const HeaderContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('laptop')]: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Nav = styled('nav')(({ theme }) => ({
  paddingBlock: '15px',

  [theme.breakpoints.up('laptop')]: {
    paddingTop: '40px',
  },
}));

const NavLink = styled((props) => <Link variant="body1" underline="none" {...props} />)(({ theme }) => ({
  color: alpha(theme.palette.text.primary, 0.5),

  transition: theme.transitions.create('color'),

  '&:hover': {
    color: theme.palette.text.primary,
  },

  [theme.breakpoints.up('tablet')]: {
    fontSize: '16px',
  },
}));

const LinksWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px',

  [theme.breakpoints.up('tablet')]: {
    justifyContent: 'center',
    gap: '40px',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  paddingBlock: '10px',
  marginBottom: '150px',

  [theme.breakpoints.up('laptop')]: {
    paddingBlock: '40px',
  },
}));

const ContentWrapper = styled(Stack)({
  flexDirection: 'row',
  gap: '20px',
});

const Section = styled(Box)({
  scrollMarginTop: '20px',
});

const MobileDialogWrapper = styled(Box)(({ theme }) => ({
  paddingBlock: '10px',
  borderBlock: `1px solid ${theme.palette.divider}`,
}));

const Cost = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: 0,
  fontSize: 25,
  lineHeight: 1,
  color: theme.palette.primary.main,
}));

const FloatingDialog = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  left: 0,
  bottom: 0,
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#fff',
  paddingBlock: '15px',
  zIndex: '1',
}));

const TourPage = () => {
  const matchesMediaQuery = useMediaQuery('(min-width: 1051px)');

  const [isOpen, setIsOpen] = useState(false);

  const [dialogRef, inView, entry] = useInView({ root: null, rootMargin: '0px', threshold: 0.1 });

  // checks if dialog is in view and has positive y coordinate
  const shouldBeVisible = !inView && entry?.boundingClientRect.y > 0;

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  const dispatch = useDispatch();
  const { itemNo } = useParams();
  // to be revised in future from re rendering and optimizing point of view, whether we pass needed data as props to components or useSelector directly in each component.
  const {
    imageUrls,
    name,
    description,
    reasons,
    professionalGuide,
    accommodation,
    meals,
    transferAlongTheRoute,
    travelInsurance,
    departs,
    duration,
    returns,
    currentPrice,
    region,
    categories,
    season,
    _id,
  } = useSelector((store) => store.tour.data);

  const error = useSelector((store) => store.tour.error);

  useEffect(() => {
    dispatch(fetchTour(itemNo));
  }, []);

  // components saved into constants
  const asideTourInfoDialog = (
    <Box component="aside" sx={{ maxWidth: '370px', width: '100%' }}>
      <TourInfoDialog
        dates={dates}
        professionalGuide={professionalGuide}
        accommodation={accommodation}
        meals={meals}
        transferAlongTheRoute={transferAlongTheRoute}
        travelInsurance={travelInsurance}
        departs={departs}
        duration={duration}
        returns={returns}
        currentPrice={currentPrice}
        id={_id}
        itemNo={itemNo}
      />
    </Box>
  );

  const mobileTourInfoDialog = (
    <MobileDialogWrapper ref={dialogRef}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Cost>€{currentPrice}</Cost>
        <Button sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
          More info
        </Button>
      </Stack>
      <Dialog open={isOpen} onClose={handleCloseDialog} hideBackdrop fullScreen>
        <TourInfoDialog
          dates={dates}
          professionalGuide={professionalGuide}
          accommodation={accommodation}
          meals={meals}
          transferAlongTheRoute={transferAlongTheRoute}
          travelInsurance={travelInsurance}
          departs={departs}
          duration={duration}
          returns={returns}
          currentPrice={currentPrice}
          id={_id}
          itemNo={itemNo}
          closeButton
          handleClose={handleCloseDialog}
        />
      </Dialog>
    </MobileDialogWrapper>
  );

  const slideInfoBar = (
    <Slide in={shouldBeVisible} direction="up" mountOnEnter unmountOnExit>
      <FloatingDialog>
        <Container>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Cost>€{currentPrice}</Cost>
            <Button sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
              More info
            </Button>
          </Stack>
        </Container>
      </FloatingDialog>
    </Slide>
  );

  let reasonsToChooseArr;

  if (reasons) {
    reasonsToChooseArr = reasons.map((item, index) => (
      <TourReasonToChoose description={item} number={index + 1} key={item} />
    ));
  }

  return (
    <>
      <HeaderContent>
        <Container>
          <Typography
            align="center"
            variant="h1"
            mt={17}
            mb={5}
            fontSize="50px"
            sx={{
              ':first-letter': {
                textTransform: 'capitalize',
              },
            }}
          >
            {/* temporary UI which will revised after tour page refactor pull request is approved */}
            {error ? error : name}
          </Typography>
          <Stack direction="row" justifyContent="center" alignItems="center" mb={3}>
            <Typography>{season} / </Typography>
            <Typography>{region} / </Typography>
            <Typography>{categories}</Typography>
          </Stack>
          <ImageGallery imageUrls={imageUrls} />
          <Nav>
            <LinksWrapper>
              {sections.map(({ title, link }) => (
                <NavLink key={title} href={link}>
                  {title}
                </NavLink>
              ))}
            </LinksWrapper>
          </Nav>
        </Container>
      </HeaderContent>

      <MainContent>
        <Container>
          <ContentWrapper>
            {matchesMediaQuery ? asideTourInfoDialog : null}

            <Box sx={{ flex: 1 }}>
              <Section id="about-tour">
                <Typography variant="h2">About tour</Typography>
                <Box sx={{ paddingBottom: 3 }}>
                  <Typography>{description}</Typography>
                </Box>
              </Section>

              <Section id="reasons-to-choose">
                <TourAccordion id="reasons-to-choose" title="Reasons to choose our tour">
                  <Stack direction="row" gap={4} flexWrap="wrap" mt={2} pl={2}>
                    {reasons ? reasonsToChooseArr : null}
                  </Stack>
                </TourAccordion>
              </Section>
            </Box>
          </ContentWrapper>

          {matchesMediaQuery ? null : mobileTourInfoDialog}
        </Container>

        {matchesMediaQuery ? null : slideInfoBar}
      </MainContent>
    </>
  );
};

export default TourPage;
