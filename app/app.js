var fs = require('fs'),
    express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    base64url = require('base64url'),
    crypto = require('crypto'),
    bcrypt = require ('bcrypt'),
    Sequelize = require('sequelize'),
    pg = require('pg');
    db = new Sequelize('zahra', 'zahra120', '', { dialect: 'postgres' });
    app.use(function(req, res, next){
      console.log(`${req.method} request for path '${req.url}' - ${req.body}`);
      next();
    });
    app.use(express.static('/'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));

    var User = db.define('user',{
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING }
    });

    // User.sync({force: true}).then(function(){
    //   return User.create({
    //     firstName:'zahra',
    //     lastName: 'sa'
    //
    //   });
    // });
    var Register = db.define('register', {
        email: Sequelize.STRING,
        password: Sequelize.STRING

    });
    // Register.sync({force: true}).then(function(){
    //   return Register.create({});
    // });


app.get('/', function(req, res){
  res.sendFile('/Users/zahra120/Desktop/app/app.html');
});
app.post('/', function(req, res){

 var newUser = req.body;
 bcrypt.hash(newUser.password, 10, function(error, hash){
   newUser.password = hash;
   Register.sync({force: true}).then(function(){
    return Register.create(newUser).then(function(newUser){
       res.redirect('/');
     });
   });
 });




 });

  app.listen(3000, function() {
    console.log('Web server started on port 3000');
  });
