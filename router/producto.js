const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.get("/cart", controller.cart);
router.get("/crear", controller.crear);
router.get("/modificar", controller.modificar);

module.exports = router;
