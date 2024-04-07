import React, { useState, useEffect } from 'react'



import { useHistory, withRouter } from 'react-router-dom'

import reading from '../images/reading.jpg'
//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import rtlPlugin from 'stylis-plugin-rtl';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import { Form, Button } from 'react-bootstrap'
//import './signUp.css'
import axios from 'axios'

//import { Link } from 'react-router-dom'
function Copyright(props) {
  return (
    
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       ספר בשנייה
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});
const theme = createTheme();
function AddPrice (props) {
  
  const [price, setPrice] = useState()
  const history = useHistory()
  const UserId = JSON.parse(localStorage.getItem('user')).id
  const bookName = props.match.params.bookName
  const status = props.match.params.status
  const [bookID, setBookID] = useState()
  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/getIdBookByNameNotOk/${bookName}`)
      .then(res => {
        console.log('res', res)
        
        setBookID(res.data[0].id)
      })
  }, [])

  const handleEvent = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    axios
      .post('http://localhost:5000/Addad', {
        adsiduser: UserId,
        adsNamebook: bookID,
        adsprice: data.get('price'),
        adstype: status
      })
      .then(res1 => {
        console.log('res from add ad', res1)
        if(res1.status === 200){
           alert(" המודעה נוספה בהצלחה")
           history.push("/")
        }
       
      
      })
  }

  return (
    <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
       
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
              <MenuBookIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
           
            </Typography>
            <Box component="form" noValidate onSubmit={handleEvent} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="מחיר"
                name="price"
                autoComplete="price"
                autoFocus
              />
            
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                הוספת מודעה
              </Button>
              <Grid container>
                <Grid item xs>
                  
                </Grid>
               
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${reading})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
    </CacheProvider>
  );

}
export default withRouter(AddPrice)
