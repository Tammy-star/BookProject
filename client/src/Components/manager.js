import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Grid } from '@mui/material'
import Ad from './Ad'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button1 from '@mui/material/Button'
// import ContextIdAdsToShow from './context'

const Manager = () => {
  const [adsID, setAdsID] = useState([])
  const [users, setUsers] = useState([])
  const [userID, setUserID] = useState()

  const[flag, setFlag] = useState();


  useEffect(() => {
    axios
      .get('http://localhost:5000/getAllUsers')
      .then(res => {
        console.log('users', res.data)
        setUsers(res.data)
      })

      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    let unmounted = false
    axios.get('http://localhost:5000/getAllAdsToConfirm').then(res => {
      // for (var i = 0; i < res.data.length; i++) {

      //   setAdsID(state =>[...state, res.data[i]])
      //   console.log(res.data[i].id);
      // }
      console.log('adsID', res.data)

      for (var i = 0; i < res.data.length; i++) {
        setAdsID(state => [...state, res.data[i]])
        console.log(res.data[i].id)
        console.log('adsID', adsID)
      }
    })
    return () => {
      unmounted = true
    }
  }, [])
  const DeleteUser = () => {
    axios.post('http://localhost:5000/DeleteUser/' + userID).then(res => {
      setUsers(users.filter(u => u.id != userID))
      setUserID(0)
      console.log('DeleteUser', res.data)
    })
  }
  const setStatus = id => {
    axios.post('http://localhost:5000/ConfirmAdById/' + id).then(res => {
      console.log('ConfirmAdById', res.data)
    });
    var a = adsID.filter(a => a.id != id);
    console.log('a:', a);
    setAdsID(a);
     window.location.reload();
  }

  const DeleteAd = id => {
    axios.post('http://localhost:5000/DeleteAd/' + id).then(res => {
      setAdsID(adsID.filter(a => a.id != id))
      console.log('DeleteAd', res.data)
    })
  }

  const history = useHistory()

  const handleSubmit = () => {
    // localStorage.setItem('filters', JSON.stringify(data))
    // window.location.reload(false)
    axios.post('http://localhost:5000/UpdateUserToManager/' + userID).then(res => {
      // setUsers(users.filter(u => u.id != userID))
      // setUserID(0)
      console.log('UpdateUserToManager', res.data)
    })

  }
  const handleChange = e => {
    setUserID(e.target.value)
  }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>משתמש</InputLabel>
        <Select
          name='bookID'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          // value={user}
          label='משתמש'
          onChange={handleChange}
        >
          {users?.map(u => (
            <MenuItem name={u?.name} value={u?.id}>
              {u?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button1
        sx={{ m: 2.5, minWidth: 120 }}
        variant='contained'
        onClick={handleSubmit}
      >
        הוסף כמנהל
      </Button1>
      <Button1
        sx={{ m: 2.5, minWidth: 120 }}
        variant='contained'
        onClick={DeleteUser}
      >
        הסר משתמש
      </Button1>
      <Container sx={{ py: 8 }} maxWidth='md'>
        {/* End hero unit */}
        <Grid container spacing={15}>
          {adsID.map(card => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <div>
                <span>
                  <Button
                    variant='primary'
                    onClick={() => {
                      setStatus(card.id)
                    }}
                  >
                    מאושר
                  </Button>
                </span>
                <span>
                  <Button
                    variant='primary'
                    onClick={() => {
                      DeleteAd(card.id)
                    }}
                  >
                    לא מאושר
                  </Button>
                </span>
              </div>
              <Ad ad={card}></Ad>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Manager
