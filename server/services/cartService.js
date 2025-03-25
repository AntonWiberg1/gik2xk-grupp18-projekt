const db = require('../models');


async function addProductToCart(userId, productId, amount) {
  try {
    // Find or create a cart for the user
    let cart = await db.cart.findOne({
      where: { user_id: userId, payed: false }
    });

    if (!cart) {
      cart = await db.cart.create({ user_id: userId, payed: false });
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
      cartRow.amount = parseFloat(cartRow.amount) + parseFloat(amount);
      await cartRow.save();
    } else {
      await db.cartRow.create({ cartId: cart.id, productId, amount: parseFloat(amount) });
    }


    return { status: 200, data: { message: 'Produkten lades till i varukorgen' } };
  } catch (error) {
    return { status: 500, data: { message: error.message } };
  }
}

async function removeProductFromCart(userId, productId, amount) {
  try {
    // Find the user's cart (only unpaid cart)
    let cart = await db.cart.findOne({
      where: { user_id: userId, payed: false }
    });

    if (!cart) {
      return { status: 404, data: { message: 'Ingen varukorg hittades för användaren' } };
    }

    // Check if the product exists in the cart
    let cartRow = await db.cartRow.findOne({
      where: { cartId: cart.id, productId }
    });

    if (!cartRow) {
      return { status: 404, data: { message: 'Produkten finns inte i varukorgen' } };
    }

    // Decrease the amount or remove the product if amount is 0
    const newAmount = parseFloat(cartRow.amount) - parseFloat(amount);

    if (newAmount > 0) {
      cartRow.amount = newAmount;
      await cartRow.save();
    } else {
      await cartRow.destroy(); // Remove the product completely if amount is 0
    }

    return { status: 200, data: { message: 'Produkten har tagits bort från varukorgen' } };
  } catch (error) {
    return { status: 500, data: { message: error.message } };
  }
}


module.exports = { addProductToCart, removeProductFromCart };
