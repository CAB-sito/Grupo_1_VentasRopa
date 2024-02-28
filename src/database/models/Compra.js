
module.exports = (sequelize, dataTypes) => {
  let alias = "Compra";
  let cols = {
    id : {
      type:dataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
      autoIncrement: true
    },

    cant_producto: {
      type: dataTypes.INTEGER,
      allowNull: false
    },

    id_usuario: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },

    id_producto: {
      type: dataTypes.INTEGER,
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

  let compra = sequelize.define(alias, cols, config);

  //ASOCIACIONES: usuario
  compra.associate = function (models) {
    compra.belongsTo(models.Usuario, {
      as: "Usuario",
      foreignKey: "id_usuario",
    });
  
    //ASOCIACIONES: productos
      compra.belongsTo(models.Producto, {
        as: "Producto",
        foreignKey: "id_producto",
      });


  };

  return compra;
};