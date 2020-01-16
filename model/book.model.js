const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
    isbn : {type : String, required : true , max :100 },
    poster : {type:String , required:true},
    name : {type:String , required:true},
    description : {type:String , required:true},
    author : {type:String , required:true},
    release_date : {type:String , required:true},
    added_by: {type:String , required:true}
});

// UserSchema.getFirstData = function(){
   
// }

//Export this model
module.exports = mongoose.model('Book',BookSchema);