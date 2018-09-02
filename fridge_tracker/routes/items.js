var express = require('express');
var router = express.Router();

// Require controller modules.
var items_controller = require('../controllers/items');

/* GET users listing. */
router.get('/', items_controller.index);
// GET request for creating a items. NOTE This must come before routes that display items (uses id).
router.get('/create', items_controller.items_create_get);

// POST request for creating items.
router.post('/create', items_controller.items_create_post);

// GET request to delete items.
router.get('/:id/delete', items_controller.items_delete_get);

// POST request to delete items.
router.post('/:id/delete', items_controller.items_delete_post);

// GET request to update items.
router.get('/:id/update', items_controller.items_update_get);

// POST request to update items.
router.post('/:id/update', items_controller.items_update_post);

// GET request for one items.
router.get('/:id', items_controller.items_detail);

// GET request for list of all items items.
router.get('/', items_controller.items_list);

module.exports = router;
