var express = require('express'),
     router = express.Router(),
     Sequelize = require('sequelize'),
     bcrypt = require ('bcrypt')
    ;

var db = require('../models');


router.get('/logout', function(req, res){
   req.session.user = undefined;
   res.redirect('/login');
});

router.get('/register', function(req, res){
    res.render('register');
});

router.get('/login', function(req, res) {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('account');
});

router.post('/register', function(req, res){
 var newUser = req.body;
 bcrypt.hash(newUser.password, 10, function(error, hash){
   newUser.password = hash;
   db.User.sync({force: false}).then(function(){
    return db.User.create(newUser).then(function(newUser){
       res.redirect('/');
     });
    });
  });
 });

router.post('/login', function(req, res){
  db.User.findOne({
    where: {
      email: req.body.email
    }
  }).then( function(userInDb){
    bcrypt.compare(req.body.password, userInDb.password, function(error, result){
      if(result){
        req.session.user = userInDb;
        res.redirect('/');
      }else{
        res.redirect('/login');
      }
    });
}).catch(function(error) {
      res.redirect('/register');
   });
});


module.exports = router;
