var fs = require('fs'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    bcrypt = require ('bcrypt'),
    pug = require('pug'),
    Sequelize = require('sequelize'),
    session = require('express-session'),
    pg = require('pg');
    db = new Sequelize('zahra', 'zahra120', '', { dialect: 'postgres' }),
    methodOverride = require('method-override');
var authenticationRoute = require('./routes/authentication');
var productRoute = require('./routes/product');
    // app.use(function(req, res, next){
    //   console.log(`${req.method} request for path '${req.url}' - ${req.body}`);
    //   next();
    // });
app.use(express.static( '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(methodOverride(function(req, res)  {
if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  var method = req.body._method;
  delete req.body._method;
  return method;
}})
);

app.use('/', authenticationRoute);
app.use('/', productRoute);

app.set('view engine', 'pug');

var Register = db.define('register', {
  name: Sequelize.STRING,
  familyName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING

});

var Product = db.define('product', {
  title: Sequelize.STRING,
  price: Sequelize.STRING,
  description: Sequelize.TEXT
});

var Basket = db.define('basket', {
  name: Sequelize.STRING
});


app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000, function() {
  console.log('Web server started on port 3000');
});
