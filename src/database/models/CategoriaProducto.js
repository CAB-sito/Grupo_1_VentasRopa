module.exports = (sequelize, dataTypes) => {
  let alias = "CategoriaProducto";

  let cols = {
    id: {
      types: dataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      types: dataTypes.STRING(30),
      allowNull: false,
    },
  };

  let config = {
    tableName: "categoria_producto",
    timestamps: false,
    /* timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
  };
  const CategoriaProducto = sequelize.define(alias, cols, config);

  //ASOCIACIONES: producto
  CategoriaProducto.associate = function (models) {
    CategoriaProducto.hasMany(models.Producto, {
      as: "producto",
      foreignKey: "id_categoria",
    });
  };

  return CategoriaProducto;
};
