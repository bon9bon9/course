const express = require("express");
const router = express.Router();

router.use(express.json());

const {getCategory} = require('../controller/CategoryController');

router.get('/',getCategory);

module.exports = router;