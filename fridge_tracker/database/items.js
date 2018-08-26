var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fridge_tracker"
});

//Connect to the database
exports.connect = function() {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
}

//Insert a food item to food_items table
exports.insert = function() {
  var sql = "INSERT INTO food_items (item_name, category, date_bought, location, quantity, unit, expiration, user_id) VALUES ('Bokchoy', '2', '2018-08-09', '1', '1','1','2018-09-09','1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID:" + result.insertId);
    });
}

exports.select_filter = function() {
  var sql = "SELECT * FROM food_items WHERE user_id IN ('1') AND category IN ('1') AND location IN ('3') ORDER BY expiration";
  con.query(sql, function (err, result, field) {
    if (err) throw err;
    console.log(result);
    });
}

// Display all items in the storage
exports.select_all = function() {
  var sql = "SELECT * FROM food_items";
  con.query(sql, [var1, var2] ,function (err, result, field) {
    if (err) throw err;
    console.log(result);
    });
}

exports.delete_item = function() {
  var sql = "DELETE FROM food_items WHERE item_id = '1'";
  con.query(sql, function (err, result, field) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    });
} 

exports.update_id = function() {
  var sql = "UPDATE food_items SET quantity = '3', location = '2' WHERE item_id = '2'";
  con.query(sql, function (err, result, field) {
    if (err) throw err;
    console.log("Number of records updated: " + result.affectedRows);
    });
}

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
//   count_all();
// });