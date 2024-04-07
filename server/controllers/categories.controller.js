var db = require('../db');
const getAllcategories = (req, res) => {
    db.query("SELECT * FROM categories", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getCategoriesById = (req, res) => {
    db.query(`SELECT * FROM categories where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = {
    getAllcategories,
    getCategoriesById
};