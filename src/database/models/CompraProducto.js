module.exports = (sequelize, dataTypes) => {
  let alias = "CompraProducto";

  let cols = {
    id_compra: {
      types: dataTypes.INTERGER(11),
      allowNull: false,
    },
    id_producto: {
      types: dataTypes.INTERGER(11),
      allowNull: false,
    },
    cant_producto: {
      types: dataTypes.INTERGER(11),
      allowNull: false,
    },
  };

  let config = {
    tableName: "compra_productos",
    timestamps: false,

    /* timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
  };

  let CompraProducto = sequelize.define(alias, cols, config);

  //aqui va la asociación con id_compra
  CompraProducto.associate = function (models) {
    CompraProducto.belongsTo(models.Compra, {
      as: "compra",
      foreignKey: "id_compra",
    });

    /* CompraProducto.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "id_producto",
          });*/

    CompraProducto.associate = function (models) {
      CompraProducto.belongsToMany(models.Producto, {
        as: "producto",
        through: "compra_producto",
        foreignKey: "id_producto",
        otherKey: "id_compra",
        timestamps: false,
      });
    };
  };

  return CompraProducto;
};
