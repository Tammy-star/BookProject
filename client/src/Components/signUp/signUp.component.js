import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './signUp.css'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { BrowserRouter, Redirect, useHistory } from 'react-router-dom'

function SignUp () {
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const handleEvent = () => {

    if (firstname.length == 0) {
      alert('Invalid Form, First Name can not be empty')
      return
    }
    if (lastname.length == 0) {
      alert('Invalid Form, First Name can not be empty')
      return
    }
    // Check if the Email is an Empty string or not.
    if (email.length == 0) {
      alert('Invalid Form, Email Address can not be empty')
      return
    }
    // check if the password follows constraints or not.
    // if password length is less than 8 characters, alert invalid form.
    if (password.length < 8) {
      alert(
        'Invalid Form, Password must contain greater than or equal to 8 characters.',
      )
      return
    }
    let countDigit = 0
    // variable to count special characters in the password.
    for (let i = 0; i < password.length; i++) {
      if (!isNaN(password[i] * 1)) {
        // this means that the character is a digit, so increment countDigit
        countDigit++
      } 
    }
    if (countDigit == 0) {
      // invalid form, 0 digit characters
      alert('Invalid Form, phone can be only digits')
      return
    }
    alert(
      'name:' +
        firstname +
        ' ' +
        lastname +
        ',phone:' +
        phone +
        '  ,mail+' +
        email +
        'password ' +
        password
    )
    axios
      .post('http://localhost:5000/AddUser', {
        name: firstname + ' ' + lastname,
        phone: phone,
        mail: email,
        password: password
      })
      .then(res => console.log('res from sign up', res))
  }

  return (
    <form>
      <h3>שלום, נעים להכיר</h3>

      <div className='form-group'>
        <label>שם פרטי</label>
        <input
          type='text'
          className='form-control'
          placeholder='שם פרטי'
          onChange={e => {
            setFirstName(e.target.value)
          }}
          required
        />
      </div>

      <div className='form-group'>
        <label>שם משפחה</label>
        <input
          type='text'
          className='form-control'
          placeholder='שם משפחה'
          onChange={e => {
            setLastName(e.target.value)
          }}
        />
      </div>

      <div className='form-group'>
        <label>טלפון</label>
        <input
          type='text'
          className='form-control'
          placeholder='טלפון'
          onChange={e => {
            setPhone(e.target.value)
          }}
        />
      </div>

      <div className='form-group'>
        <label>אימייל</label>
        <input
          type='email'
          className='form-control'
          placeholder=' Email'
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

      <button
        type='submit'
        onClick={handleEvent}
        className='btn btn-dark btn-lg btn-block'
      >
        הרשמה
      </button>
      {/* <Button variant="link">התחברות</Button> */}
      <p className='forgot-password text-right'>
        כבר רשום?
        {/* <Button variant="link" onClick={getSignIn}>התחברות</Button> */}
      </p>
      {/* <Button variant="link" onClick={getSignIn}>התחברות</Button> */}

      {/* <Button type="button" onClick={getSignIn}>
                כניסה    </Button> */}
    </form>
  )
}
export default SignUp
