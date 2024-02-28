module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriaUsuario";
  
    let cols = {
      id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      nombre:{
        type: dataTypes.STRING(30),
        allowNull: false
      }
    }
  
    
    let config = {
      tableName: "categoria_usuario",
      timestamps: false,
      /* timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: false */
    };
    const categoriaUsuario = sequelize.define(alias, cols, config);
    //ASOCIACIONES: usuario
    categoriaUsuario.associate = function (models) {
      categoriaUsuario.hasMany(models.Usuario, {
        as: "Usuario",
        foreignKey: "id_categoria"
      });
    };
  
   
  
    return categoriaUsuario;
  };