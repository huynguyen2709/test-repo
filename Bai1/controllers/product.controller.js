var Product = require('../models/product.model');


module.exports.index = (req,res,next) => {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;

    // var start = (page - 1)* perPage;
    // var end = page * perPage;

    // var results = {};

    //     results.previous = page - 1,
        

    //     results.current =  page,
 
    

    //     results.next = page + 1,


    // results.numberOfPage = Math.round(db.get('products').value().length / perPage);

    // console.log(results);
    // res.render('./products/index', {
    //     products: db.get('products').value().slice(start,end),
    //     productsFull: results,
    // });
    Product.find().then( (products)=>{
        res.render('products/index',{
            products: products
        })
    })
};