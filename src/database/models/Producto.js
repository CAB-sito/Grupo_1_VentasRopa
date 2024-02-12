module.exports = (sequelize, dataTypes) => {
  let alias = "Producto";
  let cols = {
    id: {
      type: dataTypes.INTERGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    marca: {
      type: dataTypes.STRING(30),
      allowNull: true,
    },
    color: {
      type: dataTypes.STRING(15),
    },
    precio: {
      type: dataTypes.DECIMAL(12, 2),
    },
    talle: {
      type: dataTypes.STRING(5),
    },
    imagen: {
      type: dataTypes.STRING(100),
    },

    id_categoria_producto: {
      type: dataTypes.INTERGER(11),
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

  //falta la asociacion com id categoria productos (uno a uno)
  Producto.associate = function (models) {
    Producto.belongsTo(models.CategoriaProducto, {
      as: "categoria_producto",
      foreignKey: "id_categoria_producto",
    });

    /* Producto.hasMany(models.CompraProducto, {
      as: "producto",
      foreignKey: "id_producto",
    });*/

    Producto.associate = function (models) {
      Producto.belongsToMany(models.Compra, {
        as: "compra",
        through: "compra_productos",
        foreignKey: "id_producto",
        otherKey: "id_compra",
        timestamps: false,
      });
    };
  };

  return Producto;
};
