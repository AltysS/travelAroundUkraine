import React from 'react';
import { Typography, Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { setIsModalOpen } from '../../../../store/slices/userSlice/userSlice';
import CartIcon from '../CartIcon/CartIcon';

const loggedPages = [
  {
    name: 'home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'logOut',
    link: null,
    innerContent: 'LogOut',
    onClick: (dispatch) => dispatch(setIsModalOpen(true)),
  },
  {
    name: 'cart',
    link: '/cart',
    innerContent: <CartIcon />,
  },
  {
    name: 'account',
    link: '/user',
    innerContent: <PersonIcon fontSize="medium" />,
  },
];

const unloggedPages = [
  {
    name: 'home',
    link: '/',
    innerContent: 'Home',
  },
  {
    name: 'catalogue',
    link: '/catalogue',
    innerContent: 'Catalogue',
  },
  {
    name: 'logIn',
    link: '/login',
    innerContent: 'LogIn',
  },
  {
    name: 'favorites',
    link: '/favorites',
    innerContent: 'Favorites',
  },
  {
    name: 'cart',
    link: '/cart',
    innerContent: <CartIcon />,
  },
];

const boxSX = {
  flexGrow: 1,
  display: { xs: 'none', laptop: 'flex' },
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const typograpySX = (link, pathname) => ({
  textDecoration: 'none',
  display: 'block',
  margin: '0 36px',
  transition: '0.5s',
  fontSize: { laptop: '18px' },
  color: link ? link === pathname && 'secondary.main' : null,

  '&:hover': {
    color: 'secondary.main',
  },
});

const TabletMenu = () => {
  const location = useLocation();
  const { isLogin } = useSelector((store) => store.userReducer);

  const dispatch = useDispatch();
  const { pathname } = location;

  const currentPages = isLogin ? loggedPages : unloggedPages;

  return (
    <Box component="nav" sx={boxSX}>
      {currentPages.map(({ name, link, innerContent, onClick }) => (
        <Typography
          onClick={onClick && (() => onClick(dispatch))}
          component={NavLink}
          to={link}
          key={name}
          sx={typograpySX(link, pathname)}
          end
        >
          {innerContent}
        </Typography>
      ))}
    </Box>
  );
};

export default TabletMenu;
