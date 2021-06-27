require('dotenv').config();
var express = require('express');
var app = express();
app.locals.cartNum = 0;
var port = 3001;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var usersRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var productsRoute = require('./routes/product.route');
var sessionMiddleWare = require('./middlewares/session.middleware');
var cartRoute = require('./routes/cart.route');
var apiProductRoute = require('./api/routes/product.route');

mongoose.connect('mongodb://localhost/express-demo', { useNewUrlParser: true });
  

//low db

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleWare);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        'name': 'AAA'
    });
})

app.use('/users', authMiddleware.requireAuth, usersRoute);

app.use('/auth', authRoute);

app.use('/products', productsRoute);

app.use('/cart', cartRoute);

app.use('/api/products', apiProductRoute); 

app.listen(port, () => {
    console.log('Running on port number', port);
});