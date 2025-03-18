const router = require('express').Router();
const productService = require('../services/productService');


router.post('/:id/addComment', (req, res) => {
  const comment = req.body;
  const id = req.params.id;

  productService.addComment(id, comment).then((result) => {
    res.status(result.status).json(result.data);
  });
});



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


router.delete('/', (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
