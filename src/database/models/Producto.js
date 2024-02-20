module.exports = (sequelize, dataTypes) => {
  let alias = "Producto";
  let cols = {
    id: {
      type: dataTypes.INTERGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
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
      type: dataTypes.STRING(5),
      allowNull: true,
    },
    imagen: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },

    id_categoria: {
      type: dataTypes.INTERGER(11),
      allowNull: true,
    },
  };
  let config = {
    tableName: "productos",
    timestamps: false,

    /* timestamps: true,  
        createdAt: 'created_at',   
        updatedAt: 'updated_at',
        deletedAt: false*/
  };

  const Producto = sequelize.define(alias, cols, config);

  //ASOCIACIONES: categoria o tipo de productos:
  Producto.associate = function (models) {
    Producto.belongsTo(models.CategoriaProducto, {
      as: "categoria_producto",
      foreignKey: "id_categoria",
    });

 
    //ASOCIACIONES:carrito de compra:
    Producto.associate = function (models) {
      Producto.hasMany(models.Compra, {
        as: "compra",
        foreignKey: "id_producto",
      });

    };
  };

  return Producto;
};
