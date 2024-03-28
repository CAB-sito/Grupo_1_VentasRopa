const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const productoController = require("../controllers/productoController");

//api usuario
router.get("/users", usersController.listar);
router.get("/users/:id", usersController.detallesUsuario);

//api producto 
router.get("/products", productoController.listar);
router.get("/products/:id", productoController.detail);
router.post("/products", productoController.crear);
router.put("/products/:id", productoController.modificar);
router.delete("/products/:id", productoController.eliminar);


module.exports = router;