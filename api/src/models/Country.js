const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //HASHEO
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.INTEGER, // ES UN NUMERO ENTERO QUE VA DESDE UN RANGO GRANDE NEGATIVO A POSITIVO//
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
