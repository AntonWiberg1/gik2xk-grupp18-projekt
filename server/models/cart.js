//skapar en module för varukorgen som innehåller id, betalat och user_id

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cart',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payed: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER
      }
    },
    { underscored: true }
  );
};


