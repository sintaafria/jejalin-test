const router = require('express').Router();
const multer = require('multer');
const os = require('os');
const { police_check } = require('../../middlewares');

const productController = require('./controller');

router.get('/product', productController.index);
router.post('/product', 
    police_check('create', 'Product'),
    multer({dest: os.tmpdir()}).single('image'), 
    productController.store);
router.put('/product/:id', 
    police_check('update', 'Product'),
    multer({dest: os.tmpdir()}).single('image'), 
    productController.update);
router.get('/product/:id', productController.detail);
router.delete('/product/:id', 
    police_check('delete', 'Product'),
    productController.destroy);

module.exports = router;
