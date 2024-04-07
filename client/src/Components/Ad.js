import Modal1 from './modal'
import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import  './ads.css'
function Ad ({ ad }) {
  const [Ad, setAd] = useState({ name: '' })
  useEffect(() => {
    //alert(id)
    console.log('ad : ', ad)
    axios.get(`http://localhost:5000/getAdById/${ad.id}`).then(res => {
      console.log(res.data)
      console.log(res.data[0].book_name)
      setAd(res.data[0])
    })
  }, [])

  return (
    <Card style={{ width: '18rem' }}>
      
      <Card.Img className='image' variant='top' src={process.env.PUBLIC_URL + `/images/${Ad?.book_image}`}/>
      <Card.Body>
        <Card.Title>{Ad?.book_name}</Card.Title>
        <Card.Text>{Ad?.writer_name}</Card.Text>
        <Modal1 ad={Ad}></Modal1>
      </Card.Body>
    </Card>
  )
}

export default Ad
