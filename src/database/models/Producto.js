
module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nombre: {
        type: dataTypes.STRING(30),
        allowNull: true,
      },
      marca: {
        type: dataTypes.STRING(30),
        allowNull: true,
      },
      color: {
        type: dataTypes.STRING(15),
        allowNull: true,
      },
      precio: {
        type: dataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      descuento: {
        type: dataTypes.DECIMAL(12, 2),
      },
      talle: {
        type: dataTypes.STRING(8),
        allowNull: true,
      },
      imagen: {
        type: dataTypes.STRING(100),
        allowNull: true,
      },
  
      id_categoria: {
        type: dataTypes.INTEGER,
        allowNull: true,
      },
    };
    let config = {
      tableName: "productos",
      timestamps: false,
  
      
    };
  
    const Producto = sequelize.define(alias, cols, config);
  
    //ASOCIACIONES: categoria o tipo de productos:
    Producto.associate = function (models) {
      Producto.belongsTo(models.CategoriaProducto, {
        as: "CategoriaProducto",
        foreignKey: "id_categoria",
      });
  
   
      //ASOCIACIONES:carrito de compra:
        Producto.hasMany(models.Compra, {
          as: "Compra",
          foreignKey: "id_producto",
        });
  
      
    };
  
    return Producto;
  };