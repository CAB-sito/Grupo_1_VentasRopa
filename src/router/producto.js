const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/images/products"));
  },
  filename: (req, file, cb) => {
    const nombre = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);
    cb(null, nombre + "-" + Date.now() + extension);
  },
});

const update = multer({ storage: storage });

router.get("/", controller.listar);
router.get("/cart", controller.cart);
router.get("/create", controller.crear);
router.get("/detail/:id", controller.detail);
router.get("/:id/edit", controller.modificar);
// Añadir ruta post /
// Añadir ruta put /:id
// Añadir ruta delete /:id

module.exports = router;
