var db = require('../db');


const getAllcities = (req, res) => {
    db.query("SELECT * FROM cities", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getCityById = (req, res) => {
    db.query(`SELECT * FROM cities where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = {
    getAllcities,
    getCityById
};