const express = require("express");
const router = express.Router();

router.use(express.json());

const { likeOrCancel } = require("../controller/LikeController");

// 좋아요/좋아요 취소

router.post('/:b_idx', likeOrCancel);

module.exports = router;