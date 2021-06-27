const db = require("../db");

module.exports.addToCart = (req,res,next) => {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    var count = db.get('session').find({id: sessionId}).get('cart.' + productId, 0).value();
    
    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    db.get('session')
    .find({id: sessionId})
    .set('cart.' + productId, count + 1)
    .write();



    

    res.redirect('/products');
}