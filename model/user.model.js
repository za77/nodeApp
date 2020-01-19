const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name : {type : String, required : true , max :100 },
    email : {type:String , required:true},
    password : {type:String , required:true},
    role : {type:String , required:true},
    token:{type:String, required:true}
});

// UserSchema.getFirstData = function(){
   
// }

//Export this model
module.exports = mongoose.model('User',UserSchema);
// exports.getUserById = function(req){
//      //query with mongoose
//      if(req.query.id){  obj = User.findById(req.query.id);
//      }else{ obj = User.find({ });  }

//      var query = obj.select('name email role');
//     // selecting the `name` and `occupation` fields
//      return query.exec(function(err,list){
//          if(err){
//              return next(err);
//          }else{
//              return list;
//          }
//      });
// }
