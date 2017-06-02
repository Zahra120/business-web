var express = require('express'),
    router = express.Router(),
    Sequelize = require('sequelize')
    ;


var db = require('../models');

router.get('/admin/products/new', function(req, res){
  res.render('product/new');
});

router.get('/admin/products', function(req, res){
  if(!req.session.user){
    res.redirect('/login');
  }else{
    db.Product.findAll({}).then(function(products){
      res.render('product/index', {products: products});
    });
  }
});

router.get('/products/:id', function(req, res){
  db.Product.findById(req.params.id).then(function(product){
    res.render('product/show', { product: product});
  });
});

router.get('/admin/products/:id/edit', function(req, res){
  db.Product.findById(req.params.id).then(function(product){
    res.render('product/edit', { product: product});
  });
});

router.get('/products', function(req, res){
  db.Product.findAll({}).then(function(products){
    res.render('product/index', {products: products});
  });
});

router.post('/new', function(req, res){
  db.Product.sync({force: false}).then(function(){
    return db.Product.create(req.body).then(function(){
      res.redirect('/admin/products');
    });
  });
});


router.delete('/products/:id', function(req, res){
  db.Product.destroy({
    where: {
      id: req.params.id
    }

}).then( function(){
  res.redirect('/admin/products');
  });

});

router.put('/products/:id', function(req, res){
  db.Product.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/products/'+ req.params.id);
  });

});

module.exports = router;
