var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
    title: 'war at peace',
    genre: 'hisotry',
    author: 'Rahul singh',
    read: false,
    bookId: 656
}, {
    title: 'Love',
    genre: 'Romance',
    author: 'Rahul Singh',
    read: false,
    bookId: 24280
}];

var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/books';
            mongodb.connect(url, function(err, db) {
                console.info('err', err);
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
            // res.send('inserting books');

        });

    return adminRouter;
};

module.exports = router;
