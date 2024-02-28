module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
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
        type: dataTypes.INTEGER,
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
  
    const usuario = sequelize.define(alias, cols, config);
  
    //ASOCIACIONES: Categoria de usuario:
    usuario.associate = function (models) {
      usuario.belongsTo(models.CategoriaUsuario, {
        as: "categoriaUsuario",
        foreignKey: "id_categoria",
      });
  
      //ASOCIACIONES:carrito de compras:
      usuario.hasMany(models.Compra,{
          as: "Compra",
          foreignKey: "id_usuario",
        });
    };
  
    return usuario;
  };