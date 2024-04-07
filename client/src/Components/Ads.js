import React, { useState, useEffect } from 'react'
import Ad from './Ad'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function Ads () {
  const [adsID, setAdsID] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/getAllOkAds').then(res => {
     
      for (var i = 0; i < res.data.length; i++) {     
        setAdsID(state =>[...state, res.data[i]])
      }
    })
  }, [])

  const cards1 = [1, 2, 3];
  const cards2 = [4, 5, 6];
  const cards3 = [7, 8, 9];
  // const [books, setBooks] = useState([
  //   {
  //     name: 'lalala',
  //     publisher: 'vjhvxj',
  //     img:
  //       'https://dalicanvas.co.il/wp-content/uploads/2020/02/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg'
  //   },
  //   {
  //     name: 'lalala',
  //     publisher: 'vjhvxj',
  //     img:
  //       'https://dalicanvas.co.il/wp-content/uploads/2020/02/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg'
  //   },
  //   {
  //     name: 'lalala',
  //     publisher: 'vjhvxj',
  //     img:
  //       'https://dalicanvas.co.il/wp-content/uploads/2020/02/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg'
  //   },
  //   {
  //     name: 'lalala',
  //     publisher: 'vjhvxj',
  //     img:
  //       'https://dalicanvas.co.il/wp-content/uploads/2020/02/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg'
  //   }
  // ])
  return (
    <Table>
      <tbody>
        <tr>
          {cards1.map(card =>(
            <td>
              <Ad ad={adsID[card]} ></Ad>
            </td>
          ))}
        </tr>
        <tr>
          {cards2.map(card =>(
            <td>
              <Ad ad={adsID[card]} ></Ad>
            </td>
          ))}
        </tr>
        <tr>
          {cards3.map(card =>(
            <td>
              <Ad ad={adsID[card]} ></Ad>
            </td>
          ))}
        </tr>
        {/*  */}
      </tbody>
    </Table>
  )
}

export default Ads
