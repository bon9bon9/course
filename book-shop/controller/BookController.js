const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const {resJson, resSuccessJson, getPagenateInfo} = require('../common');


const getAll = (req,res) => {
    let {page, size} = req.query;
    let whereSql = bookFilters(req.query);
    let orderSql = bookOrder(req.query);
    let pagenateInfo = getPagenateInfo(page, size);
    
    let sql = `SELECT b.*, bc.bc_name, COUNT(l.book_idx) AS like_cnt FROM book AS b 
           LEFT JOIN likes AS l ON b.b_idx = l.book_idx 
           LEFT JOIN book_category AS bc ON bc.bc_idx = b.category_idx
           ${whereSql} 
           GROUP BY b.b_idx 
           ${orderSql}
           ${pagenateInfo.sql}`;

    conn.query(sql,(err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        if(pagenateInfo.sql !== ""){
            let pageInfo = {page : pagenateInfo.page, size : pagenateInfo.size, total_count : undefined};
            let countSql = `SELECT COUNT(*) as cnt FROM book AS b ${whereSql}`
            conn.query(countSql, (err,cnt_results) => {
                if(err){
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
                }
                pageInfo.total_count = cnt_results[0].cnt;
                res.json(resSuccessJson(results,pageInfo));
            });
        }else{
            res.json(resSuccessJson(results));
        }
    });
};

const getDetail = (req,res) => {
    const {idx} = req.params;
    let sql = `SELECT b.*, bc.bc_name, COUNT(l.book_idx) AS like_cnt FROM book AS b 
    LEFT JOIN likes AS l ON b.b_idx = l.book_idx 
    LEFT JOIN book_category AS bc ON bc.bc_idx = b.category_idx
    WHERE b.b_idx = ?
    GROUP BY b.b_idx`;
    conn.query(sql,[idx],(err, results) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
        res.json(resSuccessJson(results));
    });
}

function bookFilters(inputs){
    let whereClauses = [];

    if (inputs.keyword !== undefined) {
        whereClauses.push(`b.b_title LIKE '%${inputs.keyword}%'`);
    }
    
    if (inputs.category !== undefined) {
        whereClauses.push(`b.category_idx = ${inputs.category}`);
    }
    
    if(inputs.idx !== undefined) {
        whereClauses.push(`b.b_idx = ${$inputs.idx}`);
    }

    if(inputs.order == "pub"){
        whereClauses.push(`b.b_pub_date >= DATE_SUB(NOW(),INTERVAL 1 MONTH)`)
    }

    return whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND ") : "";

}

function bookOrder(inputs){
    let orderType = "b.created_at";
    if(inputs.order == "title") orderType = "b.b_title";
    else if(inputs.order == "like") orderType = "like_cnt";
    else if(inputs.order == "pub") orderType = "b.b_pub_date";

    let dirType = inputs.dir === undefined ? "DESC" : inputs.dir;
    return ` ORDER BY ${orderType} ${dirType}`
}



module.exports = {getAll, getDetail};