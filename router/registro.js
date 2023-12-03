const controllers = require("../controllers/registroController");
const express = require('express');
const router = express.Router();


router.get('/registro', controllers.registro);

module.exports=router;