var db = require('./db_config');

var con = db.getConnection();

exports.index = function(req, res) {
    // Count all items in the storage
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        
        console.log(result);
        
        res.render ('users', {title:'List of users', user: 'Nhung', user_list: result});
    });
};

// Display list of all users.
exports.users_list = function(req, res) {
    res.send('NOT IMPLEMENTED: users list');
};

// Display users create form on GET.
exports.users_create_get = function(req, res) {
    res.render('users_add');
};

// Handle users create on POST.
exports.users_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: users create POST');
};

// Display users delete form on GET.
exports.users_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: users delete GET');
};

// Handle users delete on POST.
exports.users_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: users delete POST');
};

// // Display users update form on GET.
// exports.users_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: users update GET');
// };

// // Handle users update on POST.
// exports.users_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: users update POST');
// };