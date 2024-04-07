import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Manager from '../manager'
// import localStorage from '../localStorege';
export default function SignIn () {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const history = useHistory()
  const handleEvent = () => {
    //var store = require('store')

    axios
      .post('http://localhost:5000/getUserByPassword', {
        email: email,
        password: password
      })
      .then(res => {
        setName(res.data.name)
        console.log('res from sign in', res)
        localStorage.setItem(
          'user',
          JSON.stringify({ name: res.data.name, id: res.data.id })
        )
        alert('hello ' + JSON.parse(localStorage.getItem('user')).name)
        if (res.status === 200) {
          if (res.data.isManager === 0) history.push('/filters')
          else history.push('/Manager')
        }
      })

  }
  return (
    <div>
      <form>
        <h3>שלום, טוב לראותך{name}</h3>

        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='email'
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
        </div>

        <div className='form-group'>
          <label>סיסמה</label>
          <input
            type='password'
            className='form-control'
            placeholder='סיסמה'
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <input
          type='button'
          onClick={handleEvent}
          value='התחברות'
          className='btn btn-dark btn-lg btn-block'
        />
      </form>
    </div>
  )
}
