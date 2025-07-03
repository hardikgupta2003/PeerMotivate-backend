const express = require('express');
const router = express.Router();

const {fetchUser,registerUser} = require('../controllers/userController');

router.get('/:firebase_id',fetchUser);
router.post('/register',registerUser);

module.exports = router;
