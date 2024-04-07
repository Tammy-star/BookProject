import React, { useState, useEffect, useStateIfMounted } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import CameraIcon from '@mui/icons-material/PhotoCamera'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'

import Ad from './Ad'
import context from 'react-bootstrap/esm/AccordionContext'
import Context from '@mui/base/TabsUnstyled/TabsContext'

function Copyright () {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Album (props) {
  const [adsID, setAdsID] = useState([])

  useEffect(async () => {
    await getData()
  }, [])
  const getData = async () => {
    if ('filters' in localStorage) {
      var data = JSON.parse(localStorage.getItem('filters'))
      axios
        .post('http://localhost:5000/getAdsByFilters', data)
        .then(res => {
          setAdsID(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    } else if ('user' in localStorage) {
      var userID = JSON.parse(localStorage.getItem('user')).id
      axios
        .get('http://localhost:5000/getAdsIdOrderByUserIntrested/6')
        .then(res => {
          for (var i = 0; i < res.data.length; i++) {
            setAdsID(state => [...state, res.data[i]])
            console.log(res.data[i].id)
          }
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      axios.get('http://localhost:5000/getAllOkAds').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          setAdsID(state => [...state, res.data[i]])
          console.log(res.data[i].id)
        }
      })
    }
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <main>
          <Grid container spacing={2} columns={16}></Grid>

          <Container sx={{ py: 8 }} maxWidth='md'>
            {/* End hero unit */}
            <Grid container spacing={15}>
              {adsID.length
                ? adsID.map(card => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                      <Ad ad={card}></Ad>
                    </Grid>
                  ))
                : ''}
            </Grid>
          </Container>
         {adsID.length == 0  && <div id='no-books'>אופססס לא מצאנו את מה שחיפשת</div>}
        </main>
      </ThemeProvider>
      <div></div>
    </div>
  )
}
