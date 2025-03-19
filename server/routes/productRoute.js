const router = require('express').Router();
const productService = require('../services/productService');

//__________ Alla routes fungerar som dom ska i postman ____//

// OK i postman
router.post('/:id/addRating', (req, res) => {
  const rating = req.body;
  const id = req.params.id;

  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// OK
router.get('/:id', (req, res) => {
  const id = req.params.id;

  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// OK
router.get('/', (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

// OK
router.post('/', (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});


// OK
router.put('/', (req, res) => {
  const product = req.body;
  const id = product.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//OK
router.delete('/', (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
