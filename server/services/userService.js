const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');
const user = require('../models/user');

async function getCartById(id) {
  try {
    const product = await db.product.findOne({
      where: { id }, include: [{ model: db.rating, as: 'ratings' }]}
    );
    /* Om allt blev bra, returnera product */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getCartByUserId(id){
  try {
      const cart = await db.cart.findOne({
        where: { user_id: id, payed: false },
        include: [
          {
            model: db.product,
          }
        ]
      });
  
      if (!cart) {
        return createResponseError(404, "Ingen varukorg hittades");
      }
  
      return createResponseSuccess(_formatCartRow(cart));  // FIX: Returnera resultatet
    } catch (error) {
      return createResponseError(500, error.message);  // FIX: Hantera fallback-status
    }
}

function _formatCartRow(cartRow) {
  const cleanCartRow = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt, 
    price: product.price,
    ratings: [],
  };

  if (users.cart && Array.isArray(user.cart)) {
    cleanCartRow.cart = users.cart.map((cart) => ({
      amount: cartRow.amount
    }));
  }

  return cleanCartRow;
}

module.exports = {
  getCartByUserId
}