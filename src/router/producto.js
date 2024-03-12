const controller = require("../controllers/productoController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middlewares/authMiddleware");
const {body} = require('express-validator');

const validacionesProductos = [
  body('name').notEmpty().withMessage("Campo obligatorio").bail()
  .isLength({ min:5 }).withMessage("Debe tener como mínimo 5 caracteres"),
  body('description').notEmpty().withMessage("El producto debe tener una descripción").bail()
  .isLength({ min:20 }).withMessage("Debe tener como mínimo 20 caracteres"),
  body('imagen').custom((value, {req})=>{
    let file = req.file;
    let extencionesAceptadas= ['.jpg', '.jpeg' , '.png' , '.gif'];
    if(!file){
      throw new Error('Tienes que subir una imagen');
    }else{
      let fileExtension = path.extname(file.originalname);
      if(!extencionesAceptadas.includes(fileExtension)){
        throw new Error('Las extensiones de archivo permitidas son ' + extencionesAceptadas.join(','))    
      }
    }
    return true;
  }),
  body('price').notEmpty().withMessage("Campo obligatorio"),
  body('color').notEmpty().withMessage("Debe elegir un color"),
  body('cat_pro').notEmpty().withMessage("Debe elegir una categoria"),
  body('talle').notEmpty().withMessage("Debe elegir un talle")  
  //colores y talles no estan en la base de datos
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
router.put("/:id", update.single("imagen"), validacionesProductos, controller.editar)
// Añadir ruta delete /:id
router.delete("/:id", controller.eliminar)

module.exports = router;
