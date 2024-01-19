const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userFilePath = path.resolve(__dirname, "../data/user.json");
function userList() {
  return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
}

const usersController = {
  /*listarUsuario: (req, res) => {
        const usuarios = userList();
        res.render("", { listaProductos: productos });
      },*/
  usuario: (req, res) => {
    const usuario = req.session.usuario;

    if (!usuario) {
      return res.redirect("/registro");
    }

    res.render("perfil", { usuario: usuario });
  },

  registrarUsuario: (req, res) => {
    const usuarios = userList();
    let imagen;
    if (req.file) {
      imagen = req.file.filename;
    } else {
      imagen = "defaultUsers.jpg";
    }
    const newUsuario = {
      id: usuarios[usuarios.length - 1].id + 1,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      codigoPostal: req.body.codigoPostal,
      imagen: imagen,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    usuarios.push(newUsuario);
    res.redirect("/");

    fs.writeFileSync(userFilePath, JSON.stringify(usuarios));
  },

  login: function (req, res) {
    return res.render("login", { usuario: req.session.usuario });
  },

  processLogin: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let usersJSON = fs.readFileSync(
        path.resolve(__dirname, "../data/user.json"),
        {
          encoding: "utf-8",
        }
      );
      let users;
      if (usersJSON == "") {
        users = [];
      } else {
        users = JSON.parse(usersJSON);
      }

      let usuarioALoguearse;

      for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, users[i].password)) {
            usuarioALoguearse = users[i];
            break;
          }
        }
      }
      if (usuarioALoguearse == undefined) {
        return res.render("login", {
          errors: [{ msg: "Usuario o contraseña incorrectos" }],
          usuario: req.session.usuario,
        });
      }

      if (req.body.recordame) {
        res.cookie("recordame", usuarioALoguearse.email, {
          maxAge: 1000 * 60 * 30,
        });
      }

      req.session.usuario = usuarioALoguearse;
      res.redirect("/users/perfil");
    } else {
      return res.render("login", {
        errors: errors.errors,
        usuario: req.session.usuario,
      });
    }
  },
};

module.exports = usersController;
