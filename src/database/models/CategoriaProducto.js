
module.exports = (sequelize, dataTypes)=>{
    let alias = "CategoriaProducto";
    let cols = {
      id:{
        type:dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      nombre:{
        type:dataTypes.STRING(30),
        allowNull: false
      }
    }
    let config ={
      tableName:"categoria_producto",
      timestamps: false
    }
    const categoriaProducto = sequelize.define(alias, cols, config);
  
    //ASOCIACIONES: producto
    categoriaProducto.associate = function (models) {
      categoriaProducto.hasMany(models.Producto, {
        as: "Producto",
        foreignKey: "id_categoria",
      });
  
      
    };
  
  
    return categoriaProducto;
  }
  
  
  
  
  
  /*module.exports = (sequelize, dataTypes) => {
    let alias = "CategoriaProducto";
  
    let cols = {
      id: {
        types: dataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
        
      },
      nombre: {
        types: dataTypes.STRING(30),
        allowNull: false,
      },
    };
  
    let config = {
      tableName: "categoria_producto",
      timestamps: false,
     
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
  */
   /* timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: false */