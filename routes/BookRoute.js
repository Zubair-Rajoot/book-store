const express = require('express');
const router = express.Router();

const {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} = require('../controllers/BookController');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');

router.post('/create', authenticateToken, isAdmin, createBook);

router.get('/all', getBooks);

router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;
