import React from 'react'
import { Typography, Box, Grid, Link, Stack, styled } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TelegramIcon from '@mui/icons-material/Telegram';
import ContactsForm from '../../features/Home/components/ContactsForm/ContactsForm';

const icons = [
  <FacebookIcon />,
  <TwitterIcon />,
  <LinkedInIcon />,
  <YouTubeIcon />,
  <PinterestIcon />,
  <TelegramIcon />
]

const SocialsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row'
}))

const SocialItem = styled('button')(() => ({
  backgroundColor: 'rgba(40, 44, 52, 0.2)',
  margin: '5px',
  marginLeft: 0,
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0, 75, 252, 0.04)'
  }
}))

const ContactUsPage = () => (
  <Stack direction='row' maxWidth='1200px' justifyContent='center' m='150px auto 100px auto'>
    <Box>
      <Box>
        <Typography variant="h2">Contact Info</Typography>
      </Box>
      <Grid container direction='row' wrap='nowrap' pt='30px' minWidth='400px' alignItems='center'>
        <Grid container item width='70px' spacing={3} xs={2} direction='column'>
          <Grid item>
            <Typography fontWeight='bold'>Address:</Typography>
          </Grid>
          <Grid item>
            <Typography fontWeight='bold'>Phone:</Typography>
          </Grid>
          <Grid item>
            <Typography fontWeight='bold'>Email:</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={9} spacing={3} direction='column' className="contacts__credentials-cred">
          <Grid item>
            <Typography>Pavla Tychyny Ave, 1В, Kyiv, 02000</Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Link href="tel:0800335695">0 800 335 695</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <Link href="mailto:office@dan-it.com.ua">office@dan-it.com.ua</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <Typography variant="h2" sx={{ marginTop: '50px', paddingBottom: '15px' }}>Get Social</Typography>
        <SocialsContainer>
          {
            icons.map((icon, i) => {
              const key = icon + i;
              return <SocialItem key={key}> {icon} </SocialItem>
            })
          }
        </SocialsContainer>
      </Box>
    </Box>
    <Box>
      <Typography variant="h2">Get In Touch with Us</Typography>
      <Typography>
        if  you have some questions and you want to contact us personally - you can write your message to us and we will contact you as soon as possible!
      </Typography>
      <ContactsForm />
    </Box>
  </Stack>
)

export default ContactUsPage;  