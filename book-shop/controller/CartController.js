const conn = require("../mariadb");
const {StatusCodes} = require("http-status-codes");
const MySQLErrors = require('../mysqlErrors');
const {resJson, resSuccessJson, decodeJwt} = require("../common");


const createCart = (req,res) => {
    const {b_idx, quantity} = req.body;
    const u_idx = decodeJwt(req);
    let sql = `INSERT INTO cart(book_idx, user_idx, c_quantity) VALUE( ?, ?, ?)`;
    conn.query(sql, [b_idx, u_idx, quantity], (err, result) => {
        if(err){
            if(err.code.includes(MySQLErrors.ER_NO_REFERENCED_ROW.code)){
                return res.status(StatusCodes.BAD_REQUEST).json(resJson("잘못된 b_idx 혹은 u_idx",-1,err))
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(result.insertId));
    });


};

const getCartList = (req,res) => {
    req.query.u_idx = decodeJwt(req);
    let whereSql = cartFilter(req.query);
    let sql = `SELECT c.*, b.b_title, b.b_img, b.b_price, b.b_description , b.b_summary
        FROM cart AS c
        LEFT JOIN book AS b ON c.book_idx = b.b_idx
        ${whereSql}`
    conn.query(sql, (err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    })
}; 

const deleteCart = (req,res) => {
    const {c_idx} = req.params;
    const u_idx = decodeJwt(req);

    let selectSql = `SELECT * FROM cart WHERE c_idx = ?`;
    conn.query(selectSql, [c_idx], (err,result) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        if(!result.length){
            return res.status(StatusCodes.BAD_REQUEST).json(resJson("존재하지 않는 c_idx",-1));
        }
        if(result[0].user_idx != u_idx){
            return res.status(StatusCodes.FORBIDDEN).json(resJson("권한 없음",-2));
        }
        let sql = `DELETE FROM cart WHERE c_idx = ?`;
        conn.query(sql,[c_idx],(err,result) => {
            if(err){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
            res.json(resSuccessJson({affectedRows : result.affectedRows}));
        })
    })
};

function cartFilter(inputs){
    let whereClauses = [];

    if(inputs.u_idx !== undefined){
        whereClauses.push(`c.user_idx = ${inputs.u_idx}`);
    }

    if(inputs.c_idxs !== undefined) {
        whereClauses.push(`c.c_idx IN(${inputs.c_idxs})`);
    }

    return whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND "): "";
};

module.exports = {createCart, getCartList, deleteCart};