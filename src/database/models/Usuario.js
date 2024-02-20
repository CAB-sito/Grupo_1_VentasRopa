module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTERGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    codigo_postal: {
      type: dataTypes.STRING(8),
      allowNull: false,
    },
    direccion: {
      type: dataTypes.STRING(60),
      allowNull: false,
    },
    ciudad: {
      type: dataTypes.STRING(45),
      allowNull: false,
    },
    contrasenia: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    id_categoria: {
      type: dataTypes.INTERGER(11),
      allowNull: false,
    },
  };

  let config = {
    tableName: "usuario",
    timestamps: false,

      /* timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
  };

  const Usuario = sequelize.define(alias, cols, config);

  //ASOCIACIONES: Categoria de usuario:
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.CategoriaUsuario, {
      as: "categoria_usuario",
      foreignKey: "id_categoria",
    });

    //ASOCIACIONES:carrito de compras:
    Usuario.hasMany(models.Compra, {
        as: "compra",
        foreignKey: "id_usuario",
      });
  };

  return Usuario;
};
