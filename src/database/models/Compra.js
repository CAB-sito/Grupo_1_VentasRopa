const CompraProducto = require("./CompraProducto");

module.exports = (sequelize, dataTypes) => {
  let alias = "Compra";
  let cols = {
    id : {
      type:dataTypes.INTERGER(11),
      allowNull: false,
      autoIncrement: true
    },

    cant_producto: {
      type: dataTypes.INTERGER(11),
      allowNull: false
    },

    id_usuario: {
      type: dataTypes.INTERGER(11),
      allowNull: false,
    },

    id_producto: {
      type: dataTypes.INTERGER(11),
      allowNull: false,
    }
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

  //ASOCIACIONES: usuario
  Compra.associate = function (models) {
    Compra.belongsTo(models.Usuario, {
      as: "usuario",
      foreignKey: "id_usuario",
    });

    //ASOCIACIONES: productos
    Compra.associate = function (models) {
      Compra.belongsTo(models.Producto, {
        as: "producto",
        foreignKey: "id_producto",
      });


  };

  return Compra;
}}
