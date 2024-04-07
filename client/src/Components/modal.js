import React, {useState, useEffect} from 'react';

import axios from  'axios'
import {  Button,Modal} from 'react-bootstrap';
import TextField from '@mui/material/TextField';
function MyVerticallyCenteredModal(props) {

const [color, setColor] = React.useState(null);
const [title, setTitle] = React.useState(null);
const [display, setDisplay] = React.useState(null);
const [text, setText] = React.useState(null);
const [firstclick,setFirstClick] =  React.useState(null);
 useEffect(() => {
 setColor('white')
 setDisplay('none')
//  setTitle('הודעה למוכר')
 setFirstClick(true)

}, []);
const showDitails = (event) => {
  if("user" in localStorage){
    setColor('black')
    axios
    .post('http://localhost:5000/addIntrested', {
      userID:JSON.parse(localStorage.getItem('user')).id,
      categoryID: props.ad.category_id,
    })
    .then(res1 => {
      console.log('add intrested', res1)
    })
  }else{
    alert("משתמש לא רשום אינו יכול לצפות בפרטי מוכר")
  }
  
}
const handleChange =(event)=>{
setText(event.target.value)
}
const sendmail = (event) =>{

  if("user" in localStorage){
    axios
    .post('http://localhost:5000/addIntrested', {
      userID:JSON.parse(localStorage.getItem('user')).id,
      categoryID: props.ad.category_id,
    })
    .then(res1 => {
      console.log('add intrested', res1)
    })

    axios.post('http://localhost:5000/sendmail',{
mail:props.ad.user_mail,
text:text
    }).then(res1 => {
      
      console.log('send mail', res1)
      setColor('white')
      // setDisplay('none')
      // setTitle('הודעה למוכר')
      alert("send")
      
    })
  }else{
    alert("משתמש לא רשום אינו יכול לצפות בפרטי מוכר")
  }
}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          שם הספר:  {props.ad.book_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <tr>
          <td>
             <h4>שם הסופר : {props.ad.writer_name}  </h4>
        
        <h4>קטגוריה : {props.ad.category_name}  </h4>
        <h4>הוצאה לאור : {props.ad.publish}  </h4>
        <h4>מחיר : {props.ad.price}  </h4>
        <h4>מספר מודעה : {props.ad.id}  </h4>
          </td>
      
          <TextField
        style={{display:display}}
          id="outlined-multiline-flexible"
          label="email text"
          multiline
          maxRows={4}
          name='text'
         // value={value}
          onChange={handleChange}
         
        />
        
   
        </tr>
        
       {/*  <p>
          תמונה
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        <h5>עיר : {props.ad.city_name} </h5>
        <h5 style={{color}}>{props.ad?.user_name}</h5>
        <h5 style={{color}}>{props.ad?.user_phone}</h5>
        <h5 style={{color}}>{props.ad?.user_mail}</h5>
        {/* <Button  onClick={AddText} >{title}</Button> */}
        <Button onClick={showDitails}>פרטי מוכר</Button>
        <Button onClick={props.onHide}>סגור</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Modal1({ad}) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
       הצגת מודעה
      </Button>

      <MyVerticallyCenteredModal
      ad ={ad}
      
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
   </div>
  );
}
export default Modal1