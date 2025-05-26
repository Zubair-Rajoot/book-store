const express = require('express');
const router = express.Router();


const { createBook } = require('../controllers/BookController');
const authenticateToken = require('../middleware/authenticateToken');


router.post('/create', authenticateToken, createBook);

module.exports = router;