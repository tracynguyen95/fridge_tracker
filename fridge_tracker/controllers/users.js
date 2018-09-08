var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fridge_tracker"
  });

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all users.
exports.index = function(req, res) {
    // Count all items in the storage
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        console.log(result); 
        res.render ('users', {title:'List of users', user: 'Nhung', user_list: result});
    });
};


// Display users create form on GET.
exports.users_create_get = function(req, res) {
    res.render('users_add', {title: 'Create a new user'});
};

// Handle users create on POST.
exports.users_create_post =  [

        // Validate that the name field is not empty.
        body('name', 'User name required').isLength({ min: 1 }).trim(),
    
        // Sanitize (trim and escape) the name field.
        sanitizeBody('name').trim().escape(),
    
        // Process request after validation and sanitization.
        (req, res, next) => {
    
            // Extract the validation errors from a request.
            const errors = validationResult(req);
    
            // Create a genre object with escaped and trimmed data.
            var user = req.body.name;
    
    
            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('users_add', { title: 'Create a new user', user: user, errors: errors.array()});
            return;
            }
            else {
                // Data from form is valid.
                // Check if Genre with same name already exists.
                con.query("SELECT * FROM users WHERE name = ?", [user], function (err, result, field) {
                    if (err) throw err;   
                    console.log('Found users: ' + result.length); 
                    if (result.length > 0) {
                        // Genre exists, redirect to its detail page.
                        res.send("User already exists.");
                    }
                    else {
                        con.query("INSERT INTO users (name) VALUES (?)", [user], function (err, result, field) {
                                if (err) throw err;   
                                console.log("1 record inserted, ID: " + result.insertId); 
                                res.send("User Created, ID: " + result.insertId);
                             });

                    }
                    
                });
    
                     
            }
        }
        
    ];

// Display users delete form on GET.
exports.users_delete_get = function(req, res) {
    var sql = "SELECT * FROM users WHERE id=" + req.params.id + ";";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        if (result.length == 0) {
            console.log ("No user found");
            res.send ('User does not exist');
        }
        else {
            console.log(result[0].name); 
            res.render ('users_delete', {title:'Delete User', user: result[0].name});
        }
    });
};

// Handle users delete on POST.
exports.users_delete_post = function(req, res) {
    var sql = "DELETE FROM users WHERE id=" + req.params.id + ";";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        console.log("1 record deleted, ID: " + result.affectedRows); 
        res.send(result.affectedRows +"User Deleted ");
    });
};

//Display users update form on GET.
exports.users_update_get = function(req, res) {
    var sql = "SELECT * FROM users WHERE id=" + req.params.id + ";";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        if (result.length == 0) {
            console.log ("No user found");
            res.send ('User does not exist');
        }
        else {
            console.log(result); 
            res.render ('users_edit', {title:'Edit User', user: result[0]});
        }
    });
};

// Handle users update on POST.
exports.users_update_post = function(req, res) {
    var sql = "UPDATE users SET name = '" + req.body.name + "' WHERE id=" + req.params.id + ";";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        console.log("Updated " + result.affectedRows + " user."); 
        res.send("Updated " + result.affectedRows + " user.");
    });
};