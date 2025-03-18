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

// ändrat till payed och user_id. user_id kanske behöver en foreign key? 

