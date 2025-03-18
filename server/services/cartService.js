const db = require('../models');

async function addProductToCart(userId, productId, amount) {
  try {
    // Find or create a cart for the user
    let cart = await db.cart.findOne({ 
      where: { userId: userId, payed: false }
    });

    if (!cart) {
      cart = await db.cart.create({ userId: userId, payed: false });
    }

    // Check if product exists
    const product = await db.product.findByPk(productId);
    if (!product) {
      return { status: 404, data: { message: 'Produkten hittades inte' } };
    }

    // Add product to cart
    let cartRow = await db.cartRow.findOne({
      where: { cartId: cart.id, productId }
    });

    if (cartRow) {
      cartRow.amount += amount;
      await cartRow.save();
    } else {
      await db.cartRow.create({ cartId: cart.id, productId, amount });
    }

    return { status: 200, data: { message: 'Produkten lades till i varukorgen' } };
  } catch (error) {
    return { status: 500, data: { message: error.message } };
  }
}

module.exports = { addProductToCart };
