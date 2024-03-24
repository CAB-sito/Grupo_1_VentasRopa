const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

/*
const userFilePath = path.resolve(__dirname, "../data/user.json");
function userList() {
  return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
}*/

const usersController = {
  /*listarUsuario: (req, res) => {
        const usuarios = userList();
        res.render("", { listaProductos: productos });
      },*/
  registrarUsuario: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
    
      
      let imagen;
      if (req.file) {
        imagen = req.file.filename;
      } else {
        imagen = "defaultUsers.jpg";
      }
      req.session.usuario={
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        codigo_postal: req.body.codigoPostal,
        ciudad: req.body.ciudad,
        contrasenia: bcrypt.hashSync(req.body.password, 10),
        imagen: imagen,
        id_categoria: req.body.login,
      }
      
      db.Usuario.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        direccion: req.body.direccion,
        codigo_postal: req.body.codigoPostal,
        ciudad: req.body.ciudad,
        contrasenia: bcrypt.hashSync(req.body.password, 10),
        imagen: imagen,
        id_categoria: req.body.login,
      })
      .then(()=>{
        res.redirect("/")
      })
      
    } else {
      return res.render("registro", {
        errors: errors.errors,
      });
    }
  },

  usuario: (req, res) => {
    const usuario = req.session.usuario;

    res.render("perfil", { usuario: usuario });
  },

  login: function (req, res) {
    return res.render("login", { usuario: req.session.usuario });
  },

  processLogin: function (req, res) {
    const {password, email, recordame} = req.body;
    let users;
    db.Usuario.findAll()
     .then((data)=> users = data)
     .then(()=>{let errors = validationResult(req);
      console.log( typeof users)
      if (errors.isEmpty()) {
        
        let usuarioALoguearse;
  
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == email) {
            if (bcrypt.compareSync(password, users[i].contrasenia)) {
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
  
        if (recordame) {
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
    })}
    ,
  cerrarSes: (req, res) => {
    res.clearCookie("Recordame");
    req.session.usuario = undefined;
    res.redirect("/");
  },
};

module.exports = usersController;
