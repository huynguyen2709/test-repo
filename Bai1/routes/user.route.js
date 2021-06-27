var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var multer = require('multer');
var upload = multer({dest: './public/uploads/'});


router.get('/', controller.index)

router.get('/cookies', (req, res, next) => {
    res.cookie('user-id', 12345);
    res.send("Hello Đkm");
})

router.get("/search", controller.search)

router.get('/create', controller.create);

router.get('/:id', controller.get)

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

module.exports = router;