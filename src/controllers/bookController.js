var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var bookController = function(bookService, nav) {
    var middleware = function(req, res, next) {
        if (!req.user) {
            // res.redirect('/');
        }
        next();

    };

    var getIndex = function(req, res) {

        // sql.connection.query('select * from books', function (error, results, fields) {
        //     if (error) {throw error};

        mongodb.connect('mongodb://localhost:27017/books', function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results) {
                res.render('bookListView', {
                    title: 'Hello from render',
                    nav: nav,
                    books: results
                    // })
                });

            });
            // console.info('collection', collection);
        });

    }

    var getById = function(req, res) {
        res.render('bookView', {
            title: 'Hello from render',
            nav: nav,
            book: req.book
        })

    }
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
}

module.exports = bookController;
