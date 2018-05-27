var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
// var sql = require('mysql');
var bookService = require('../services/gooreadsService')();
var router = function(nav) {
    var bookController = require('../controllers/bookController')(null, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .all(function(req, res, next) {
            // console.info(req.params.id);
            var id = new objectId((req.params.id).toString());
            mongodb.connect('mongodb://localhost:27017/books', function(err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function(err, results) {
                    if (results.bookId) {

                        bookService.getBookById(results.bookId, function(err, book) {
                            results.book = book;
                            console.info(results);
                            req.book = results;
                            next();

                        });
                    } else {
                        req.book = results;
                        next();
                    }
                    // console.info(results)
                });
            });

            // sql.connection.query(`select * from books where id = ${id}`, function (error, results, fields) {
            //     if (results.length === 0) {
            //         res.status(404).send('Not Found');
            //     } else {
            //         if (error) {throw error};
            //         req.book = results[0];
            //         next();
            //     };
            //
            // });
        })
        .get(bookController.getById);
    return bookRouter;
}

module.exports = router;
