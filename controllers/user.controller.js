const User = require('./../model/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
var path = require('path')


exports.create = function(req,res) {
    let password = req.body.password;
    let obj = {
        name : req.body.name,
        email:req.body.email,
        role:req.body.role,
        token : '',
        password:''
    };
    //Private Token
    let privateKey = fs.readFileSync(path.resolve('key/private.pem'), 'utf8');
    let token = jwt.sign({ "name": "stuff" }, privateKey, { algorithm: 'HS256'});
    obj.token = token;

    // hash functions checker
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
    obj.password  = hash;
        
    });
    
    let user = new User(obj);
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

exports.login = function(req,res){
    name = req.body.name;
    password = req.body.password;
    let privateKey = fs.readFileSync('./key/private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
}