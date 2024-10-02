const conn = require('./mariadb');
const crypto = require('crypto'); // 기본 모듈 : 암호화를 담당


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

const resSuccessJson = (data) => {
    return {message : "성공", code : 1, data : data};
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
module.exports = { 
    sendSql, 
    sendSqlWithData, 
    resJson, 
    resSuccessJson, 
    encodePwd, 
    comparePwd
};