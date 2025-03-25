'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.cart.belongsTo(db.user, { foreignKey: 'user_id' });
db.user.hasMany(db.cart, {
  foreignKey: 'user_id',
  allowNull: false,
  onDelete: 'CASCADE'
});

db.rating.belongsTo(db.product, { foreignKey: 'product_id' });
db.product.hasMany(db.rating, {
  foreignKey: 'product_id',
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

/*db.ratings.belongsTo(db.user);
db.user.hasMany(db.ratings, {
  allowNull: false,
  onDelete: 'CASCADE'
});
*/

// Explicitly define the relationships for cartRow
/* db.cart.hasMany(db.cartRow, { foreignKey: 'cart_id' });
db.cartRow.belongsTo(db.cart, { foreignKey: 'cart_id' });

db.product.hasMany(db.cartRow, { foreignKey: 'product_id' });
db.cartRow.belongsTo(db.product, { foreignKey: 'product_id' }); */

db.cart.belongsToMany(db.product, { through: db.cartRow });
db.product.belongsToMany(db.cart, { through: db.cartRow });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
