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
  detailApi: (req, res) => {
    const id = req.params.id;
    db.Producto.findByPk(id, {
      include: [{
        model: db.CategoriaProducto,
        attributes: ['nombre'],
        as: 'CategoriaProducto'
      }]
    })
    .then((producto) => {
      if (!producto) {
        return res.status(404).json({ mensaje: "No se encontró el producto" });
      }

      // array de relaciones uno a muchos
      const relaciones = {
        categories: [producto.CategoriaProducto ? producto.CategoriaProducto.nombre : 'Sin categoría'],
      };

      // construye la URL de la imagen del producto
      const serverUrl = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${serverUrl}${producto.imagen}`;

      const respuesta = {
        id: producto.id,
        nombre: producto.nombre,
        marca: producto.marca,
        color: producto.color,
        precio: producto.precio,
        descuento: producto.descuento,
        talle: producto.talle,
        imagen: imageUrl,
        id_categoria: producto.id_categoria,
        ...relaciones // verificas si el producto tiene una categoría asociada (producto.categoria).Si lo tiene,se agrega el nombre de la categoría al array categories
      };
      res.status(200).json(respuesta);
    })
    .catch((error) => {
      console.error('Error al buscar el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
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
    db.Producto.findAll().then((productos) => {
      res.render("listarProducto", {
        listaProductos: productos,
        usuario: req.session.usuario,
      });
    });
  },
  listarApi: (req, res) => {
    db.Producto.findAll({
      attributes: ['id', 'nombre'],
      include: [{
        model: db.CategoriaProducto,
        attributes: ['nombre'],
        as: 'CategoriaProducto'
      }]
    })
    .then((productos) => {
      // conteo total de productos
      const countProduct = productos.length;
      
      // conteo de productos por categoría
      const countByCategory = {};
      productos.forEach((producto) => {
        console.log(producto)
        const categoriaNombre = producto.CategoriaProducto ? producto.CategoriaProducto.nombre : 'Sin categoría';
        countByCategory[categoriaNombre] = (countByCategory[categoriaNombre] || 0) + 1;
      });
      // array de productos
      const products = productos.map((producto) => ({
        id: producto.id,
        name: producto.nombre,
        categories: producto.CategoriaProducto ? [producto.CategoriaProducto.nombre] : ['Sin categoría'],
        detail: `api/productos/${producto.id}`,
      }));
      // respuesta
      const respuesta = {
        countProduct,
        countByCategory,
        products,
      };
      // envío de la respuesta
      res.status(200).json(respuesta);
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
