const conn = require("../mariadb");
const {StatusCodes} = require('http-status-codes');
const {resJson, decodeJwt} = require("../common");
const dotenv = require('dotenv')
dotenv.config();


const likeOrCancel = (req,res) => {
    const {b_idx} = req.params;
    const u_idx = decodeJwt(req);
    let selectSql = `SELECT * FROM likes 
    WHERE book_idx = ?
    AND user_idx = ?`;

    conn.query(selectSql, [b_idx, u_idx], (err, result) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        let sql = "";
        let code = 1;
        if(!result.length){
            sql = `INSERT INTO likes (book_idx, user_idx) VALUE ( ? , ?)`;
        }else{
            sql = `DELETE FROM likes WHERE book_idx = ? AND user_idx = ?`;
            code = 2;
        }
        conn.query(sql,[b_idx, u_idx], (err, result) => {
            if(err){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
            res.json(resJson("성공",code));
        }); // insert or delete query end
    }); // select query end
};

module.exports = { likeOrCancel }