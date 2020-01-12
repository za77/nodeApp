const User = require('./../model/user.model');

exports.create = function(req,res){
    let user = new User({
        name : req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    });
    user.save(function(err){
        if(err){
            return next(err);
        }
        res.send({status:'new user inserted'});
    });
}

exports.get = function(req,res){
     //query with mongoose
     var query = User.find({ }).select('name email role');
    // selecting the `name` and `occupation` fields
     return query.exec(function(err,list){
         if(err){
             return next(err);
         }else{
             res.send({list:list});
         }
     });
}
