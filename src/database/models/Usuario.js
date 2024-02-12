module.exports = (sequelize, dataTypes) => {
  let alias = "Usuario";
  let cols = {
    id: {
      type: dataTypes.INTERGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    nombre: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    codigo_postal: {
      type: dataTypes.STRING(5),
      allowNull: false,
    },
    direccion: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    ciudad: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    contrasenia: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    imagen: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
    id_categoria_usuario: {
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

  //asociacion 1 a 1
  Usuario.associate = function (models) {
    Usuario.belongsTo(models.CategoriaUsuario, {
      as: "categoria_usuario",
      foreignKey: "id_categoria_usuario",
    });

    Usuario.hasMany(models.Compra, {
        as: "compra",
        foreignKey: "id_usuario",
      });
  };

  return Usuario;
};
