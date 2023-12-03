const controllers = require("../controllers/indexController");
const express = require('express');
const router = express.Router();


router.get('/', controllers.index);

module.exports=router;