const shortid = require('shortid');
const db = require('../db');

module.exports = (req,res,next) => {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, {
            signed: true
        })
        
        db.get('session').push({
            id: sessionId
        }).write();
    }

    var cart = db.get('session').find({id:req.signedCookies.sessionId}).get('cart').value();
    var count = 0;
    for (var i in cart) {
        count += cart[i];
    }
    res.locals.count = count
    next();
}