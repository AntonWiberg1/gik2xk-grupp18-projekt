const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService');
const cartService = require('../services/cartService');



/* router.get('/:name/posts', (req, res) => {
  const name = req.params.name;

  productService.getByTag(name).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

router.get('/', (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});




//________________________
//ANVÄND /CARTS/ADDPRODUCT
//________________________
// Lägg till en produkt i varukorgen
router.post('/addProduct', async (req, res) => {
  const { userId, productId, amount } = req.body;

  if (!userId || !productId || !amount) {
    return res.status(400).json({ message: 'userId, productId och amount krävs' });
  }

  const result = await cartService.addProductToCart(userId, productId, amount);
  res.status(result.status).json(result.data);
});




router.post('/', (req, res) => {
  const cart = req.body;
  db.cart.create(cart).then((result) => {
    res.send(result);
  });
});

router.delete('/', (req, res) => {
  db.cart
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Varukorgen raderades`);
    });
});

module.exports = router;



