const Shop = require('../model/shop.model');
//Simple controller version

exports.create = function(req,res) {
    console.log('create function called');
    let jsonBody = req.body;
    let shop = new Shop(jsonBody);
    shop.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
}
exports.get = function(req,res){
    console.log('get product list');
    Shop.find({}, function(err, list) {
        if(err){
            return next(err);
        }
        res.send({list : list});
     });
}