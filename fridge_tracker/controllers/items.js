var items = require('../database/items');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
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