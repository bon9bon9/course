const express = require('express');
const router = express.Router();
router.use(express.json());

const {userDB} = require('./users-map');

let channelDB = new Map();
let idx = 0;

router.post('', (req,res) => {
    const {title, userIdx} = req.body
    if(title === undefined || userIdx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = userDB.get(userIdx);
    if(!user){
        return res.status(400).json(resJson("잘못된 userIdx"));
    }
    let channelCnt = 0;
    for (const value of channelDB.values()) {
        if (channelCnt >= 100) return res.status(400).json(resJson("생성 최대 100개 초과"));
        if (value.userIdx == userIdx) {
            channelCnt++;
        }
    }
    channelDB.set(++idx, {title : title, userIdx : userIdx});
    res.json(resJson("생성 성공",{title : title}));
}) // 채널 생성 api 

router.get('', (req,res) => {
    // Map을 객체로 변환
    const {userIdx} = req.query;
    let channels = [];
    channelDB.forEach((value) => {
        if(value.userIdx == parseInt(userIdx)){
            channels.push(value)
        }
    })
    res.json(resJson("전체 조회 성공",channels));
}) // 채널 전체 조회 api

router.get('/:id', (req,res) => {
    const {id} = req.params;
    const {userIdx} = req.query;
    if(id === undefined || userIdx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let channel = channelDB.get(parseInt(id));
    if(!channel || channel.userIdx != userIdx){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("조회 성공",channel));
}) // 채널 개별 조회 api

router.put('', (req,res) => {
    const {id, userIdx, title} = req.body
    if(id === undefined || userIdx === undefined || title === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let channel = channelDB.get(parseInt(id));
    if(!channel || channel.userIdx != userIdx){
        return res.status(404).json(resJson("객체 없음"));
    }
    channel.title = title;
    res.json(resJson("수정 성공",channel));
}) // 채널명 수정 api

router.delete('', (req,res) => {
    const {id, userIdx} = req.body
    if(id === undefined || userIdx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let channel = channelDB.get(parseInt(id));
    if(!channel || channel.userIdx != userIdx){
        return res.status(404).json(resJson("객체 없음"));
    }
    channelDB.delete(parseInt(id));
    res.json(resJson("삭제 성공",{title : channel.title}));
}) // 채널 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}

module.exports = router;