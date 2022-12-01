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
// Icons
import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';

import { useInView } from 'react-intersection-observer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchTour } from '../../store/slices/tourSlice/tourSlice';

import { TourAccordion, TourInfoDialog, TourReasonToChoose, ImageGallery } from '../../features/Tour/components';

const sections = [
  { title: 'About us', link: '#about-tour' },
  { title: 'Reasons to choose', link: '#reasons-to-choose' },
  { title: 'What is included?', link: '#included' },
];

const currency = {
  eur: '€',
  usd: '$',
  uah: '₴',
};

const included = [
  { icon: <PersonIcon color="primary" />, service: 'Professional guide' },
  { icon: <BedIcon color="primary" />, service: 'Accomodation' },
];

const cost = {
  eur: 70,
  usd: 70,
  uah: 2584,
};

const dates = { beginDate: new Date('2022-02-01'), endDate: new Date('2022-02-25') };

const details = {
  duration: '3 days',
  departs: 'First city',
  returns: 'Second city',
};

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

  const [dialogRef, inView] = useInView({ root: null, rootMargin: '0px', threshold: 0.1 });

  const handleOpenDialog = () => setIsOpen(true);
  const handleCloseDialog = () => setIsOpen(false);

  const dispatch = useDispatch();
  // to be revised in future from re rendering and optimizing point of view, whether we pass needed data as props to components or useSelector directly in each component.
  const { imageUrls, name, description, reasons } = useSelector((store) => store.tour.data);

  useEffect(() => {
    dispatch(fetchTour());
  }, []);

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
            {name}
          </Typography>
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
            {matchesMediaQuery ? (
              <Box component="aside" sx={{ maxWidth: '370px', width: '100%' }}>
                <TourInfoDialog included={included} cost={cost} dates={dates} details={details} />
              </Box>
            ) : null}

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
                    {reasons
                      ? reasons.map((item, index) => (
                          <TourReasonToChoose description={item} number={index + 1} key={item} />
                        ))
                      : null}
                  </Stack>
                </TourAccordion>
              </Section>

              {/* <Section id="included">
                <TourAccordion title="What is included?">
                  <Stack direction="row" gap="20px">
                    {included.map(({ icon, service }) => (
                      <Stack key={service} direction="row" gap="5px" alignItems="center" flexWrap="wrap">
                        {icon}
                        <Typography gutterBottom={false}>{service}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </TourAccordion>
              </Section> */}
            </Box>
          </ContentWrapper>

          {!matchesMediaQuery ? (
            <MobileDialogWrapper ref={dialogRef}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Cost>
                  {currency.eur}
                  {cost.eur}
                </Cost>
                <Button sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
                  More info
                </Button>
              </Stack>
              <Dialog open={isOpen} onClose={handleCloseDialog} hideBackdrop fullScreen>
                <TourInfoDialog
                  included={included}
                  cost={cost}
                  dates={dates}
                  details={details}
                  closeButton
                  handleClose={handleCloseDialog}
                />
              </Dialog>
            </MobileDialogWrapper>
          ) : null}
        </Container>

        {!matchesMediaQuery ? (
          <Slide in={!inView} direction="up" mountOnEnter unmountOnExit>
            <FloatingDialog>
              <Container>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Cost>
                    {currency.eur}
                    {cost.eur}
                  </Cost>
                  <Button sx={{ paddingInline: '30px' }} disableElevation onClick={handleOpenDialog}>
                    More info
                  </Button>
                </Stack>
              </Container>
            </FloatingDialog>
          </Slide>
        ) : null}
      </MainContent>
    </>
  );
};

export default TourPage;
