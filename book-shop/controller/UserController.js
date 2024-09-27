
const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {StatusCodes} = require('http-status-codes');

dotenv.config();

const {sendSql, sendSqlWithData, resJson, resSuccessJson, encodePwd, comparePwd} = require('../common');

const join = (req,res) => {
    const {email, pwd} = req.body;
    const {salt , newPwd} = encodePwd(pwd);
    let sql = 'INSERT INTO user (u_email, u_pwd, u_salt) values(?,?,?)';
    let values = [email, newPwd, salt];
    conn.query(sql, values, (err,results) => {
        if (err){
            if(err.code === 'ER_DUP_ENTRY')
                return res.status(StatusCodes.BAD_REQUEST).json(resJson("중복된 아이디",-2));
            else
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(resJson("실패",-1,err));
        }
        res.status(StatusCodes.CREATED).json(resSuccessJson(results.insertId));
    });
}
const login = (req,res) => {
    const {email, pwd} = req.body;
    let sql = 'SELECT * FROM user WHERE u_email = ?';
    let values = [email];
    let token;
    conn.query(sql,values,(err,results) => {
        if(!results.length){
            return res.status(StatusCodes.UNAUTHORIZED).json(resJson("아이디 또는 비밀번호가 틀림", -1));
        }
        let user = results[0];
        if(!comparePwd(user.u_pwd, user.u_salt, pwd)){
            return res.status(StatusCodes.UNAUTHORIZED).json(resJson("아이디 또는 비밀번호가 틀림", -1));
        }
        token = jwt.sign({
            u_idx : user.u_idx
        }, process.env.PRIVATE_KEY,{
            expiresIn : '30m', // 30분!
            issuer : "heewon" // 발행인
        });
        res.cookie("token",token,{
            httpOnly :true
        });
        res.json(resSuccessJson(token));
    });

};

const reset_post = (req,res) => {
    const {email} = req.body;
    conn.query(`SELECT * FROM user WHERE u_email = ?`, [email], (err, results) => {
        if(!results.length){
            return res.status(403).json(resJson("존재하지 않는 아이디 입니다.",-1));
        }
        res.json(resSuccessJson(results[0].u_idx));
    })
};

const reset_put = (req,res) => {
    const {idx, pwd} = req.body;
    const {salt , newPwd} = encodePwd(pwd);
    conn.query(`UPDATE user SET u_pwd = ?, u_salt = ? WHERE u_idx = ?`, 
        [newPwd, salt, idx], 
        (err, results) => {
            res.json(resSuccessJson());
    });

};



module.exports = {join, login, reset_post, reset_put}