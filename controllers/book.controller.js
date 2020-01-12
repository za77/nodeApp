const Book = require('../model/book.model');
//Simple controller version
exports.test = function(req,res){
    res.send('Greeting from test conroller !!!');
}
exports.create = function(req,res) {
    console.log('create function called');
    let jsonBody = req.body;
    let book = new Product(jsonBody);
    book.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    });
}
exports.get = function(req,res){
    console.log('get product list');
    Book.find({}, function(err, list) {
        if(err){
            return next(err);
        }
        res.send({list : list});
     });
}