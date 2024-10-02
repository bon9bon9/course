const express = require("express");
const router = express.Router();

router.use(express.json());

const {getAll, getDetail, getCategory} = require('../controller/BookController');

// 전체 도서 조회
router.get('/',getAll);

// 개별 도서 조회
// router.get('/:b_idx',getDetail);

router.get('/category',getCategory)

module.exports = router;