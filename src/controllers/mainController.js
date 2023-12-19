const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, '../data/product.json')
const productos = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))


const controller = {
    home:(req, res)=>{
        const productosDestacados = productos.filter((product) => product.category == "productos destacados");
        const ofertas = productos.filter((product) => product.category == "Oferta");
        res.render('index',{ productosDestacados, ofertas });
    },
    register:(req, res)=>{
        res.render('registro');
    },
    login:(req, res)=>{
        res.render(`login`);
    }

}
module.exports = controller;