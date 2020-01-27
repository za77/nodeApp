const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let roleSchema = new Schema({
    name : {type : String, required : true , max :100 },
    descriptiom : {type:Number , required:true}
});
//Export this model
module.exports = mongoose.model('Role',RoleSchema);