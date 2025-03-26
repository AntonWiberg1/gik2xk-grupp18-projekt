const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
} = require('../helpers/responseHelper');

//function för att hämta en varukorg baserat på UserID
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
      //formatterar vår varukorg för att få med samtlig relevant information på rätt format
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