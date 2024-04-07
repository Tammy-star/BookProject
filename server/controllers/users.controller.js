
var db = require('../db');

const getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
const getUserById = (req, res) => {
    db.query(`SELECT * FROM users where id=${req.params.idusers}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

// const setIsmanager = (req, res) => {
//     db.query(`SELECT * FROM users where id=${req.params.idusers}`, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };
const getUserByPassword = (req, res) => {
    var mail=JSON.stringify(req.body.email)
    var password=JSON.stringify(req.body.password)
    db.query(`SELECT * FROM users where password=${password} and mail=${mail}`, function (err, result, fielgit) {
        if (err) throw err;
        console.log(result);
        res.send(result[0]);
    });
};
const AddUser = (req, res) => {
    //  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    
    var user_name = JSON.stringify(req.body.name);
    var user_phone = JSON.stringify(req.body.phone);

  var user_mail=JSON.stringify(req.body.mail)
  var user_password=JSON.stringify(req.body.password)

  var cityID=JSON.stringify(req.body.cityID)
  var neighberhoodID =JSON.stringify(req.body.neighberhoodID)


    db.query(`INSERT INTO users (name,phone,mail,password,cityID,neighberhoodID) VALUES ( ${user_name},${user_phone},${user_mail},${user_password},${cityID},${neighberhoodID})`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
};

const DeleteUser = (req, res) => {
    db.query(`SET FOREIGN_KEY_CHECKS=0; DELETE FROM ads WHERE  userID =${req.params.id};DELETE FROM users where id=${req.params.id};`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        
    });
};
const UpdateUserToManager = (req, res) => {
    db.query(`UPDATE users
    SET
    isManager = 1
    WHERE id = ${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        
    });
};

// const UpdateCreditcard = (req, res) => {
//     // "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'"
//     db.query(`UPDATE books set numCard  = ${req.body.numCard}validity =${req.body.validity}cvv = ${req.body.cvv}tz = ${req.body.tz}customer_id =  ${customer_id} where customer_id = ${req.body.idbooks}`, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.send(result);
//     });
// };

module.exports = {
    getAllUsers,
    getUserById,
    AddUser,
    DeleteUser,
    getUserByPassword,
    UpdateUserToManager
};