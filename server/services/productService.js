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

async function getByTag(tagName) {
  try {
    const tag = await db.tag.findOne({ where: { name: tagName } });
    const allproducts = await tag.getproducts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allproducts */
    return createResponseSuccess(allproducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getByAuthor(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allproducts = await user.getproducts({ include: [db.user, db.tag] });
    /* Om allt blev bra, returnera allproducts */
    return createResponseSuccess(allproducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id },
    });
    /* Om allt blev bra, returnera product */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll(); 
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
    return createResponseMessage(200, 'Inlägget raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatProduct(product) {
  const cleanproduct = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    price: product.price,
  };

  /*if (product.comments) {
    cleanproduct.comments = [];

    product.comments.map((comment) => {
      return (cleanproduct.comments = [
        {
          title: comment.title,
          body: comment.body,
          author: comment.user.username,
          createdAt: comment.createdAt
        },
        ...cleanproduct.comments
      ]);
    });
  }*/
    return cleanproduct;
  }

async function _findOrCreateTagId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedTag = await db.tag.findOrCreate({ where: { name } });

  return foundOrCreatedTag[0].id;
}

async function _addRatingToProduct(product, rating) {
  await db.productTag.destroy({ where: { productId: product.id } });

  if (tags) {
    tags.forEach(async (tag) => {
      const tagId = await _findOrCreateTagId(tag);
      await product.addTag(tagId);
    });
  }
}

module.exports = {
  getByTag,
  getByAuthor,
  getById,
  getAll,
  addRating,
  create,
  update,
  destroy
};
