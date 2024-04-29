const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/create', productController.product_create_get);
router.get('/search', productController.product_search);
router.get('/:id/edit', productController.product_edit_get); // new
router.get('/:id', productController.product_details);
router.get('/', productController.product_index);
router.post('/', upload.single('image'), productController.product_create_post);
router.put('/:id', upload.single('image'), productController.product_edit_put); // new
router.delete('/:id', productController.product_delete);

module.exports = router;
