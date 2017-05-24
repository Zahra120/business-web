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
    db = new Sequelize('zahra', 'zahra120', '', { dialect: 'postgres' })
    ;
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

app.get('/products/new', function(req, res){
  res.render('product/new');
});

app.get('/products', function(req, res){
  Product.findAll({}).then(function(products){
    res.render('product/index', {products: products});
  });
});

app.get('/products/:id', function(req, res){
  Product.findById(req.params.id).then(function(product){
    res.render('product/show', { product: product});
  });

});

app.get('/logout', function(req, res){
   req.session.user = undefined;
   res.redirect('/');
});

app.get('/account', function(req, res){
  res.render('account');

});
app.get('/register', function(req, res){
    res.render('register');
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

 app.post('/new', function(req, res){
   Product.sync({force: false}).then(function(){
     return Product.create(req.body).then(function(){
       res.redirect('/product');
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
app.delete("/products/:id", function(req, res){
  Product.destroy();
});

  app.listen(3000, function() {
    console.log('Web server started on port 3000');
  });
