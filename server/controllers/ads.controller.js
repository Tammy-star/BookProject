
var db = require('../db');

const getAllAds = (req, res) => {
    db.query("SELECT * FROM ads", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAllOkAds = (req, res) => {
    db.query("SELECT * FROM ads where status = 1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getAllAdsToConfirm = (req, res) => {
    db.query("SELECT * FROM ads where status = 0", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
// const getAllAdsToConfirm = (req, res) => {
//     db.query(`select a.id ,  b.name as book_name, w.name as writer_name,
//     b.picture as book_image, a.price, u.name
//      as user_name, u.phone as user_phone, u.mail as user_mail, p.name as publish, cat.category as category_name,cat.id as category_id 
//     , c.name as city_name,   n.name as neighberhood_name
//     from ads a
//      inner  join users u on u.id =a.userID
//      inner join books b on b.id= a.bookID
//      inner join writers w on w.id = b.writerID
//      inner join publishing p on p.id = b.publishingID
//      inner join categories cat on cat.id = b.categoryID
//      inner join cities c on c.id = u.cityID
//      inner join neighberhood n on n.id = u.neighberhoodID
//      where a.status = 0 `, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };
const getFirstOkAd = (req, res) => {
    db.query("SELECT * FROM ads where ads.status = 1 and ads.id = 1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getAdsBywriter = (req, res) => {
    db.query(`SELECT * FROM ads join users on ads.bookID = users.id 
        where users.writerID=${req.params.writerID} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdsByCity = (req, res) => {
    db.query(`SELECT * FROM ads join users on ads.userID = users.id join cities on cities.id = users.cityID
        where cities.id=${req.params.cityID} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdsByNeighberhood = (req, res) => {
    db.query(`SELECT * FROM ads join users on ads.userID = users.id join neighberhood on neighberhood.id = users.neighberhoodID
        where neighberhood.id=${req.params.cityID} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdsByPublishing = (req, res) => {
    db.query(`SELECT * FROM ads join books on ads.bookID = books.id join publishing on publishing.id = books.publishingID
        where publishing.id=${req.params.publishingID} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getAdsByCategory = (req, res) => {
    db.query(`SELECT a.id FROM ads as a join books on a.bookID = books.id join categories on categories.id = books.categoryID
        where categories.id=${req.params.id} and a.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdsByIsbn = (req, res) => {
    db.query(`SELECT * FROM ads join books on ads.bookID = books.id
        where books.isbn=${req.params.isbn} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdsByNameBook = (req, res) => {
    db.query(`SELECT * FROM ads join books on ads.bookID = books.id 
        where books.name=${req.params.name} and ads.status = 1`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getAdById = (req, res) => {
    db.query(`select a.id ,  b.name as book_name, w.name as writer_name,
    b.picture as book_image, a.price, u.name
     as user_name, u.phone as user_phone, u.mail as user_mail, p.name as publish, cat.category as category_name,cat.id as category_id 
    , c.name as city_name,   n.name as neighberhood_name
    from ads a
     inner  join users u on u.id =a.userID
     inner join books b on b.id= a.bookID
     inner join writers w on w.id = b.writerID
     inner join publishing p on p.id = b.publishingID
     inner join categories cat on cat.id = b.categoryID
     inner join cities c on c.id = u.cityID
     inner join neighberhood n on n.id = u.neighberhoodID
     where a.id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const AddAd = (req, res) => {
    
    var ad_iduser = req.body.adsiduser;
    var bookId = req.body.adsNamebook;
    var ad_price = req.body.adsprice;
    var ad_type = req.body.adstype;

    db.query(`INSERT INTO ads (userID, bookID, price, status) VALUES 
    (${ad_iduser},${bookId}, ${ad_price},${ad_type})`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
};

const DeleteAd = (req, res) => {
    console.log('delete', req.params.id)
    db.query(`DELETE FROM ads where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        
    });

};
// ConfirmAdById
const ConfirmAdById = (req, res) => {
    
    db.query(`UPDATE ads
    SET
    status = 1
    WHERE id = ${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        
    });

};
// const UpdateCreditcard = (req, res) => {
//     // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
//     db.query(`UPDATE users set numCard  = ${req.body.numCard}validity =${req.body.validity}cvv = ${req.body.cvv}tz = ${req.body.tz}customer_id =  ${customer_id} where customer_id = ${req.body.idbooks}`, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };

module.exports = {
    getAllAds,
    getAllOkAds,
    getAdById,
    AddAd,
    DeleteAd,
    getFirstOkAd,
    getAdsByCategory,
    getAllAdsToConfirm,
    ConfirmAdById
};