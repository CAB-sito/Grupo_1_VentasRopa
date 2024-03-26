const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.listar);

router.get("/users/:id", usersController.detallesUsuario);

module.exports = router;
