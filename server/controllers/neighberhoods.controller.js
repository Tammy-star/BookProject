var db = require('../db');
const getAllneighberhoods = (req, res) => {
    db.query("SELECT * FROM neighberhoods", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getNeighberhoodById = (req, res) => {
    db.query(`SELECT * FROM neighberhood where cityID=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = {
    getAllneighberhoods,
    getNeighberhoodById
};