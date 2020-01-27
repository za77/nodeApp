const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const bcrypt = require('bcrypt');
var cors = require('cors')
let port = 9000;






// Set up mongoose connection

/** The module.exports or exports is a special object which is included in every JS file in the Node.js application by default. 
 * module is a variable that represents current module and exports is an object that will be exposed as a module.
 *  So, whatever you assign to module.exports or exports, will be exposed as a module.  */
let dev_db_url = 'mongodb+srv://adminer:adminer@cluster0-alure.mongodb.net/nosql';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


let  isAuthenticated = require('./jwt.middleware');

app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
});

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./key/private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    res.send(token);
});

app.get('/password', (req, res) => {
   var password = req.query.password;
   const saltRounds = 10;
   bcrypt.hash(password, saltRounds, function(err, hash) {
       res.send({hash:hash});
     });
});

app.post('/check-hash' ,function(req,res) {
    hash = req.body.hash;
    console.log(hash);
    password = req.body.password;
    bcrypt.compare(password, hash, function(err, status) {
    res.send({status : status});
    });
});




/****
 * For CRUD
 * C => create
 * R => list , first/id
 * U => update
 * D => Delete
 */

const product = require('./routes/product.route'); 
const user = require('./routes/user.route');
const shop = require('./routes/shop.route');
const book = require('./routes/book.route');
const author = require('./routes/author.route');

//this controller not need middleware access
app.use('/user', user);
//after use isAutenticate all controller under the one middleware
app.use(isAuthenticated);
app.use('/products', product);
app.use('/shop', shop);
app.use('/book', book);
app.use('/author', author);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});