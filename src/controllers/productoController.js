const fs = require("fs");
const path = require('path');

//const productos = require("../data/product.json");

const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}
//const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const productoController = {
  index: (req, res) => {
    res.redirect("/cart");
  },
  detail: (req, res) => {
    const productos = productList();
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }

    res.render("details", { producto: producto });
  },

  cart: (req, res) => {
    const productos = productList();
    res.render("productCart", { listaProductos: productos });
  },
  crear: (req, res) => {
    res.render("crearProducto");
  },

  guardarProducto: (req, res) => {
    const productos = productList();
    let imagen;
    if(req.file){
      imagen = req.file.filename;
    }else{
      imagen = "default.png";
    }
    const newProduct = {
      id: productos[productos.length - 1].id + 1,
      name: req.body.name,
      marca: req.body.marca,
      image: imagen,
      category: req.body.category,
      description: req.body.description,
      color: req.body.color,
      price: req.body.price,
      discount: req.body.discount,
    };
    productos.push(newProduct);
    res.redirect("/products");

    fs.writeFileSync(productsFilePath, JSON.stringify(productos));
  },

  listar: (req, res) => {
    const productos = productList();
    res.render("listarProducto", { listaProductos: productos });
  },
  modificar: (req, res) => {
    const productos = productList();
    const id = req.params.id;
    const producto = productos.find((el) => el.id == id);

    if (!producto) {
      return res.send("No se encontro el producto");
    }
    res.render("modificarProducto", { producto: producto });
  },

  editar: (req, res) => {
    const productos = productList();
    const id = req.params.id;
    let imagen;
    if(req.file){
      imagen = req.file.filename;
    }else{
      imagen = "default.png";
    }
    productos.forEach((producto) => {
      if (producto.id == id) {
  
        producto.name = req.body.name;
        producto.description = req.body.description;
        producto.marca = req.body.marca;
        producto.image = imagen;
        producto.price = req.body.price;
        producto.color = req.body.color;
        producto.discount = req.body.discount;
      }
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(productos));

    res.redirect("/products");
    console.log(productos);
  },

  eliminar: (req, res) => {
    console.log("Entro a eliminar");
    const productos = productList();
    const id = req.params.id;
    
   const productosNuevos = productos.filter((product) => product.id != id);
    console.log(productos);
    fs.writeFileSync(productsFilePath, JSON.stringify(productosNuevos));
    res.redirect("/products");
    
  },
};

module.exports = productoController;
