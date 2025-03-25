const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');


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

      const formattedCart = {
        id: cart.id,
        payed: cart.payed,
        user_id: cart.user_id,
        products: cart.products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          amount: product.cartRow.amount, 
        })),
      };
  
      return createResponseSuccess(formattedCart);
    } catch (error) {
      return createResponseError(500, error.message);
    }
}


module.exports = {
  getCartByUserId
}