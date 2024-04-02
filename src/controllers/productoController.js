//const fs = require("fs");
//const path = require("path");
const db = require("../database/models");
const { validationResult } = require("express-validator");

/*const productos = require("../data/product.json");

const productsFilePath = path.resolve(__dirname, "../data/product.json");
function productList() {
  return JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
}
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));*/

const productoController = {
  index: (req, res) => {
    res.redirect("/cart");
  },
  detail: (req, res) => {
    const id = req.params.id;
    db.Producto.findByPk(id).then((producto) => {
      if (!producto) {
        return res.send("No se encontro el producto");
      } else {
        res.render("details", {
          producto: producto,
          usuario: req.session.usuario,
        });
      }
    });
  },

  cart: (req, res) => {
    db.Producto.findAll().then((productos) => {
      res.render("productCart", {
        listaProductos: productos,
        usuario: req.session.usuario,
      });
    });
  },
  crear: (req, res) => {
    res.render("crearProducto", { usuario: req.session.usuario });
  },

  guardarProducto: (req, res) => {
    let imagen;
    if (req.file) {
      imagen = req.file.filename;
    } else {
      imagen = "default.png ";
    }

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Producto.create({
        nombre: req.body.name,
        marca: req.body.marca,
        color: req.body.color,
        precio: req.body.price,
        descuento: req.body.discount,
        talle: req.body.talle,
        imagen: imagen,
        id_categoria: req.body.cat_pro,
      });

      res.redirect("/products");
    } else {
      res.render("crearProducto", {
        usuario: req.session.usuario,
        errors: errors.array(),
        old: req.body,
      });
    }
  },

  listar: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*') //permite acceder a la api desde el navegador, sino sale error por CORS

    db.Producto.findAll().then((productos) => {
      res.render("listarProducto", {
        listaProductos: productos,
        usuario: req.session.usuario,
      });
    });
  },
  modificar: (req, res) => {
    const id = req.params.id;
    db.Producto.findByPk(id).then((producto) => {
      if (!producto) {
        return res.send("No se encontro el producto");
      } else {
        res.render("modificarProducto", {
          producto: producto,
          usuario: req.session.usuario,
        });
      }
    });
  },

  editar: (req, res) => {
    let imagen;
    if (req.file) {
      imagen = req.file.filename;
    } else {
      imagen = "default.png";
    }

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Producto.create(
        {
          nombre: req.body.name,
          marca: req.body.marca,
          imagen: imagen,
          color: req.body.color,
          precio: req.body.price,
          descuento: req.body.discount,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.redirect("/products");
    } else {
      res.render("modificarProducto", {
        producto: producto,
        usuario: req.session.usuario,
        errors: errors.array(),
      });
    }
  },

  eliminar: (req, res) => {
    db.Producto.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/products");
  },
};

module.exports = productoController;
