const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const productoController = require("../controllers/productoController");

//api usuario
router.get("/users", usersController.listar);
router.get("/users/:id", usersController.detallesUsuario);

//api producto 
router.get("/products", productoController.listarApi);
router.get("/products/:id", productoController.detailApi);

module.exports = router;