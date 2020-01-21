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

table = mongoose.model('User',UserSchema);
module.exports = table;
module.exports.findOneByReq = function(condition,select){
    console.log('its working fineOneByReq',table);
}
module.exports.findByReq = function(condition,select){

}
