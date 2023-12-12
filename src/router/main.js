const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

const routes ={
    home:"/",
    register:"/registro",
    login:"/login"
}

router.get(routes.home, mainController.home);
router.get(routes.login, mainController.login);
router.get(routes.register, mainController.register);

module.exports = router;