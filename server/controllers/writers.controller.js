
var db = require('../db');

const getAllWriters = (req, res) => {
    db.query("SELECT * FROM writers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getWriterById = (req, res) => {
    db.query(`SELECT * FROM writers where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getWriterIdByName = (req, res) => {
    db.query(`SELECT id FROM writers where name=${req.params.name}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = {
    getAllWriters,
    getWriterById,
    getWriterIdByName
};