const fs = require(`fs`);

function productList() {
  return JSON.parse(fs.readFileSync("product.json", "utf-8"));
}

const productos = [
  {
    id: 1,
    name: "Jean skinny",
    precio: 15200,
    descuento: 10,
    imagen: "jean-skinny.jpg",
  },
  {
    id: 2,
    name: "Short jean",
    precio: 13100,
    descuento: 10,
    imagen: "short-jean.jpg",
  },
  {
    id: 3,
    name: "Top Morley",
    precio: 4000,
    descuento: 10,
    imagen: "top-morley.jpg",
  },
  {
    id: 4,
    name: "Vestido crepe",
    precio: 6500,
    descuento: 10,
    imagen: "vestido-crepe.jpg",
  },
];

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
    res.render("productCart");
  },
  crear: (req, res) => {
    res.render("crearProducto");
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
};

module.exports = productoController;
