const Category = require('./model')

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let category = new Category(payload)
        await category.save()
        return res.json(category)
    } catch(err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10 } = req.query;
        let category = await Category
            .find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
        return res.json(category);
    } catch(err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;
        let category = await Category.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        })
        return res.json(category)
    } catch(err) {
        next(err)
    }     
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        let category = await Category.findOneAndDelete(id)
        return res.json(category);
    } catch(err) {
        next(err);
    }
}

// const detail = (req, res) => {
//     const id = req.params;
//     category.findOne({_id: ObjectId(id)})
//         .then(result => res.send(result))
//         .catch(error => res.send(error));
// }

module.exports = {
    store,
    index,
    // detail,
    update,
    destroy,
}