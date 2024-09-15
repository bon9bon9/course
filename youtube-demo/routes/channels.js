const express = require('express');
const router = express.Router();
const conn = require('../db');

router.use(express.json());

router.post('', async (req,res) => {
    const {name, userIdx} = req.body
    if(name === undefined || userIdx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    try{
        let user = await selectUserByUserIdx(userIdx);
        if(!user){
            return res.status(400).json(resJson("잘못된 userIdx"));
        }
        let channelCnt = await countByUserIdx(userIdx);
        if(channelCnt >= 100){
            return res.status(400).json(resJson("최대 채널 갯수 초과"));
        }
        let channelIdx = await insertChannel(name, userIdx);
        res.json(resJson("생성 성공",{channelIdx : channelIdx}));
    }catch(err){
        res.status(500).json(resJson(err))

    }    
}) // 채널 생성 api 

router.get('', async (req,res) => {
    // Map을 객체로 변환
    const {userIdx} = req.query;
    try{
        let channels = await selectByUserIdx(userIdx);
        res.json(resJson("내 전체 채널 반환 성공",channels));
    }catch(err){
        res.status(500).json(resJson(err))
    }    
}) // 채널 전체 조회 api

router.get('/:idx', async (req,res) => {
    const {idx} = req.params;
    if(idx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
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

router.put('', async (req,res) => {
    const {idx, userIdx, name} = req.body
    if(idx === undefined || userIdx === undefined || name === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
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

router.delete('', async (req,res) => {
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
            `SELECT count(*) FROM channel WHERE u_idx = ${idx} LIMIT 1`,
            function(err,results){
                if(err) return reject(err);
                resolve(results);
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