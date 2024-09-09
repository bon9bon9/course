const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());

let channelDB = new Map();
let idx = 0;

app.post('/channels', (req,res) => {
    const {title} = req.body
    if(title === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    channelDB.set(++idx, {title : title});
    res.json(resJson("생성 성공",{title : title}));
}) // 채널 생성 api 

app.get('/channels', (req,res) => {
    // Map을 객체로 변환
    const jsonObj = Object.fromEntries(channelDB);
    // 객체를 JSON 문자열로 변환
    res.json(resJson("전체 조회 성공",jsonObj));
}) // 채널 전체 조회 api

app.get('/channels/:id', (req,res) => {
    const {id} = req.params;
    if(id === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let channel = channelDB.get(parseInt(id));
    if(!channel){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("조회 성공",channel));
}) // 채널 개별 조회 api

app.delete('/channels', (req,res) => {
    const {id} = req.body
    if(id === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let channel = channelDB.get(parseInt(id));
    if(!channel){
        return res.status(404).json(resJson("객체 없음"));
    }
    channelDB.delete(parseInt(id));
    res.json(resJson("삭제 성공",{title : channel.title}));
}) // 채널 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}