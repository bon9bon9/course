const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());

router.post('/login', async (req,res) => {
    const {email, pwd} = req.body
    if(email === undefined || pwd === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    try{
        let user = await selectByEmailAndPwd(email,pwd);
        if(!user.length){
            return res.status(400).json(resJson("객체없음"));
        }
        return res.status(200).json(resJson("로그인 성공",user));
    }catch(err){
        return res.status(500).json(resJson(err));
    }
}) // 로그인 api 

router.post('/users', async (req,res) => {
    const {email, pwd, name} = req.body
    if(email === undefined || pwd === undefined || name === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
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

router.get('/users/:idx', async (req,res) => {
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

router.delete('/users', async (req,res) => {
    const {idx} = req.body
    if(idx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
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