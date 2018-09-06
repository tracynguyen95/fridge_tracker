var mysql = require('mysql');

// TO FIX LATER
const FOOD_LOCATION = ["Fridge (Upstairs)", 
                        "Freezer (Upstairs)", 
                        "Fridge (Basement)", 
                        "Freezer (Basement)", 
                        "Kitchen Cupboard", 
                        "Pantry"];

const FOOD_UNIT = ["kg", 
                    "g"];
const FOOD_CATEGORY = ["Protein",
                        "Vegetable",
                        "Fruits",
                        "Dairy",
                        "Grains",
                        "Snacks",
                        "Condiments",
                        "Others"];

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fridge_tracker"
});



exports.index = function(req, res) {
    // Count all items in the storage
    var sql = "SELECT * FROM food_items";
    con.query(sql, function (err, result, field) {
        if (err) throw err;    
        result = item_map(result);
        console.log(result);
        res.render ('items', {title:'My fridge', user: 'Nhung', item_list: result}); 
    });
};

// Display list of all itemss.
exports.items_list = function(req, res) {
    res.send('NOT IMPLEMENTED: items list');
};

// Display detail page for a specific items.
exports.items_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: items detail: ' + req.params.id);
};
// Display items create form on GET.
exports.items_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: items create GET');
};

// Handle items create on POST.
exports.items_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: items create POST');
};

// Display items delete form on GET.
exports.items_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: items delete GET');
};

// Handle items delete on POST.
exports.items_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: items delete POST');
};

// Display items update form on GET.
exports.items_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: items update GET');
};

// Handle items update on POST.
exports.items_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: items update POST');
};

function item_map(result) {
    result.forEach(function(re) {
        if (re.location < FOOD_LOCATION.length) {
            re.location = FOOD_LOCATION[re.location];
        }
        else {
            re.location = "Invalid";
        }
        if (re.category < FOOD_CATEGORY.length) {
            re.category = FOOD_CATEGORY[re.category];
        }
        if (re.unit < FOOD_UNIT.length) {
            re.unit = FOOD_UNIT[re.unit];
        }
        re.expiration = re.expiration.getDate() + "/" + re
        .expiration.getMonth() + "/" + re.expiration.getFullYear();
    });

    return result;
}