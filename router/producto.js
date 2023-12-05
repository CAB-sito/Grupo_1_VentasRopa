const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();

router.get("/detail", controller.detail);
router.get("/cart", controller.cart);
router.get("/crear", controller.crear);
router.get("/modificar", controller.modificar);

module.exports = router;
