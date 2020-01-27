const Author = require('./../model/author.model');

exports.create = function(req,res){
    let jsonBody = req.body;
    let author = new Author(jsonBody);
    author.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({res:'New Author Created successfully',code:200});
    });
}
exports.get = function(req,res){
    Author.find({}, function(err, list) {
        if(err){
            return next(err);
        }
        res.send({list : list});
     });
}