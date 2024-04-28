const Product = require('../models/product');

const product_index = (req, res) => {
  Product.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('product/index', { products: result, title: 'All products' });
    })
    .catch(err => {
      console.log(err);
    });
}

const product_details = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then(result => {
      res.render('product/details', { product: result, title: 'Product Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'product not found' });
    });
}

const product_create_get = (req, res) => {
  res.render('product/create', { title: 'Create a new product' });
}

const product_create_post = (req, res) => {
  const product = new Product(req.body);
  product.save()
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => {
      console.log(err);
    });
}

const product_delete = (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => {
      console.log(err);
    });
}

const product_search = (req, res) => {
  const query = req.query.q;
  let sort = {};

  switch (req.query.sort) {
    case 'price_asc':
      sort = { price: 1 };
      break;
    case 'price_desc':
      sort = { price: -1 };
      break;
    default:
      sort = {};
  }

  Product.find({ name: new RegExp(query, 'i') }).sort(sort)
    .then(result => {
      res.render('partials/search_result', { products: result, title: 'Search results' });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  product_index,
  product_details,
  product_create_get,
  product_create_post,
  product_delete,
  product_search
}
