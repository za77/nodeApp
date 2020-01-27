const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AuthorSchema = new Schema({
name: {type:String , required:true},
profile:{ type:String , required:true },
about : {type : String , required : true }
});

module.exports = mongoose.model('Author',AuthorSchema);