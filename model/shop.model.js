const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShopSchema = new Schema({
    name : {type : String, required : true , max :100 },
    location : {type:String , required:true},
    created_date: {type:String , required:true}
});

// UserSchema.getFirstData = function(){
   
// }

//Export this model
module.exports = mongoose.model('Book',ShopSchema);