var db = require('../db')

const getAllIntrestedByuserId = (req, res) => {
  db.query(
    `SELECT categoryID FROM intrested where userID=${req.params.id}`,
    function (err, result, fields) {
      if (err) throw err
      console.log(result)
      res.send(result)
    }
  )
}
const getAdsIdOrderByUserIntrested = (req, res)=>{
  db.query(
    `SELECT a.id FROM ads as a inner join books on a.bookID = books.id inner join
    (select categoryID, count(categoryID) mycount from intrested  where userID=${req.params.id}
       group by categoryID )t1 on t1.categoryID = books.categoryID
         where a.status = 1 order by t1.mycount desc`,
      function (err, result, fields) {
        if (err) throw err
        console.log(result)
        res.send(result)
      }
  )
}

const addIntrested = (req, res) => {
  var userID = req.body.userID
  var categoryID = req.body.categoryID

  db.query(
    `INSERT INTO intrested (userID, categoryID) VALUES (${userID},${categoryID})`,
    function (err, result, fields) {
      if (err) throw err
      console.log(result)
      res.send(result)
    }
  )
}
module.exports = {
  addIntrested,
  getAllIntrestedByuserId,
  getAdsIdOrderByUserIntrested
}
