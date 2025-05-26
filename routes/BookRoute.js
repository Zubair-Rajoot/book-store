const express = require('express');
const router = express.Router();


const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/BookController');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');


router.post('/create', authenticateToken, createBook);
router.get('/all', authenticateToken, isAdmin, getBooks);

router.put('/update/:id',authenticateToken, updateBook);
router.delete('/delete/:id', authenticateToken, deleteBook);


module.exports = router;