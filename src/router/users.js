const controller = require("../controllers/usersController");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

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
router.get("/perfil/:id", controller.usuario);

//registro con post:
router.post("/registro", update.single("imagen") , controller.registrarUsuario)

module.exports = router;