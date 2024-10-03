const express = require("express");
const router = express.Router();

router.use(express.json());

const {createCart, getCartList, deleteCart} = require("../controller/CartController");


// 장바구니 담기
router.post('/', createCart);

// 회원별 장바구니 조회
router.get('/', getCartList);

// 장바구니 삭제
router.delete('/:c_idx', deleteCart);

module.exports = router;