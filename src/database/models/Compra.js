const CompraProducto = require("./CompraProducto");

module.exports = (sequelize, dataTypes) => {
  let alias = "Compra";
  let cols = {
    numero_orden: {
      type: dataTypes.INTERGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },

    id_usuario: {
      type: dataTypes.INTERGER(11),
      allowNull: false,
    },
  };

  let config = {
    tableName: "compras",
    timestamps: false,

    /* timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
  };

  let Compra = sequelize.define(alias, cols, config);

  //id de usuario, asociación:
  Compra.associate = function (models) {
    Compra.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });

    /*Compra.hasMany(models.CompraProducto, {
            as: "compra",
            foreignKey: "id_compra",
          });*/

    CompraProducto.associate = function (models) {
      CompraProducto.belongsToMany(models.Producto, {
        as: "producto",
        through: "compra_productos",
        foreignKey: "id_compra",
        otherKey: "id_producto",
        timestamps: false,
      });
    };
  };

  return Compra;
};
