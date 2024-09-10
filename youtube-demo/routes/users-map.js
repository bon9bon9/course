const express = require('express');
const router = express.Router();
router.use(express.json());

let userDB = new Map();
let idx = 0;

router.post('/login', (req,res) => {
    const {id, pwd} = req.body
    if(id === undefined || pwd === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = undefined;
    userDB.forEach((value,key) => {
        if(value.id == id && value.pwd == pwd){
            user = JSON.parse(JSON.stringify(value))        
            user.idx = key
            delete user.pwd;
        }
    })
    if(!user){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("성공",user));
}) // 로그인 api 

router.post('/users', (req,res) => {
    const {id, pwd, name} = req.body
    if(id === undefined || pwd === undefined || name === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = undefined;
    userDB.forEach((value) => {
        if(value.id == id){
            user = value;
        }
    })
    if(user){
        return res.status(400).json(resJson("이미 가입된 아이디 입니다."));
    }
    userDB.set(++idx, {id : id, pwd : pwd, name : name});
    res.json(resJson("성공",{name : name}));
}) // 회원 생성 api 

router.get('/users/:idx', (req,res) => {
    const {idx} = req.params;
    let user = userDB.get(parseInt(idx));
    if(!user){
        return res.status(404).json(resJson("객체 없음"));
    }
    res.json(resJson("조회 성공",{id : user.id, name : user.name}));
}) // 회원 개별 조회 api

router.get('/users', (req,res) => {
    // Map을 객체로 변환
    const jsonObj = Object.fromEntries(userDB);
    res.json(resJson("전체 조회 성공",jsonObj));
}) // 회원 전체 조회 api

router.delete('/users', (req,res) => {
    const {idx} = req.body
    if(idx === undefined){
        return res.status(400).json(resJson("필수값 없음"));
    }
    let user = userDB.get(parseInt(idx));
    if(!user){
        return res.status(404).json(resJson("객체 없음"));
    }
    userDB.delete(parseInt(idx));
    res.json(resJson("탈퇴 성공",{name : user.name}));
}) // 회원 탈퇴 api

function resJson(message,data){
    return {message : message, data : data};
}

module.exports = {userDB, router};