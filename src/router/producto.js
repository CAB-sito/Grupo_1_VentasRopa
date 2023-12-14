const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "./images/imageProduct"));
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + Date.now());
  },
});

const update = multer({ storage: storage });

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.get("/cart", controller.cart);
router.get("/crear", controller.crear);
router.get("/modificar/listado", controller.listar);
router.get("/modificar/:id", controller.modificar);

module.exports = router;
