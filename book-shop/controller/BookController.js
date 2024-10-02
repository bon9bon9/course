const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const {resJson, resSuccessJson} = require('../common');


const getAll = (req,res) => {
    const {keyword, category, order, dir, idx} = req.query;
    let whereClauses = [];

    if (keyword !== undefined) {
        whereClauses.push(`b.b_title LIKE '%${keyword}%'`);
    }
    
    if (category !== undefined) {
        whereClauses.push(`b.category_idx = ${category}`);
    }
    
    if(idx !== undefined) {
        whereClauses.push(`b.b_idx = ${idx}`);
    }

    let whereSql = whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND ") : "";

    let orderType = "b.created_at";
    if(order == "title") orderType = "b.b_title";
    else if(order == "like") orderType = "like_cnt";
    else if(order == "pub") orderType = "b.b_pub_date";

    let dirType = dir === undefined ? "DESC" : dir;

    let sql = `SELECT b.*, bc.bc_name, COUNT(l.book_idx) AS like_cnt FROM book AS b 
           LEFT JOIN likes AS l ON b.b_idx = l.book_idx 
           LEFT JOIN book_category AS bc ON bc.bc_idx = b.category_idx
           ${whereSql} 
           GROUP BY b.b_idx 
           ORDER BY ${orderType} ${dirType}`;

    conn.query(sql,(err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    });
};

const getDetail = (req,res) => {
    const {b_idx} = req.params;
    let sql = `SELECT b.*, bc.bc_name, COUNT(l.book_idx) AS like_cnt FROM book AS b 
    LEFT JOIN likes AS l ON b.b_idx = l.book_idx 
    LEFT JOIN book_category AS bc ON bc.bc_idx = b.category_idx
    WHERE b.b_idx = ?
    GROUP BY b.b_idx`;
    conn.query(sql,[b_idx],(err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    });
}

const getCategory = (req, res) => {
    let sql = "SELECT * FROM book_category";
    conn.query(sql , (err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    });
}

module.exports = {getAll, getDetail, getCategory};