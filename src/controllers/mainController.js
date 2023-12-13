const fs = require('fs');

function userList(){
    return JSON.parse(fs.readFileSync("user.json", "utf-8"));
  }

const productos = [
    {
        id: 1,
        nombre: "producto1",
        precio: 10000,
        descuento: 10,
        image:"ropa1.jpg"
    },
    {
        id: 2,
        nombre: "producto2",
        precio: 3000,
        descuento: 0,
        image:"ropa2.jpg"
    },
    {
        id: 3,
        nombre: "producto3",
        precio: 30500,
        descuento: 20,
        image:"ropa3.jpg"
    }
]


const controller = {
    home:(req, res)=>{
        res.render('index',{productos:productos});
    },
    register:(req, res)=>{
        res.render('registro');
    },
    login:(req, res)=>{
        res.render(`login`);
    }

}
module.exports = controller;