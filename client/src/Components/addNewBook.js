import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

import { BrowserRouter,withRouter,Link, Redirect, useHistory } from 'react-router-dom'

function AddNewBook  (props) {
  const  name  = props.match.params;
  const [writerName, setWriterName] = useState(null)
  const [publishName, setPublishName] = useState(null)
  const [category, setCategory] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState(null)

  const history = useHistory()
  
  const handleEvent = () => {
    alert('name: '+ props.match.params.name)
    console.log('name: ',props.match.params.name )
    
    axios
      .post('http://localhost:5000/AddBook', {
        isbn: isbn,
        name: props.match.params.name,
        publishing: publishName,
        writer: writerName,
        status: category,
        image: image,
        confirm: 0
      })
      .then(res => {
        console.log('res from add book', res)
        history.push(`/addPrice/${props.match.params.name}/${0}`)
      })
  }
 
  
  return (
    <form>
      <div className='form-group'>
        <label>שם הסופר</label>
        <input
          type='text'
          className='form-control'
          placeholder='שם הסופר'
          onChange={(e)=> {
            setWriterName(e.target.value)
          }}
        />
      </div>

      <div className='form-group'>
        <label>הוצאה</label>
        <input
          type='text'
          className='form-control'
          placeholder='הוצאה'
          onChange={(e)=> {
            setPublishName(e.target.value)
          }}
        />
      </div>

      <div className='form-group'>
        <label>קטגוריה</label>
        <input
          type='text'
          className='form-control'
          placeholder='קטגוריה'
          onChange={(e)=> {
            setCategory(e.target.value)
          }}
        />
      </div>

      <div className='form-group'>
        <label>isbn</label>
        <input
          type='text'
          className='form-control'
          placeholder='isbn'
          
          onChange={(e)=> {
            setIsbn(e.target.value)
          }}
        />
      </div>
      <div className='form-group'>
        <label>תמונה</label>
        <input
          type='text'
          className='form-control'
          placeholder='תמונה'
          onChange={(e)=> {
            setImage(e.target.value)
          }}
        />
      </div>
      <button
        type='button'
        onClick={handleEvent}
        className='btn btn-dark btn-lg btn-block'
      >
        הוספת ספר
      </button>
    </form>
  )
}
export default withRouter(AddNewBook);
