const fs = require('fs');
const path = require('path');



//const productos = require("../data/product.json");

const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}
//const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const productos = productList();

const productoController = {
  index: (req, res) => {
    res.redirect("/cart");
  },
  detail: (req, res) => {
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }

    res.render("details", { producto: producto });
  },

  cart: (req, res) => {
    res.render("productCart", { listaProductos: productos });
  },
  crear: (req, res) => {
    res.render("crearProducto");
  },

  guardarProducto: (req, res) => {
    const newProduct = {
      id: productos[productos.length - 1].id + 1,
      name: req.body.name,
      marca: req.body.marca,
      category: req.body.category,
      description: req.body.description,
      color: req.body.color,
      price: req.body.price,
      discount: req.body.discount,
    };
    productos.push(newProduct);
    res.redirect("/products");

    //fs.writeFileSync(productsFilePath, JSON.stringify(productos));
  },

  listar: (req, res) => {
    res.render("listarProducto", { listaProductos: productos });
  },
  modificar: (req, res) => {
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }
    res.render("modificarProducto", { producto: producto });
  },

  editar: (req, res) => {
    const id = req.params.id;
    productos.forEach((producto) => {
      if (producto.id == id) {
          producto.name = req.body.name;
           producto.description = req.body.description;
          producto.price = req.body.price;
           producto.color = req.body.color;
           producto.discount = req.body.discount;
      };
    });
    //fs.whriteFileSync(productsFilePath, JSON.stringify(productos));
    res.redirect("/products")

  },

  eliminar: (req,res) =>{
    const id = req.params.id;
   /*productos.forEach((product)=>{
    if (product.id == id) {
      delete product
   }})*/

   productos.filter((product)=>{
    return product.id !== id
   })
    res.redirect("/products")
  },

};

module.exports = productoController;





























        