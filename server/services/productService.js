const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');
const product = require('../models/product');

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

/* async function getByTag(tagName) {
  try {
    const tag = await db.tag.findOne({ where: { name: tagName } });
    const allproducts = await tag.getproducts({ include: [db.user, db.tag] });
    
    return createResponseSuccess(allproducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

/* async function getByCart(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allproducts = await user.getproducts({ include: [db.user, db.product] });
    return createResponseSuccess(allproducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id }, include: [{ model: db.rating, as: 'ratings' }]
    }
    );
    /* Om allt blev bra, returnera product */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll({ include: [{ model: db.rating, as: 'ratings' }] });

    /* Om allt blev bra, returnera allproducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    rating.productId = id;
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newProduct = await db.product.create(product);
    //product tags är en array av namn
    //lägg till eventuella taggar

    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(product, id) {
  const invalidData = validate(product, constraints);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const existingProduct = await db.product.findOne({ where: { id } });
    if (!existingProduct) {
      return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
    }

    await db.product.update(product, {
      where: { id }
    });
    return createResponseMessage(200, 'produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.product.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Produkten raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    price: product.price,
    ratings: [],
  };

  if (product.ratings && Array.isArray(product.ratings)) {
    cleanProduct.ratings = product.ratings.map((rating) => ({
      id: rating.id,
      rating: rating.rating,
      productId: rating.product_id,
    }));
  }

  return cleanProduct;
}

/* async function _findOrCreateTagId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

  return foundOrCreatedTag[0].id;
} */

/* async function _addRatingToProduct(product, rating) {
  await db.productTag.destroy({ where: { productId: product.id } });

  if (tags) {
    tags.forEach(async (tag) => {
      const tagId = await _findOrCreateTagId(tag);
      await product.addTag(tagId);
    });
  }
} */

module.exports = {
  //getByTag,
  //getByCart,
  getById,
  getAll,
  addRating,
  create,
  update,
  destroy
};
