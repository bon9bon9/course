const express = require('express');
const router = express.Router();
const conn = require('../db');
const {body, param, query, validationResult} = require('express-validator')

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json(err.array());
    }
    return next(); // 다음 할 일로 가라! (미들웨어, 함수)
}

router.post('', [
    body('userIdx').notEmpty().isInt(),
    body('name').notEmpty().isString(),
    validate
],
async (req,res) => {
    const {name, userIdx} = req.body
    try{
        let user = await selectUserByUserIdx(userIdx);
        if(!user.length){
            return res.status(400).json(resJson("잘못된 userIdx"));
        }
        let channelCnt = await countByUserIdx(userIdx);
        if(channelCnt >= 9){
            return res.status(400).json(resJson("최대 채널 갯수 초과"));
        }
        let channelIdx = await insertChannel(name, userIdx);
        res.json(resJson("생성 성공",{channelIdx : channelIdx}));
    }catch(err){
        res.status(500).json(resJson(err))

    }    
}) // 채널 생성 api 

router.get('',[
    query('userIdx').notEmpty().isInt(),
    validate
], 
async (req,res) => {
    const {userIdx} = req.query;
    try{
        let channels = await selectByUserIdx(userIdx);
        res.json(resJson("내 전체 채널 반환 성공",channels));
    }catch(err){
        res.status(500).json(resJson(err))
    }    
}) // 채널 전체 조회 api

router.get('/:idx',[
    param('idx').notEmpty().isInt(),
    validate
], 
async (req,res) => {
    const {idx} = req.params;
    try{
        let channels = await selectByChannelIdx(idx);
        if(!channels.length){
            return res.status(404).json(resJson("객체 없음"));
        }
        res.json(resJson("내 채널 반환 성공",channels));
    }catch(err){
        res.status(500).json(resJson(err))
    }      
}) // 채널 개별 조회 api

router.put('',[
    body('idx').notEmpty().isInt(),
    body('userIdx').notEmpty().isInt(),
    body('name').notEmpty().isString(),
    validate
] ,
async (req,res) => {
    const {idx, userIdx, name} = req.body
    try{
        let channels = await selectByChannelIdx(idx);
        if(!channels.length){
            return res.status(404).json(resJson("객체 없음"));
        }
        if(channels[0].u_idx != parseInt(userIdx)){
            return res.status(503).json(resJson("수정 권한 없음"));
        }
        await updateSetChannelName(idx, userIdx, name);
        res.json(resJson("내 채널 수정 성공",channels));
    }catch(err){
        res.status(500).json(resJson(err))
    }      
}) // 채널명 수정 api

router.delete('',[
    body('idx').notEmpty().isInt(),
    body('userIdx').notEmpty().isInt(),
    validate
], 
async (req,res) => {
    const {idx, userIdx} = req.body
    if(idx === undefined || userIdx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    try{
        let channels = await selectByChannelIdx(idx);
        if(!channels.length){
            return res.status(404).json(resJson("객체 없음"));
        }
        if(channels[0].u_idx != parseInt(userIdx)){
            return res.status(503).json(resJson("삭제 권한 없음"));
        }
        await deleteByIdx(idx, userIdx);
        res.json(resJson("내 채널 삭제 성공",channels));
    }catch(err){
        res.status(500).json(resJson(err))
    }      
}) // 채널 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}

function selectUserByUserIdx(idx){
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

function selectByUserIdx(idx){
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT * FROM channel WHERE u_idx = ${idx}`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function updateSetChannelName(c_idx, u_idx,c_name){
    return new Promise((resolve, reject) => {
        conn.query(
            `UPDATE channel SET c_name = ? WHERE c_idx = ? AND u_idx = ?`,[c_name,c_idx,u_idx],
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function selectByChannelIdx(idx){
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT * FROM channel WHERE c_idx = ${idx} LIMIT 1`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

function countByUserIdx(idx){
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT count(*) as cnt FROM channel WHERE u_idx = ${idx} LIMIT 1`,
            function(err,results){
                if(err) return reject(err);
                resolve(results[0].cnt);
            }
        );
    });
}

function insertChannel(name,userIdx){
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT INTO channel (c_name, u_idx) VALUES (?,?)`,[name,userIdx],
            function (err, results){
                if(err) return reject(err);
                resolve(results.insertId);
            }
        );
    }); // promise 함수 닫음
}

function deleteByIdx(idx, u_idx){
    return new Promise((resolve, reject)=>{
        conn.query(
            `DELETE FROM channel WHERE u_idx = ${u_idx} and c_idx = ${idx}`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
            }
        );
    });
}

module.exports = router;