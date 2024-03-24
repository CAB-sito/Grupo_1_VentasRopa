const controller = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const usersController = require("../controllers/usersController");
const { check } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public/images/users"));
  },
  filename: (req, file, cb) => {
    const nombre = file.originalname.split(".")[0];
    const extension = path.extname(file.originalname);
    cb(null, nombre + "-" + Date.now() + extension);
  },
});

const update = multer({ storage: storage });

//perfil:
router.get("/perfil", authMiddleware, usersController.usuario);

//login
router.get("/login", guestMiddleware, usersController.login);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email no válido"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("La contraseña debe ser de al menos 8 caracteres"),
  ],
  usersController.processLogin
);

//registro con post:
router.post(
  "/registro",
  //  [
  //    check("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),
  //    check("apellido").not().isEmpty().withMessage("El apellido es obligatorio"),
  //    check("email").isEmail().withMessage("Email no válido"),
  //    check("direccion")
  //     .not()
  //     .isEmpty()
  //     .withMessage("La direccion es obligatorio"),
  //    check("ciudad").not().isEmpty().withMessage("La ciudad es obligatorio"),
  //   check("codigoPostal")
  //      .isPostalCode("any")
  //     .isLength({ min: 4 })
  //       .withMessage("el codigo postal debe tener al menos 4 caracteres"),
  //     check("categoria")
  //      .not()
  //       .isEmpty()
  //       .withMessage("La categoria es obligatoria"),
  //     /*check("imagen")
  //       .extensions(["jpg", "png", "jpeg"])
  //       .withMessage("La imagen debe ser jpg, jpeg o png"),*/
  //     check("password")
  //       .isLength({ min: 8 })
  //       .withMessage("La contraseña debe ser de al menos 8 caracteres"),
  //   ],
  update.single("imagen"),
  usersController.registrarUsuario
);

router.post("/perfil", usersController.cerrarSes);

module.exports = router;