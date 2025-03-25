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
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    { underscored: true }
  );
};

// Ska finnas foreignKey kopplad från produkttabellen 