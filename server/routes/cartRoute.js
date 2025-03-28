const router = require('express').Router();
const db = require('../models');
const cartService = require('../services/cartService');
const validate = require('validate.js');

//get request för att hämta alla varukorgar
router.get('/', (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});

//post request för att lägga till en produkt till varukorg
router.post('/addProduct', async (req, res) => {
  const { userId, productId, amount } = req.body;

  if (!userId || !productId || !amount) {
    return res.status(400).json({ message: 'userId, productId och amount krävs' });
  }
  const result = await cartService.addProductToCart(userId, productId, amount);
  res.status(result.status).json(result.data);
});

//put request för att ta bort produkt
router.put('/removeProduct', async (req, res) => {
  const { userId, productId, amount } = req.body;

  if (!userId || !productId || !amount) {
    return res.status(400).json({ message: 'userId, productId och amount krävs' });
  }
  const result = await cartService.removeProductFromCart(userId, productId, amount);
  res.status(result.status).json(result.data);
});

//post request för att lägga till varukorg
router.post('/', (req, res) => {
  const cart = req.body;
  db.cart.create(cart).then((result) => {
    res.send(result);
  });
});

//put request för att uppdatera varukorg
router.put('/', (req, res) => {
  const cart = req.body;
  const invalidData = validate(cart);
  const id = cart.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.cart
      .update(cart, {
        where: { id: cart.id }
      })
      .then((result) => {
        res.send('Inlägget har uppdaterats.');
      });
  }
});

//ta bort varukorgen
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



