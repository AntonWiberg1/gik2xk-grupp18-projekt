module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'rating',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { underscored: true }
  );
};

// Ska finnas foreignKey kopplad från produkttabellen 