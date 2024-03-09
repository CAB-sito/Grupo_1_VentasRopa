const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const {body} = require('express-validator');

const validacionesProductos = [
  body('name').notEmpty().withMessage("Campo obligatorio")
  .isLength({ min:5 }).withMessage("Debe tener como mínimo 5 caracteres").bail(),
  body('description').isLength({ min:20 }).withMessage("Debe tener como mínimo 20 caracteres").bail()
  //faltan imágenes, colores y talles (estos últimos 2 no estan en la base de datos)
]

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
router.post("/", update.single("imagen"), validacionesProductos, controller.guardarProducto)
// Añadir ruta put /:id
router.put("/:id", update.single("image"), validacionesProductos, controller.editar)
// Añadir ruta delete /:id
router.delete("/:id", controller.eliminar)

module.exports = router;
