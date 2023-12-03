const controllers = require("../controllers/productDtailController");
const express = require('express');
const router = express.Router();


router.get('/productDtail', controllers.produtcDtail);

module.exports=router;