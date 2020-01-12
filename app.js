const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
let port = 9000;

// Set up mongoose connection

let dev_db_url = 'mongodb+srv://adminer:adminer@cluster0-alure.mongodb.net/nosql';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const product = require('./routes/product.route'); 
const user = require('./routes/user.route');

app.use('/products', product);
app.use('/user', user);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});