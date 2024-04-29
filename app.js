const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const multer = require('multer');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://oseasfilho:VXvORimJ4zEx65Sy@node-assignment.yzo6vx9.mongodb.net/inventory?retryWrites=true&w=majority&appName=node-assignment";

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/products');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// product routes
app.use('/products', productRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
