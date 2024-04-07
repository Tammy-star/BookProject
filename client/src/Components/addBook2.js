import React, { useState, useEffect } from 'react'
//import * as React from 'react';
import reading from '../images/reading.jpg'
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
import MenuItem from '@mui/material/MenuItem';
import { Form } from 'react-bootstrap'
//import './signUp.css'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import { Link } from 'react-router-dom'
import {
  BrowserRouter,
  Redirect,
  useHistory,
  useParams
} from 'react-router-dom'


const Input = styled('input')({
  display: 'none',
});
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



function AddNewBook2 (props) {
  useEffect(() => {
    
    axios
      .get('http://localhost:5000/getAllWriters')
      .then(res => {
        console.log(res.data)
        setWriters(res.data)
      })
      .catch(err => console.log(err))
    axios
      .get('http://localhost:5000/getAllPublishings')
      .then(res => {
        console.log(res.data)
        setPublishings(res.data)
      })
      .catch(err => console.log(err))

    axios
      .get('http://localhost:5000/getAllCategories')
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
      .catch(err => console.log(err))
  }, [])
 
  let {name} = useParams()
  const history = useHistory()

  const handleEvent = (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    alert('name: '+ name)
    console.log('name: ',name )
    axios
      .post('http://localhost:5000/AddBook', {
        isbn: data.get('isbn'),
        name: name,
        publishing:publishing,
        writer:writer,
        status: category,
        image: data.get('image').name,
        confirm: 0
      })
      .then(res => {
        console.log('res from add book', res)
        
        history.push(`/addPrice/${name}/${0}`)
      })
  }
 
  
 
  
 
  
    const [writer, setWriter] = useState(9)
  const [publishing, setPublishing] = useState(4)
  const [category, setCategory] = useState(7)

  const [writers, setWriters] = useState([])
  const [publishings, setPublishings] = useState([])
  const [categories, setCategories] = useState([])
  const handleCat = (event) => {
    
    setCategory(event.target.value);
  };
  
    const handleWriter = (event) => {
      
      setWriter(event.target.value);
     // alert(city)
    };
    const handlePub = (event) => {
     
      setPublishing(event.target.value);
     // alert(city)
    };

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
            פרטי ספר חדש
            </Typography>
            <Box component="form" noValidate onSubmit={handleEvent} sx={{ mt: 1 }}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="writer"
                label="סופר"
                name="writer"
                autoComplete="writer"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="publishing"
                label="הוצאה לאור"
                name="publishing"
                autoComplete="publishing"
                autoFocus
              />*/}
               <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">סופר</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={writer}
          label="סופר"
          onChange={handleWriter}
        >
          
          {writers?.map(w => (
          <MenuItem name={w?.name} value={w?.id}>{w?.name}</MenuItem>
        ))}
         
        </Select>
      </FormControl>
      <TextField id="standard-basic" label="אחר" variant="standard" />
     </div>
     <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
        <Select
        fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="קטגוריה"
          onChange={handleCat}
        >
         
          {categories?.map(c => (
          <MenuItem name={c?.category} value={c?.id}>{c?.category}</MenuItem>
        ))}
         
        </Select>
      </FormControl>
      <TextField id="standard-basic" label="אחר" variant="standard" />
      </div>
 <div>
             <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">הוצאה לאור</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={publishing}
          label="הוצאה לאור"
          onChange={handlePub}
        >
        
          {publishings?.map(p => (
          <MenuItem name={p?.name} value={p?.id}>{p?.name}</MenuItem>
        ))}
         
        </Select>
      </FormControl>
      <TextField id="standard-basic" label="אחר" variant="standard" /></div>
      <TextField
                margin="normal"
                required
                fullWidth
                id="isbn"
                label="isbn"
                name="isbn"
                autoComplete="isbn"
                autoFocus
              />
       
 
  <Stack direction="row" alignItems="center" spacing={2}>
    
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" name="image"/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
          <label>          הוספת תמונה
          </label>
        </IconButton>
      </label>
    </Stack>
            
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                שלח לבדיקה
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
export default AddNewBook2
