module.exports = (sequelize, dataTypes) => {
  let alias = "CategoriaProducto";

  let cols = {
    id: {
      types: dataTypes.INTERGER(11),
      allowNull: false,
      autoIncremet: true,
      primaryKey: true,
      unique: true,
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

  //asociaciones
  CategoriaProducto.associate = function (models) {
    CategoriaProducto.hasMany(models.Producto, {
      as: "producto",
      foreignKey: "id_categoria_producto",
    });
  };

  return CategoriaProducto;
};
