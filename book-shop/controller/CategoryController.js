const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const {resJson, resSuccessJson} = require('../common');

const getCategory = (req, res) => {
    let sql = "SELECT * FROM book_category";
    conn.query(sql , (err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    });
}

module.exports = { getCategory };