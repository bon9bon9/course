const express = require("express");
const router = express.Router();

router.use(express.json());

const {getAll, getDetail} = require('../controller/BookController');

// 전체 도서 조회
router.get('/',getAll);

// 개별 도서 조회
router.get('/:idx',getDetail);

module.exports = router;