const express = require('express');
const router = express.Router();
const conn = require('../db');
const {body, param, query, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json(err.array());
    }
    return next(); // 다음 할 일로 가라! (미들웨어, 함수)
}

router.post('/login',[
    body('email').notEmpty().isEmail(),
    body('pwd').notEmpty().isString(),
    validate
] ,
async (req,res) => {
    const {email, pwd} = req.body
    try{
        let user = await selectByEmailAndPwd(email,pwd);
        if(!user.length){
            return res.status(403).json(resJson("아이디 또는 비밀번호가 틀림"));
        }
        const token = jwt.sign({
            u_idx : user
        }, process.env.PRIVATE_KEY,{
            expiresIn : '30m', // 30분!
            issuer : "heewon" // 발행인
        });
        res.cookie("token",token,{
            httpOnly :true
        });
        return res.status(200).json(resJson("로그인 성공"));
    }catch(err){
        return res.status(500).json(resJson(err));
    }
}) // 로그인 api 

router.post('/users',[
    body('email').notEmpty().isEmail(),
    body('pwd').notEmpty().isString(),
    body('name').notEmpty().isString(),
    validate
] ,
async (req,res) => {
    const {email, pwd, name} = req.body
    try{
        let exist = await selectByEmail(email);
        if(exist.length){
            return res.status(400).json(resJson("이미 가입된 이메일 입니다."));
        }
        const userIdx = await insertUser(email, pwd, name);
        return res.json(resJson("성공", { idx : userIdx }));
    } catch(err){
        return res.status(500).json(resJson(err));
    }
}) // 회원 생성 api 

router.get('/users/:idx',[
    param('idx').notEmpty().isInt(),
    validate
] ,
async (req,res) => {
    const {idx} = req.params;
    try{
        let user = await selectByIdx(idx);
        if(!user.length){
            return res.status(400).json(resJson("객체없음"));
        }
        return res.status(200).json(resJson("개별 조회 성공",user));
    }catch(err){
        return res.status(500).json(resJson(err));
    }
}) // 회원 개별 조회 api

router.delete('/users', [
    body('idx').notEmpty().isInt(),
    validate
] ,
async (req,res) => {
    const {idx} = req.body
    try{
        let user = await selectByIdx(idx);
        if(!user.length){
            return res.status(400).json(resJson("객체없음"));
        }
        await deleteChannelByIdx(idx);
        await deleteByIdx(idx);
        return res.status(200).json(resJson("삭제 성공",user));
    }catch(err){
        return res.status(500).json(resJson(err));
    }
}) // 회원 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}

function insertUser(email,pwd,name){
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO user (u_email, u_pwd, u_name) VALUES (?,?,?)`,[email,pwd,name],
            function (err, results){
                if(err) return reject(err);
                resolve(results.insertId);
            }
        );
    }); // promise 함수 닫음
}

function selectByEmail(email){
    return new Promise((resolve, reject)=>{
        conn.query(
            `SELECT * FROM user WHERE u_email = "${email}" LIMIT 1`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function selectByIdx(idx){
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT * FROM user WHERE u_idx = ${idx} LIMIT 1`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function selectByEmailAndPwd(email,pwd){
    return new Promise((resolve, reject)=>{
        conn.query(
            `SELECT * FROM user WHERE u_email = ? and u_pwd = ? LIMIT 1`,[email,pwd],
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function deleteByIdx(idx){
    return new Promise((resolve, reject)=>{
        conn.query(
            `DELETE FROM user WHERE u_idx = ${idx}`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function deleteChannelByIdx(idx){
    return new Promise((resolve, reject)=>{
        conn.query(
            `DELETE FROM channel WHERE u_idx = ${idx}`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

module.exports = router;