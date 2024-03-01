//const fs = require("fs");
//const path = require("path");
const db = require("../database/models");

/*const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}*/

const controller = {
  home: (req, res) => {
    //productos = db.Producto.findAll({include:["CategoriaProducto"]});
    db.Producto.findAll({
      include:["CategoriaProducto"]
    })
      .then((productos)=>{
        const productosDestacados = productos.filter((product) => product.id_categoria == 1);
        const ofertas = productos.filter((product) => product.id_categoria == 2)
        
        res.render("index", {productosDestacados,ofertas, usuario: req.session.usuario})
      })
    
  
    //const productosDestacados = productos.filter((product) => product.compra.id == 1);
    //const ofertas = productos.filter((product) => product.compra.id == 2);

    //res.render("index", {productosDestacados,ofertas, usuario: req.session.usuario})

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
