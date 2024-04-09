const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const usersController = require("../controllers/usersController");
const { check } = require("express-validator");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddlewareLogin = require("../middlewares/authMiddlewareLogin");
const db = require("../database/models");

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

const validacionesRegistro = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener un minimo de 2 caracteres"),
  check("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe tener un minimo de 2 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Email no válido")
    .custom((value) => {
      return db.Usuario.findOne({ where: { email: value } }).then((usuario) => {
        if (usuario) {
          return Promise.reject("Este correo electrónico ya está en uso");
        }
      });
    }),
  check("direccion").notEmpty().withMessage("La direccion es obligatorio"),
  check("ciudad").notEmpty().withMessage("La ciudad es obligatorio"),
  check("codigoPostal")
    .isLength({ min: 4 })
    .withMessage("el codigo postal debe tener al menos 4 caracteres"),
  check("categoria")
    .isWhitelisted(["1", "2"])
    .withMessage("La categoria es obligatoria"),
  check("imagen").custom((value, { req }) => {
    let file = req.file;
    let extencionesAceptadas = [".jpg", ".jpeg", ".png", ".gif"];
    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!extencionesAceptadas.includes(fileExtension)) {
        throw new Error(
          "Las extensiones de archivo permitidas son " +
            extencionesAceptadas.join(",")
        );
      }
    }
    return true;
  }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe ser de al menos 8 caracteres"),
];

//perfil:
router.get("/perfil", authMiddlewareLogin, usersController.usuario);

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
  update.single("imagen"),
  validacionesRegistro,
  usersController.registrarUsuario
);

router.post("/perfil", usersController.cerrarSes);

module.exports = router;
