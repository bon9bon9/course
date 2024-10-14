const express = require("express");
const router = express.Router();

router.use(express.json());

const {
    order,
    orderList,
    orderDetailList
} = require('../controller/OrdersController')


// 주문하기
router.post('/',order);

// 주문 목록 조회
router.get('/',[

], orderList);

// 주문 상세
router.get('/:o_idx',[

],orderDetailList);

module.exports = router;