const Product = require('../model/product.model');
//Simple controller version
exports.test = function(req,res){
    res.send('Greeting from test conroller !!!');
}
exports.create = function(req,res) {
    console.log('create function called');
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
}
exports.get = function(req,res){
    console.log('get product list');
    Product.find({}, function(err, list) {
        if(err){
            return next(err);
        }
        res.send({product: list});
     });
}