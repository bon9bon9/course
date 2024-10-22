const express = require('express');
const router = express.Router();
router.use(express.json());
const jwt = require('jsonwebtoken');


const {join, login, reset_post, reset_put} = require('../controller/UserController');

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', reset_post);

// 비밀번호 초기화
router.put('/reset', reset_put);

router.get('/jwt/decoded',function(req,res){
  const token = req.headers['authorization']; // Bearer 토큰 형식으로 받음
  var decoded = jwt.verify(token,process.env.PRIVATE_KEY);
  res.send(decoded);

})

module.exports = router;