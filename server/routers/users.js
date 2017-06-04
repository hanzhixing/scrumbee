var path = require('path');
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.resolve(__dirname, '../db/default.db'));

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function (req, res) {
    db.serialize(function() {
        var stmt = db.prepare("SELECT * FROM user");
        stmt.run().finalize();

        db.each("SELECT * FROM user", function(err, row) {
            console.log(row);
        });
    });

    // db.close();
    res.send('Birds home page');
});

// define the about route
router.get('/about', function (req, res) {
    res.send('About birds');
});

module.exports = router;
