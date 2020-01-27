const Book = require('../model/book.model');



exports.create = function(req,res) {
    let jsonBody = req.body;
    let book = new Book(jsonBody);
    book.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({res:'Book Created successfully',code:200});
    });
}
exports.get = function(req,res){
    Book.find({}, function(err, list) {
        if(err){
            return next(err);
        }
        res.send({list : list});
     });
}
