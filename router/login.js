const controllers = require("../controllers/loginController");
const express = require('express');
const router = express.Router();


router.get('/login', controllers.login);

module.exports=router;