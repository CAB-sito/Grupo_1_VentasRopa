const fs = require("fs");
const path = require('path');
const bcrypt = require('bcryptjs');

const userFilePath = path.resolve(__dirname, "../data/user.json");
function userList() {
  return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
}

const userController = {
    /*listarUsuario: (req, res) => {
        const usuarios = userList();
        res.render("", { listaProductos: productos });
      },*/
    usuario: (req, res) => {
        const usuarios = userList();
        const id = req.params.id;
        const usuario = usuarios.find((el) => el.id == id);
    
        if (!usuario) {
          res.redirect("/registro");
        }
    
        res.render("perfil", { usuario: usuario });
      },

     
  registrarUsuario: (req, res) => {
    const usuarios = userList();
    let imagen;
    if(req.file){
      imagen = req.file.filename;
    }else{
      imagen = "defaultUsers.jpg";
    }
    const newUsuario = {
      id: usuarios[usuarios.length - 1].id + 1 ,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      direccion: req.body.direccion,
      ciudad: req.body.ciudad,
      codigoPostal: req.body.codigoPostal,
      imagen: imagen,
      password:bcrypt.hashSync(req.body.password, 10),
    };
    usuarios.push(newUsuario);
    res.redirect("/");

    fs.writeFileSync(userFilePath , JSON.stringify(usuarios));
  },
}

module.exports = userController;

