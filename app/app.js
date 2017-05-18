var fs = require('fs'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    bcrypt = require ('bcrypt'),
    Sequelize = require('sequelize'),
    session = require('express-session'),
    pg = require('pg');
    db = new Sequelize('zahra', 'zahra120', '', { dialect: 'postgres' });
    app.use(function(req, res, next){
      console.log(`${req.method} request for path '${req.url}' - ${req.body}`);
      next();
    });
    app.use(express.static( '/'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));

    var Register = db.define('register', {
      name: Sequelize.STRING,
      familyName: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING

    });


app.get('/', function(req, res){
  res.sendFile('/Users/zahra120/Desktop/app/app.html');
});

app.get('/products', function(req, res){
  res.sendFile('/Users/zahra120/Desktop/app/products.html');
});

app.get('/logout', function(req, res){
   req.session.user = undefined;
   res.redirect('/');
});

app.get('/account', function(req, res){
  res.sendFile('/Users/zahra120/Desktop/app/account.html');

});
app.get('/register', function(req, res){
    res.sendFile('/Users/zahra120/Desktop/app/register.html');
});

app.post('/register', function(req, res){
 var newUser = req.body;
 bcrypt.hash(newUser.password, 10, function(error, hash){
   newUser.password = hash;
   Register.sync({force: false}).then(function(){
    return Register.create(newUser).then(function(newUser){
       res.redirect('/');
     });
    });
  });

 });

app.post('/login', function(req, res){
  Register.findOne({
    where: {
      email: req.body.email
    }
  }).then( function(userInDb){
    bcrypt.compare(req.body.password, userInDb.password, function(error, result){
      if(result){
        req.session.user = userInDb;
        res.redirect('/');
      }else{
        res.redirect('/account');
      }
    });
}).catch(function(error) {
      res.redirect('/register');
   });
});

  app.listen(3000, function() {
    console.log('Web server started on port 3000');
  });
