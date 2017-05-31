var express = require('express'),
    router = express.Router(),
    Sequelize = require('sequelize')
    ;

    var Product = db.define('product', {
      title: Sequelize.STRING,
      price: Sequelize.STRING,
      description: Sequelize.TEXT
    });


router.get('/products/new', function(req, res){
  res.render('product/new');
});

router.get('/admin/products', function(req, res){
  if(!req.session.user){
    res.redirect('/login');
  }else{
    Product.findAll({}).then(function(products){
      res.render('product/index', {products: products});
    });
  }
});

router.get('/products/:id', function(req, res){
  Product.findById(req.params.id).then(function(product){
    res.render('product/show', { product: product});
  });
});

router.get('/admin/products/:id/edit', function(req, res){
  Product.findById(req.params.id).then(function(product){
    res.render('product/edit', { product: product});
  });
});

router.post('/new', function(req, res){
  Product.sync({force: false}).then(function(){
    return Product.create(req.body).then(function(){
      res.redirect('/products');
    });
  });
});

router.delete('/products/:id', function(req, res){
  Product.destroy({
    where: {
      id: req.params.id
    }

}).then( function(){
  res.redirect('/products');
  });

});

router.put('/products/:id', function(req, res){
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function(){
    res.redirect('/products/' + req.params.id);
  });

});

module.exports = router;
