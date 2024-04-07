import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import ContextIdAdsToShow from './context'
function Filters (props) {
  const [cities, setcities] = useState([])
  const [books, setBooks] = useState([])
  const [writers, setWriters] = useState([])
  const [publishings, setPublishings] = useState([])
  const [categories, setCategories] = useState([])
  const [data, setData] = useState({
    categoryID: '',
    bookID: '',
    authorID: '',
    publishingID: '',
    cityID: ''
  })

  const [city, setcity] = useState()
  const [book, setBook] = useState()
  const [writer, setWriter] = useState()
  const [publishing, setPublishing] = useState()
  const [category, setCategory] = useState()

  useEffect(() => {
    axios
      .get('http://localhost:5000/getAllcities')
      .then(res => {
        console.log(res.data)
        setcities(res.data)
      })
      .catch(err => console.log(err))

    axios
      .get('http://localhost:5000/getAllWriters')
      .then(res => {
        console.log(res.data)
        setWriters(res.data)
      })
      .catch(err => console.log(err))

    axios
      .get('http://localhost:5000/getAllBooks')
      .then(res => {
        console.log(res.data)
        setBooks(res.data)
        console.log(res.data)
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

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const history = useHistory()
  const handleSubmit = () => {
    localStorage.setItem('filters', JSON.stringify(data))
    window.location.reload(false)
   
  }
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Box sx={{ minWidth: 60 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>עיר</InputLabel>
          <Select
            name='cityID'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={city}
            label='עיר'
            onChange={handleChange}
          >
            {cities?.map(c => (
              <MenuItem name={c?.name} value={c?.id}>
                {c?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>סופר</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            name='authorID'
            value={writer}
            label='סופר'
            onChange={handleChange}
          >
            {writers?.map(w => (
              <MenuItem name={w?.name} value={w?.id}>
                {w?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>ספר</InputLabel>
          <Select
            name='bookID'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={book}
            label='ספר'
            onChange={handleChange}
          >
            {books?.map(b => (
              <MenuItem name={b?.name} value={b?.id}>
                {b?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>קטגוריה</InputLabel>
          <Select
            name='categoryID'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={category}
            label='קטגוריה'
            onChange={handleChange}
          >
            {categories?.map(c => (
              <MenuItem name={c?.category} value={c?.id}>
                {c?.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>הוצאה לאור</InputLabel>
          <Select
            name='publishingID'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={publishing}
            label='הוצאה לאור'
            onChange={handleChange}
          >
            {publishings?.map(p => (
              <MenuItem name={p?.name} value={p?.id}>
                {p?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ m: 2.5, minWidth: 120 }}
          variant='contained'
          onClick={handleSubmit}
        >
          חיפוש
        </Button>
      </Box>
    </div>
  )
}
export default Filters
