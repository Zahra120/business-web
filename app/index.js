var fs = require('fs'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    pug = require('pug'),
    Sequelize = require('sequelize'),
    session = require('express-session'),
    pg = require('pg'),
    methodOverride = require('method-override');

var authenticationRoute = require('./routes/authentication');
var productRoute = require('./routes/product');
var db = require('./models');

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

app.get('/', function(req, res){
  res.render('index');
});
db.sequelize.sync().then(function(){
app.listen(3000, function() {
  console.log('Web server started on port 3000');

  });
});
