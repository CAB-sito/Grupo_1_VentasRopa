
const db = require("../database/models");



const controller = {
  home: (req, res) => {
   
    db.Producto.findAll({
      include: ["CategoriaProducto"],
    }).then((productos) => {
      const productosDestacados = productos.filter(
        (product) => product.id_categoria == 1
      );
      const ofertas = productos.filter((product) => product.id_categoria == 2);

      res.render("index", { productosDestacados, ofertas, usuario: req.session.usuario});
    });
  },
  register: (req, res) => {
    res.render("registro", { usuario: req.session.usuario });
  },
  login: (req, res) => {
    res.render(`login`, { usuario: req.session.usuario });
  },
  pregFrec: (req, res) => {
    res.render(`pregFrec`, { usuario: req.session.usuario });
  },
};
module.exports = controller;
