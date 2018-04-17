var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');

var User = require('./models/user'); 


var app = express();

//connecting mongoose with database
mongoose.connect('mongodb://root:root123@ds231549.mlab.com:31549/e-commerce', function(err){
    if(err){
        console.log(err);
    }else {
        console.log("Connected with MONGOOSE database");
    }
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "Ricky@!2509"
}));
app.use(flash());

app.engine('ejs', engine);
app.set('view-engine', 'ejs');


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);
//app.user('batman', ,mainRoutes) --batman means first route for all path... ex. batman/home   bathman.about and etc.


app.listen(3000, function(err){
    if (err) throw error;
    console.log('This server is running on port 3000 !');
}) 