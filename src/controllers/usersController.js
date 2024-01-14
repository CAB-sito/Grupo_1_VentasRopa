const fs = require("fs");
const path = require('path');

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
      }
}

module.exports = userController;

