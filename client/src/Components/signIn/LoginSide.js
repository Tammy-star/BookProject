import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import reading from '../../images/reading.jpg'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import { useHistory } from 'react-router-dom'

import rtlPlugin from 'stylis-plugin-rtl'

import axios from 'axios'
function Copyright (props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {' © '}
      <Link color='inherit' href='https://mui.com/'>
        ספר בשנייה
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
})
const theme = createTheme()

export default function SignInSide () {
  const history = useHistory()
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })

    axios
      .post('http://localhost:5000/getUserByPassword', {
        email: data.get('email'),
        password: data.get('password')
      })
      .then(res => {
        if (res.data.name == null){
          alert("שגיאה - נסה שוב")
        }else{
          localStorage.clear()
          console.log('res from sign in', res)
          localStorage.setItem(
            'user',
            JSON.stringify({ name: res.data.name, id: res.data.id })
          )
  
          alert('שלום ' + JSON.parse(localStorage.getItem('user')).name)
          if (res.status === 200) {
            if (res.data.isManager === 0) {
              axios
                .get(`http://localhost:5000/getAdsByCategory/${3}`)
                .then(res => {
  
                })
              history.push('/')
            } else history.push('/Manager')
          }
        }
  
      })
  }

  return (
    
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                איזור אישי
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='כתובת אימייל'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='סיסמה'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  כניסה
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='#' variant='body2'>
                      שכחת סיסמה
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='http://localhost:3000/signUp' variant='body2'>
                      {'אין לך חשבון? להרשמה'}
                    </Link>
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
              backgroundColor: t =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  )
}
