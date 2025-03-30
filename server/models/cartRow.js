//skapar en module  för cartRow som innehåller id och amount

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cartRow',
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
     }, { underscored: true });
};
