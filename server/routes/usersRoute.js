const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require('../services/userService');


const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postadressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postadressen får inte vara längre än %{count} tecken lång.'
    },
    email: {
      message: '^E-postadressen är i ett felaktigt format.'
    }
  },
  username: {
    length: {
      minimum: 3,
      maximum: 50,
      tooShort: '^Användarnamnet måste vara minst %{count} tecken långt.',
      tooLong: '^Användarnamnet får inte vara längre än %{count} tecken långt.'
    }
  },
  imageUrl: {
    url: {
      message: '^Sökvägen är felaktig.'
    }
  }
};


// Hämta användarens varukorg
router.get('/:id/getCart', async (req, res) => {
  const id = req.params.id;
  
  const result = await userService.getCartByUserId(id);
  
  res.status(result.status).json(result.data);
});


router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});


router.post('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(user).then((result) => {
      res.send(result);
    });
  }
});


router.put('/', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  const id = user.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || 'Id är obligatoriskt.');
  } else {
    db.user
      .update(user, {
        where: { id: user.id }
      })
      .then((result) => {
        res.send('Inlägget har uppdaterats.');
      });
  }
});


router.delete('/', (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Inlägget raderades`);
    });
});


module.exports = router;
