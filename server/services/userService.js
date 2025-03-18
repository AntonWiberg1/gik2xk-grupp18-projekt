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