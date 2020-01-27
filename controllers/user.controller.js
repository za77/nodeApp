const User = require('./../model/user.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
var path = require('path')

/** 
 * 1.Right login & Jwt token generate 
 * 2.On login return jwt token
 * 3.Send that key to Header section and get response
 */

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
 
exports.login =  function(req,res){
    /**
     * Nodejs is asynchronous program us it will not run code step by step it will go next step without waiting response of previous code 
     * To solve this callback hell situation  we can use async , wait method or promise method or async waterfall library
     * Before Node version 7.6, the callbacks were the only official way provided by Node to run one function after another.
     */
    User.findOneByReq();
    var hash;
    email = req.body.email;
    var user ;
    password = req.body.password;
    qryFindUser =  User.findOne({ email: email });
    user = qryFindUser.then(function(data){
        return data
    });

    user.then(function(data){
        //check 
        console.log(data);
        if(data){
            status = bcrypt.compare(password, data.password, function(err, status) {
                if(!status){
                    res.send({status:'password incorrect',code:401,err:status})
                }else{
                    let privateKey = fs.readFileSync('./key/private.pem', 'utf8');
                    let token = jwt.sign({'name':data.name,'email':data.email,'role':data.role}, privateKey, { algorithm: 'HS256'});    
                    data.token = token;
                    data.save(function(err, record) {
                        if (err) {
                          console.log(err);
                          }else{
                          
                        };
                          res.send({status:'login success',code:200,res:record});
                        })     
                }
            })
           
        }else{
            res.send({status:'no record found',code:401});
            return ;

        }
    })

    // await qry.exec(function(err, result) {  // <- this is the Promise interface.
    //     user = result;
    //     console.log(result);
    //      });
    // console.log(user,'im ');
    // status = bcrypt.compare(password, hash, function(err, status) {
    //     return status;
    //     });
    // res.send({status:status,password:password,hash:hash,list:list});
    
    // if(status){
    //     //update JWT token key
    //     let privateKey = fs.readFileSync('./key/private.pem', 'utf8');
    //     let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});    
    //     res.send({status:'login success'});

    // }
    // else{
    //     res.send({err : 'Login error'});
    // }
    
}