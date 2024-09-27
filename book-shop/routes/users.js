const express = require('express');
const router = express.Router();
router.use(express.json());

const {join, login, reset_post, reset_put} = require('../controller/UserController');

// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', reset_post);

// 비밀번호 초기화
router.put('/reset', reset_put);

module.exports = router;