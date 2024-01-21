const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");

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
router.get("/create",authMiddleware, controller.crear);
router.get("/detail/:id", controller.detail);
router.get("/:id/edit", authMiddleware ,controller.modificar);
// Añadir ruta post /
router.post("/", update.single("imagen"), controller.guardarProducto)
// Añadir ruta put /:id
router.put("/:id", update.single("image"), controller.editar)
// Añadir ruta delete /:id
router.delete("/:id", controller.eliminar)

module.exports = router;
