const db = require('../models');

async function addProductToCart(userId, productId, amount) {
  try {
    // Hämta eller skapa varukorgen för användaren
    let cart = await db.cart.findOne({ where: { user_id: userId, payed: false } });

    if (!cart) {
      cart = await db.cart.create({ user_id: userId });
    }

    // Kolla om produkten redan finns i varukorgen
    let cartRow = await db.cartRow.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });

    if (cartRow) {
      // Uppdatera mängden om produkten redan finns i korgen
      cartRow.amount += amount;
      await cartRow.save();
    } else {
      // Skapa en ny cartRow om produkten inte finns
      cartRow = await db.cartRow.create({
        cart_id: cart.id,
        product_id: productId,
        amount: amount
      });
    }

    return { status: 200, data: cartRow };
  } catch (error) {
    return { status: 500, data: { message: error.message } };
  }
}

module.exports = { addProductToCart };