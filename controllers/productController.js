const Product = require('../models/product');

const product_index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 25;
  const skip = (page - 1) * limit;

  Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(result => {
      Product.countDocuments()
        .then(count => {
          const totalPages = Math.ceil(count / limit);
          if (req.xhr) {
            res.render('partials/search_result', { products: result, page, totalPages });
          } else {
            res.render('product/index', { products: result, title: 'All products', page, totalPages });
          }
        });
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
  const url = req.protocol + '://' + req.get('host');

  const product = new Product({
    ...req.body,
    image: url + '/uploads/' + req.file.filename,
  });

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
  const page = parseInt(req.query.page) || 1;
  const limit = 25;
  const skip = (page - 1) * limit;

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

  Product.find({ name: new RegExp(query, 'i') })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .then(result => {
      Product.countDocuments({ name: new RegExp(query, 'i') })
        .then(count => {
          const totalPages = Math.ceil(count / limit);
          res.render('partials/search_result', { products: result, title: 'Search results', page, totalPages });
        });
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
