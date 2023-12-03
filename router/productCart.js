const controllers = require("../controllers/productCartController");
const express = require('express');
const router = express.Router();


router.get('/productCart', controllers.productCart);

module.exports=router;