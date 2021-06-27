const Product = require('../../models/product.model');


module.exports.index = async (req,res) => {
    var products = await Product.find();
    res.json(products);
}; 

module.exports.create = async (req, res) => {
    var product = await Product.create(req.body);
    res.json(product)
}

module.exports.update = async (req,res) => {
    try {
        var product = await Product.findOne({ _id: req.params.id});

        if (req.body.name) {
			product.name = req.body.name
		}

		if (req.body.description) {
			product.description = req.body.description
		}

        await product.save()
        res.json(product);
    } catch{
        res.status(404)
		res.send({ error: "Product doesn't exist!" })
    }
}

module.exports.delete = async (req, res) => {
    var product = await Product.deleteOne({ _id: req.params.id});
    res.status(204).send("Succesfully deleted")
}