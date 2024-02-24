//const fs = require("fs");
//const path = require("path");
const db = require("../database/models");

/*const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}*/

const controller = {
  home: (req, res) => {
    let oferta = db.Producto.findAll({where:{categoria: 2}})
    .then((ofertas)=>{
      return ofertas;
    })

    let normal = db.Producto.findAll({where:{categoria: 1}})
    .then((productos)=>{
      return productos;
    })
    res.render("index", {productosDestacados: normal,ofertas : oferta, usuario: req.session.usuario})

    /*productos = productList();
    const productosDestacados = productos.filter(
      (product) => product.category == "productos destacados"
    );
    const ofertas = productos.filter((product) => product.category == "Oferta");
    res.render("index", {
      productosDestacados,
      ofertas,
      usuario: req.session.usuario,
    });*/
  },
  register: (req, res) => {
    res.render("registro", { usuario: req.session.usuario });
  },
  login: (req, res) => {
    res.render(`login`, { usuario: req.session.usuario });
  },
};
module.exports = controller;
