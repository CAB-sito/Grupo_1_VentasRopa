const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const multer = require("multer");
const path = require("path");
const guestMiddleware = require("../middlewares/guestMiddleware");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "./images/imageUser"));
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + Date.now());
  },
});

const update = multer({ storage: storage });

const routes = {
  home: "/",
  register: "/registro",
  pregFrec: "/pregFrec",
  /*login: "/login",*/
};

router.get(routes.home, mainController.home);
/*router.get(routes.login, mainController.login);*/
router.get(routes.register, guestMiddleware, mainController.register);
router.get(routes.pregFrec, mainController.pregFrec);
module.exports = router;
