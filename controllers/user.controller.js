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
     if(req.query.id){  obj = User.findById(req.query.id);
     }else{ obj = User.find({ });  }

     var query = obj.select('name email role');
    // selecting the `name` and `occupation` fields
     return query.exec(function(err,list){
         if(err){
             return next(err);
         }else{
             res.send({list:list});
         }
     });
}
exports.delete = function(req,res){
    if(req.query.id){  obj = User.findByIdAndDelete(req.query.id);
    }else{ return res.send({status:'no records found', code : 403 })  }
    return obj.exec(function(err,list){
        if(err){
            return next(err);
        }else{
            res.send({status:'record removed',code : 200});
        }
    });
}
