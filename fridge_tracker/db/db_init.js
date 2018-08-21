var mysql = require('mysql');
var fs = require('fs');

var str = fs.readFileSync('../../data/login.txt', 'ascii')
str = str.replace('\r', '')
var arr = str.split('\n')

var conn = mysql.createConnection({
    host: "localhost",
    user: arr[0].toString(),
    password: arr[1].toString()
});

conn.connect(function(err) { 
    if (err) throw err;
    console.log("+++ Connected to MySQL DB on nhanngx");
});

conn.query("CREATE DATABASE IF NOT EXISTS fridge_tracker", function (err, result) {
    if (err) throw err;
    console.log("++ Database created");
});

conn.query("USE fridge_tracker");

conn.query("CREATE TABLE IF NOT EXISTS users( \
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
            name text NOT NULL )", function (err, result) {
                                        if (err) throw err;
                                        console.log("+ Table 'users' created");
});

conn.query("CREATE TABLE IF NOT EXISTS food_item( \
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY, \
            name text, \
            category text, \
            bought date, \
            location int, \
            quantity float, \
            unit text, \
            expiry date, \
            owner int NOT NULL, \
            FOREIGN KEY (owner) \
                REFERENCES users(id) \
                ON UPDATE CASCADE )", function (err, result) {
                                            if (err) throw err;
                                            console.log("+ Table 'food_item' created");
});

conn.end(function(err) {
    if (err) throw err;
    console.log("+++ Init successful, exiting.");
});
