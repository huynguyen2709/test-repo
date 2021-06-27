var db = require('../db');
const shortid = require('shortid');


module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user)=>{
        console.log('User nhỏ', db.get('users').value());
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        'users': matchedUsers
    });
}

module.exports.create = (req, res) => {
    console.log(req.cookies);
    res.render('users/create.pug');
}

module.exports.get = (req, res)=> {
    var id = req.params.id;
    var user = db.get('users').find( { "id": id } ).value();
    res.render('users/view', {
        "users": user
    });
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate(); 
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    console.log(req.file.path);
    db.get('users').push(req.body).write();
    res.redirect("/users/");
}