const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());

let userDB = new Map();
app.post('/login', (req,res) => {
    const {id, pwd} = req.body
    if(id === undefined || pwd === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = userDB.get(id);
    if(!user || user.pwd != pwd){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("성공",{id : id, name : user.name}));
}) // 로그인 api 

app.post('/users', (req,res) => {
    const {id, pwd, name} = req.body
    if(id === undefined || pwd === undefined || name === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    if(userDB.get(id)){
        return res.status(400).json(resJson("이미 가입된 아이디 입니다."));
    }
    userDB.set(id, {pwd : pwd, name : name});
    res.json(resJson("성공",{name : name}));
}) // 회원 생성 api 

app.get('/users/:id', (req,res) => {
    const {id} = req.params;
    let user = userDB.get(id);
    if(!user){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("조회 성공",{id : id, name : user.name}));
}) // 회원 개별 조회 api

app.delete('/users', (req,res) => {
    const {id} = req.body
    if(id === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = userDB.get(id);
    if(!user){
        return res.status(404).json(resJson("객체 없음"));
    }
    userDB.delete(id);
    res.json(resJson("탈퇴 성공",{name : user.name}));
}) // 회원 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}