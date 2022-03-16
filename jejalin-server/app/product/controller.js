const path = require('path');
const fs = require('fs');
const config = require('../config')
const Product = require('./model');
const Category = require('../category/model');

const store = async (req, res, next) => {
    try {
        let payload = req.body;

        if(payload.category) {
            let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
            if(category) {
                payload = {...payload, category: category._id}
            } else {
                delete payload.category;
            }
        }

        if(req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let product = new Product({...payload, image_url:filename})
                    await product.save()
                    return res.json(product)
                } catch(err) {
                    fs.unlinkSync(target_path);
                    if(err && err.name === 'ValidationError'){
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });

            src.on('error', async() => {
                next(err);
            });
        } else {
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        };
        next(err);
    } 
}

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10, q='', category='' } = req.query;

        let criteria = {};

        if(q.length) {
            criteria = {
                ...criteria,
                name: { $regex: `${q}`, $options: 'i' }
            }
        } 

        if(category.length) {
            categoryRes = await Category.findOne({name: {$regex: category, $options: 'i'}})
            if(categoryRes) {
                criteria = {
                    ...criteria,
                    category: categoryRes._id
                }
            }
        }

        let count = await Product.find(criteria).countDocuments();

        let product = await Product
            .find(criteria)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('category')
        return res.json({data: product, count});
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        console.log(payload.price)

        if(payload.category) {
            let category = await Category.findOne({name: {$regex: payload.category, $options: 'i'}});
            if(category) {
                payload = {...payload, category: category._id}
            } else {
                delete payload.category;
            }
        }

        if(req.file) {
            console.log('ada request file')
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let product = await Product.findById(id)
                    let currImg = `${config.rootPath}/public/images/products/${product.image_url}`
                    if(fs.existsSync(currImg)) {
                        fs.unlinkSync(currImg);
                    }

                    product = await Product.findByIdAndUpdate(id, {...payload, image_url:filename}, {
                        new: true,
                        runValidators: true
                    })
                    return res.json(product)
                } catch(err) {
                    fs.unlinkSync(target_path);
                    if(err && err.name === 'ValidationError'){
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });

            src.on('error', async() => {
                next(err);
            });
        } else {
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true
            })
            return res.json(product);
        }
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        };
        next(err);
    } 
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        let product = await Product.findOneAndDelete(id)
        let currImg = `${config.rootPath}/public/images/products/${product.image_url}`
        if(fs.existsSync(currImg)) {
            fs.unlinkSync(currImg);
        }
        return res.json(product);
    } catch(err) {
        next(err);
    }
    
}

const detail = (req, res) => {
    const {id} = req.params;
    Product.findById(id)
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    store,
    index,
    detail,
    update,
    destroy,
}