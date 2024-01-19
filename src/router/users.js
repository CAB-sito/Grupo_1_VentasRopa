const controller = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const usersController = require("../controllers/usersController");
const { check } = require("express-validator");

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
router.get("/perfil", usersController.usuario);

//login
router.get("/login", usersController.login);
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
  usersController.registrarUsuario
);

module.exports = router;
