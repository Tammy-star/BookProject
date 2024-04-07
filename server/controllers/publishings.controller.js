var db = require('../db');

const getAllPublishings = (req, res) => {
    db.query("SELECT * FROM publishing", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

const getPublishingById = (req, res) => {
    db.query(`SELECT * FROM publishing where id=${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

module.exports = {
    getAllPublishings,
    getPublishingById
};