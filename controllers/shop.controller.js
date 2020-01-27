const Shop = require('../model/shop.model');
//Simple controller version

exports.create = function(req,res,next) {
    console.log('create function called');
    let jsonBody = req.body;
    let shop = new Shop(jsonBody);
    shop.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({res:'Product Created successfully',code:200});
    });
}
exports.get = function(req,res){
    console.log('get product list');
    if(req.query.id){  obj = Shop.findById(req.query.id);
    }else{ obj = Shop.find({ });  }

    // Shop.find({}, function(err, list) {
    //     if(err){
    //         return next(err);
    //     }
    //     res.send({list : list});
    //  });
     return obj.exec(function(err,list){
        if(err){
            return next(err);
        }else{
            res.send({list:list});
        }
    });
}