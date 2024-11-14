const conn = require('./mariadb');
const crypto = require('crypto'); // 기본 모듈 : 암호화를 담당
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function sendSql(sql){
    return new Promise((resolve, reject) => {
        conn.query(sql , (err, results) => {
            if(err) return reject(err);
            resolve(results);
        })
    });
};

function sendSqlWithData(sql, values){
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        })
    })
};

const resJson = (message, code, data) => {
    return {
        message : message, 
        code : code, 
        data : data
    };

}

const resSuccessJson = (data, pageInfo) => {
    return {message : "성공", code : 1, pageInfo : pageInfo, data : data};
}

const encodePwd = (pwd) => {
    // 비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPwd = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    return {salt : salt, newPwd : hashPwd};
}

const comparePwd = (pwd, salt, inputPwd) => {
    const encodePwd = crypto.pbkdf2Sync(inputPwd, salt, 10000, 10,'sha512').toString('base64');
    if(pwd == encodePwd)
        return true;
    else false;
}

const getPagenateInfo = (page, size) => {
    let pagenateInfo = {
        page: parseInt(page), 
        size: parseInt(size), 
        sql : ""
    };
    if(page === undefined && size === undefined) return pagenateInfo;
    if(page === undefined) pagenateInfo.page = 1;
    if(size === undefined) pagenateInfo.size = 10;

    let limit = pagenateInfo.size;
    let offset = (pagenateInfo.page-1) * pagenateInfo.size;
    
    pagenateInfo.sql = ` LIMIT ${limit} OFFSET ${offset}`;
    return pagenateInfo;
}

function decodeJwt(req){
    let token = req.headers['authorization'];
    let userData = jwt.verify(token, process.env.PRIVATE_KEY)
    return userData.u_idx;
}


module.exports = { 
    sendSql, 
    sendSqlWithData, 
    resJson, 
    resSuccessJson, 
    encodePwd, 
    comparePwd,
    getPagenateInfo,
    decodeJwt
};