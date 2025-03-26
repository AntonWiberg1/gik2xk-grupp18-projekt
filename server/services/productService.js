const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

//cconstraints för titlen på produkt
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

//function för att hämta produkt baserat på ID
async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id }, include: [{ model: db.rating, as: 'ratings' }]
    }
    );
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//function för att hämta alla produkter
async function getAll() {
  try {
    const allProducts = await db.product.findAll({ include: [{ model: db.rating, as: 'ratings' }] });

    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//function för att lägga till rating till produkt baserat på ID
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

//function för att skapa produkt
async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newProduct = await db.product.create(product);
    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//function för att uppdatera produkt baserat på ID
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

//function för att radera produkt baserat på ID
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

//formatterar vår product för att få med samtlig relevant information på rätt format
function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    description: product.description,
    imageUrl: product.image_url,
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
