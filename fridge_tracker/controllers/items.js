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
}

// Display detail page for a specific items.
exports.items_detail = function(req, res) {
    var sql = "SELECT food_items.id AS item_id, food_items.name AS item_name, category, date_bought, location, quantity, unit, expiration, users.name AS user_name FROM food_items INNER JOIN users ON food_items.user_id = users.id WHERE food_items.id=" + req.params.id + ";";
    con.query(sql, function (err, result, field) {
        if (err) throw err;   
        if (result.length == 0) {
            console.log ("No item found");
            res.send ('Item does not exist');
        }
        else {
            result = item_map(result);
            console.log(result); 
            res.render ('items_detail', {title:'Item Detail', item: result[0]});
        }
    });
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
        re.date_bought = re.date_bought.toLocaleDateString();

        re.expiration = re.expiration.toLocaleDateString();
    });

    return result;
}