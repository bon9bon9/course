const express = require("express");
const router = express.Router();

router.use(express.json());

const {getAll, getDetail, getReview} = require('../controller/BookController');

// 전체 도서 조회
router.get('/',getAll);

// 개별 도서 조회
router.get('/:idx',getDetail);

router.get('/reviews/:idx', getReview);

module.exports = router;