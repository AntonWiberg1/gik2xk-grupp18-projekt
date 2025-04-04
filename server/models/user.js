//skapar en module för users som innehåller id, email och password samt firstname och lastname

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [4, 200],
          isEmail: true
        }
      },
      password: { // ändrat till password 
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [8, 50]
        }
      },
      firstName: DataTypes.STRING(50),
      lastName: DataTypes.STRING(50),
    },
    { underscored: true }
  );
};
