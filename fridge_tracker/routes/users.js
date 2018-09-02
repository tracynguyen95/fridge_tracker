var express = require('express');
var router = express.Router();

// Require controller modules.
var users_controller = require('../controllers/users');

// Render the page layout
router.get('/', users_controller.index);

/* GET users listing. */
router.get('/', users_controller.index);
// GET request for creating a users. NOTE This must come before routes that display users (uses id).
router.get('/create', users_controller.users_create_get);

// POST request for creating users.
router.post('/create', users_controller.users_create_post);

// GET request to delete users.
router.get('/:id/delete', users_controller.users_delete_get);

// POST request to delete users.
router.post('/:id/delete', users_controller.users_delete_post);

// // GET request to update users.
// router.get('/:id/update', users_controller.users_update_get);

// // POST request to update users.
// router.post('/:id/update', users_controller.users_update_post);

// GET request for list of all users users.
router.get('/', users_controller.users_list);

module.exports = router;
