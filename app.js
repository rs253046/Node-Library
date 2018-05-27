var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var passport = require('password');
var session = require('express-session');

var app = express();
// var config = {
//     user: 'root',
//     password: 'password',
//     host: 'localhost',
//     database: 'books',
//     port: 3306
// };
var mysql = require('mysql');
// mysql.connection = mysql.createConnection(config);
// mysql.connection.connect();

var port = process.env.PORT || 3000;
var nav = [{
    link: '/Books',
    text: 'Books'
}, {
    link: '/Authors',
    text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
require('./src/config/passport')(app);
app.set('views', 'src/views');
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// app.get('/books', function(req, res) {
//     res.send('Hello books');
// });

app.listen(port, function(err) {
    console.info('runnning server on port ', port);
});
