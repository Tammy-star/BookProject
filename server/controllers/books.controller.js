var db = require('../db')

const getAdsByFilters = (req, res) => {
  // console.log(req.body)
  //const { categoryID, bookID, authorID, publishingID, cityID } = req.body
  const categoryID = req.body.categoryID
  const bookID = req.body.bookID
  const authorID = req.body.authorID
  const publishingID = req.body.publishingID
  const cityID = req.body.cityID
  
  var query =
    `select a.id from ads a` +
    ` inner join books b on a.bookID = b.id` +
    ` inner join users u on a.userID = u.id` +
    ` inner join cities c on u.cityID = c.id` +
    ` where ${categoryID ? `categoryID = ${categoryID} and` : ''}` +
    `${bookID ? ` bookID = ${bookID} and` : ''}` +
    `${authorID ? ` b.writerID = ${authorID} and` : ''}` +
    `${publishingID ? ` b.publishingID= ${publishingID} and` : ''}` +
    `${cityID ? ` cityID = ${cityID}` : ''}`

  console.log(query)
  query.trim()
  if (query.endsWith('and')) {
    var splitedQuery = query.split(' ')
    delete splitedQuery[splitedQuery.length - 1]
    query = splitedQuery.join(' ')
  }
  if (query.endsWith('where ')) {
    var splitedQuery = query.split(' ')
    delete splitedQuery[splitedQuery.length - 1]
    query = splitedQuery.join(' ')
  }
  db.query(query, function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
}
const getAllBooks = (req, res) => {
  //SELECT * FROM books where confirmed = 1'
  db.query('SELECT * FROM books', function (err, result, fields) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
}
const getBookById = (req, res) => {
  db.query(`SELECT * FROM books where id=${req.params.id}`, function (
    err,
    result,
    fields
  ) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
}

const getIdBookByName = (req, res) => {
  var bookName = JSON.stringify(req.params.id)
  db.query(
    `SELECT id FROM books where name=${decodeURI(bookName)}`,
    function (err, result, fields) {
      if (err) throw err
      console.log(result)
      res.send(result)
    }
  )
}
const getIdBookByNameNotOk = (req, res) => {
  var bookName = JSON.stringify(req.params.id)
  db.query(`SELECT id FROM books where name=${bookName}`, function (
    err,
    result,
    fields
  ) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
}
const AddBook = (req, res) => {
  var book_isbn = JSON.stringify(req.body.isbn)
  var book_name = JSON.stringify(req.body.name)
  var book_publishing = JSON.stringify(req.body.publishing)
  var book_writer = JSON.stringify(req.body.writer)
  var book_status = JSON.stringify(req.body.status)
  var book_image = JSON.stringify(req.body.image)
  var book_confirm = req.body.confirm

  db.query(
    `INSERT INTO books (isbn, name, publishingID, writerID, categoryID, picture, confirmed) VALUES 
     ( ${book_isbn},${book_name}, ${book_publishing},${book_writer}, ${book_status}, ${book_image}, ${book_confirm})`,
    function (err, result, fields) {
      if (err) throw err
      console.log(result)
      res.send(result)
    }
  )
}

const DeleteBook = (req, res) => {
  db.query(`DELETE FROM books where id=${req.body.idbooks}`, function (
    err,
    result,
    fields
  ) {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
}

module.exports = {
  getAllBooks,
  getBookById,
  AddBook,
  DeleteBook,
  getIdBookByName,
  getIdBookByNameNotOk,
  getAdsByFilters
}
